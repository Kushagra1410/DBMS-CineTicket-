import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import SeatMap from '../components/booking/SeatMap';
import { Movie, Theater, Screen, Showtime } from '../types';
import { MOVIES, THEATERS, SHOWTIMES } from '../data/mock-data';
import { formatDate } from '../utils/formatters';
import { useBooking } from '../contexts/BookingContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatCurrency } from '../lib/utils';

export default function SeatSelectionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedShowtime, selectShowtime, selectedSeats, totalAmount } = useBooking();
  
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [theater, setTheater] = useState<Theater | null>(null);
  const [screen, setScreen] = useState<Screen | null>(null);
  
  useEffect(() => {
    // Simulate loading from API
    setLoading(true);
    
    setTimeout(() => {
      // Find showtime by ID
      const showtime = SHOWTIMES.find(s => s.id === id);
      
      if (showtime) {
        // Set the showtime in context
        selectShowtime(showtime);
        
        // Find associated movie
        const foundMovie = MOVIES.find(m => m.id === showtime.movieId);
        setMovie(foundMovie || null);
        
        // Find associated theater
        const foundTheater = THEATERS.find(t => t.id === showtime.theaterId);
        setTheater(foundTheater || null);
        
        // Find associated screen
        const foundScreen = foundTheater?.screens.find(s => s.id === showtime.screenId);
        setScreen(foundScreen || null);
      } else {
        // If showtime not found, redirect to movies page
        navigate('/movies');
      }
      
      setLoading(false);
    }, 500);
  }, [id, navigate, selectShowtime]);
  
  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      navigate(`/booking/${id}/checkout`);
    }
  };
  
  if (loading) {
    return <LoadingSpinner size="lg" />;
  }
  
  if (!movie || !theater || !screen || !selectedShowtime) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Showtime Not Found</h1>
        <p className="mb-8">The showtime you're looking for doesn't exist or has been removed.</p>
        <Link to="/movies" className="btn btn-primary">
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Booking Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-muted-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-300">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                {selectedShowtime.date} • {selectedShowtime.startTime}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {theater.name}, {screen.name}
              </span>
            </div>
          </div>
        </div>
        
        <Link 
          to={`/movies/${movie.id}`} 
          className="mt-4 md:mt-0 text-sm text-primary-400 hover:text-primary-300"
        >
          Change Showtime
        </Link>
      </div>
      
      {/* Seat Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-6">Select Your Seats</h2>
          
          <div className="bg-muted-800/50 rounded-lg p-4 md:p-8">
            <SeatMap seats={screen.seatMap} />
          </div>
        </div>
        
        {/* Booking Summary */}
        <div>
          <h2 className="text-xl font-bold mb-6">Booking Summary</h2>
          
          <div className="bg-muted-800/50 rounded-lg p-6 mb-8">
            <div className="flex items-start mb-6">
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="w-24 h-auto rounded-md mr-4"
              />
              <div>
                <h3 className="font-semibold mb-1">{movie.title}</h3>
                <p className="text-sm text-muted-300 mb-1">{formatDate(selectedShowtime.date)}</p>
                <p className="text-sm text-muted-300 mb-1">{selectedShowtime.startTime}</p>
                <p className="text-sm text-muted-300">{theater.name}, {screen.name}</p>
              </div>
            </div>
            
            <div className="border-t border-muted-700 pt-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-300">Selected Seats:</span>
                <span>
                  {selectedSeats.length > 0 
                    ? selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ') 
                    : 'None'}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-300">Standard Seats:</span>
                <span>
                  {selectedSeats.filter(seat => seat.price === 10).length} × $10
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-300">VIP Seats:</span>
                <span>
                  {selectedSeats.filter(seat => seat.price === 15).length} × $15
                </span>
              </div>
            </div>
            
            <div className="border-t border-muted-700 pt-4 mb-6">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleContinue}
              className="btn btn-primary w-full"
              disabled={selectedSeats.length === 0}
            >
              Continue to Checkout
            </button>
          </div>
          
          <div className="bg-muted-800/50 rounded-lg p-4 text-sm text-muted-300">
            <h3 className="font-medium text-white mb-2">Important Notes:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Tickets once booked cannot be canceled or refunded.</li>
              <li>Please arrive at least 15 minutes before showtime.</li>
              <li>Outside food and beverages are not allowed.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}