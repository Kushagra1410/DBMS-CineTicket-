export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  duration: number; // in minutes
  releaseDate: string;
  genre: string[];
  rating: number;
  director: string;
  cast: string[];
  trailerUrl?: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  screens: Screen[];
}

export interface Screen {
  id: string;
  name: string;
  capacity: number;
  rows: number;
  columns: number;
  seatMap: Seat[][];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  status: SeatStatus;
  price: number;
}

export enum SeatType {
  STANDARD = 'STANDARD',
  VIP = 'VIP',
  ACCESSIBLE = 'ACCESSIBLE',
}

export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  SELECTED = 'SELECTED',
  BOOKED = 'BOOKED',
  BLOCKED = 'BLOCKED',
}

export interface Showtime {
  id: string;
  movieId: string;
  theaterId: string;
  screenId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: {
    standard: number;
    vip: number;
  };
}

export interface Booking {
  id: string;
  userId: string;
  showtimeId: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  status: BookingStatus;
  paymentId?: string;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  timestamp: string;
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  GOOGLE_PAY = 'GOOGLE_PAY',
  APPLE_PAY = 'APPLE_PAY',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}