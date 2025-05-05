import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Ticket, Calendar, MapPin } from 'lucide-react';
import bookingService from '../../services/bookingService';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

interface Booking {
  id: number;
  movie_title: string;
  poster_url: string;
  show_date: string;
  show_time: string;
  theater_name: string;
  seat_numbers: string;
  total_amount: number;
  created_at: string;
  payment_status: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (user?.id) {
          const userBookings = await bookingService.getUserBookings(user.id);
          setBookings(userBookings);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Ticket className="w-12 h-12 mx-auto text-muted-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No Bookings Yet</h2>
        <p className="text-muted-400">
          Your movie booking history will appear here once you make a reservation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-muted-800/50 rounded-lg p-4 md:p-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={booking.poster_url}
              alt={booking.movie_title}
              className="w-full md:w-32 h-48 md:h-auto object-cover rounded-md"
            />
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{booking.movie_title}</h3>
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${booking.payment_status === 'completed' ? 'bg-green-100 text-green-800' : 
                    booking.payment_status === 'failed' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}
                `}>
                  {booking.payment_status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-400" />
                  <div>
                    <p className="text-sm text-muted-400">Show Date & Time</p>
                    <p className="font-medium">
                      {format(new Date(booking.show_date), 'MMMM d, yyyy')} at{' '}
                      {booking.show_time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-400" />
                  <div>
                    <p className="text-sm text-muted-400">Theater</p>
                    <p className="font-medium">{booking.theater_name}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-400">Seats</p>
                  <p className="font-medium">{booking.seat_numbers}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-400">Amount Paid</p>
                  <p className="font-medium">${booking.total_amount.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-muted-700">
                <p className="text-sm text-muted-400">
                  Booked on {format(new Date(booking.created_at), 'MMMM d, yyyy')} at{' '}
                  {format(new Date(booking.created_at), 'h:mm a')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}