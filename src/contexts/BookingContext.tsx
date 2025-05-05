import { createContext, useContext, useState, ReactNode } from 'react';
import { Seat, SeatStatus, Showtime, Booking, BookingStatus } from '../types';

interface BookingContextType {
  selectedShowtime: Showtime | null;
  selectedSeats: Seat[];
  totalAmount: number;
  selectShowtime: (showtime: Showtime) => void;
  toggleSeatSelection: (seat: Seat) => void;
  clearSelection: () => void;
  createBooking: () => Promise<Booking>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

interface BookingProviderProps {
  children: ReactNode;
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  
  // Calculate total amount based on selected seats and showtime
  const totalAmount = selectedSeats.reduce((total, seat) => {
    return total + seat.price;
  }, 0);

  const selectShowtime = (showtime: Showtime) => {
    setSelectedShowtime(showtime);
    // Clear previously selected seats when changing showtime
    setSelectedSeats([]);
  };

  const toggleSeatSelection = (seat: Seat) => {
    // Skip if seat is already booked
    if (seat.status === SeatStatus.BOOKED || seat.status === SeatStatus.BLOCKED) {
      return;
    }

    setSelectedSeats(prevSelectedSeats => {
      // Check if seat is already selected
      const isSelected = prevSelectedSeats.some(s => s.id === seat.id);
      
      if (isSelected) {
        // Remove seat from selection
        return prevSelectedSeats.filter(s => s.id !== seat.id);
      } else {
        // Add seat to selection
        return [...prevSelectedSeats, { ...seat, status: SeatStatus.SELECTED }];
      }
    });
  };

  const clearSelection = () => {
    setSelectedSeats([]);
  };

  // Mock function to create a booking
  const createBooking = async (): Promise<Booking> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking: Booking = {
          id: Math.random().toString(36).substring(2, 11),
          userId: '1', // In a real app, this would be the current user's ID
          showtimeId: selectedShowtime?.id || '',
          seats: selectedSeats.map(seat => seat.id),
          totalAmount,
          bookingDate: new Date().toISOString(),
          status: BookingStatus.CONFIRMED,
        };
        
        // Clear selection after successful booking
        clearSelection();
        resolve(booking);
      }, 1500);
    });
  };

  const value = {
    selectedShowtime,
    selectedSeats,
    totalAmount,
    selectShowtime,
    toggleSeatSelection,
    clearSelection,
    createBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}