import pool from '../lib/db';

export interface BookingCreate {
  userId: number;
  showtimeId: number;
  seatIds: number[];
  total_amount: number;
  payment_status: 'pending' | 'completed' | 'failed';
}

class BookingService {
  // Create a new booking
  async createBooking(bookingData: BookingCreate) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Create the booking record
      const [bookingResult]: any = await connection.query(
        'INSERT INTO bookings (user_id, showtime_id, total_amount, payment_status) VALUES (?, ?, ?, ?)',
        [bookingData.userId, bookingData.showtimeId, bookingData.total_amount, bookingData.payment_status]
      );
      
      const bookingId = bookingResult.insertId;

      // Create payment record
      await connection.query(
        'INSERT INTO payments (booking_id, amount, status) VALUES (?, ?, ?)',
        [bookingId, bookingData.total_amount, bookingData.payment_status]
      );

      // Update seats status
      for (const seatId of bookingData.seatIds) {
        await connection.query(
          'UPDATE seats SET is_booked = true WHERE id = ?',
          [seatId]
        );
      }

      await connection.commit();
      return bookingId;

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Get all bookings for a user
  async getUserBookings(userId: number) {
    const [rows] = await pool.query(`
      SELECT 
        b.id,
        b.showtime_id,
        b.total_amount,
        b.created_at,
        m.title AS movie_title,
        m.poster_url,
        s.show_date,
        s.show_time,
        t.name AS theater_name,
        p.status AS payment_status,
        GROUP_CONCAT(seats.seat_number) as seat_numbers
      FROM bookings b
      JOIN showtimes s ON b.showtime_id = s.id
      JOIN movies m ON s.movie_id = m.id
      JOIN theaters t ON s.theater_id = t.id
      JOIN payments p ON b.id = p.booking_id
      JOIN seats ON s.id = seats.showtime_id
      WHERE b.user_id = ?
      GROUP BY b.id
      ORDER BY b.created_at DESC
    `, [userId]);

    return rows;
  }

  // Check seat availability
  async checkSeatAvailability(showtimeId: number, seatNumbers: string[]) {
    const [rows]: any = await pool.query(`
      SELECT id, seat_number, is_booked
      FROM seats
      WHERE showtime_id = ? AND seat_number IN (?)
    `, [showtimeId, seatNumbers]);

    return rows.every((seat: any) => !seat.is_booked);
  }

  // Get available seats for a showtime
  async getAvailableSeats(showtimeId: number) {
    const [rows] = await pool.query(`
      SELECT id, seat_number, is_booked
      FROM seats
      WHERE showtime_id = ?
      ORDER BY seat_number
    `, [showtimeId]);

    return rows;
  }
}

export default new BookingService();