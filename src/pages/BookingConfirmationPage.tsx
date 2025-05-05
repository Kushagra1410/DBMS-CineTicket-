import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Calendar, MapPin, Clock, Ticket, Download, Share2 } from 'lucide-react';
import { MOVIES, THEATERS, SHOWTIMES } from '../data/mock-data';
import { formatDate } from '../utils/formatters';
import QRCode from '../components/ui/QRCode';

export default function BookingConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  
  // Find booking details based on showtime ID
  const showtime = SHOWTIMES.find(s => s.id === id);
  const movie = showtime ? MOVIES.find(m => m.id === showtime.movieId) : null;
  const theater = showtime ? THEATERS.find(t => t.id === showtime.theaterId) : null;
  const screen = theater?.screens.find(s => s.id === showtime?.screenId);
  
  // Mock booking details
  const bookingId = `CINE${Math.floor(100000 + Math.random() * 900000)}`;
  const bookingDate = new Date().toISOString();
  
  // Mock selected seats (since we don't have actual booking data at this point)
  const mockSeats = ['A1', 'A2', 'A3'];
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  if (!showtime || !movie || !theater || !screen) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Booking Not Found</h1>
        <p className="mb-8">The booking you're looking for doesn't exist or has been removed.</p>
        <Link to="/movies" className="btn btn-primary">
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h2 className="text-xl font-medium">Confirming your booking...</h2>
          </div>
        ) : (
          <>
            {/* Success Message */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-muted-300">
                Your tickets have been booked successfully. You will receive an email with your ticket details.
              </p>
            </div>
            
            {/* Ticket Details */}
            <div className="bg-muted-800/50 rounded-lg overflow-hidden mb-8">
              {/* Movie details header */}
              <div className="relative h-32 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-sm"
                  style={{ backgroundImage: `url(${movie.backdropUrl})` }}
                ></div>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative h-full flex items-center p-6">
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title} 
                    className="w-16 h-24 object-cover rounded mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{movie.title}</h2>
                    <p className="text-sm text-muted-200">
                      {movie.duration} min • {movie.genre.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Ticket Info */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-start mb-4">
                      <Calendar className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-400">Date</p>
                        <p className="font-medium">{formatDate(showtime.date)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start mb-4">
                      <Clock className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-400">Time</p>
                        <p className="font-medium">{showtime.startTime}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start mb-4">
                      <MapPin className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-400">Theater</p>
                        <p className="font-medium">{theater.name}, {screen.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-muted-700 my-4 pt-4">
                  <div className="flex items-start mb-4">
                    <Ticket className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-400">Seats</p>
                      <p className="font-medium">{mockSeats.join(', ')}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6">
                    <div>
                      <p className="text-sm text-muted-400">Booking ID</p>
                      <p className="font-medium">{bookingId}</p>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <p className="text-sm text-muted-400">Booked On</p>
                      <p className="font-medium">{formatDate(bookingDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="bg-muted-800/50 rounded-lg p-6 text-center mb-8">
              <h3 className="text-lg font-semibold mb-4">Scan this QR code at the theater</h3>
              <div className="flex justify-center mb-4">
                <QRCode value={bookingId} size={180} />
              </div>
              <p className="text-sm text-muted-300">
                Present this QR code or your booking ID at the ticket counter to collect your tickets.
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="btn btn-outline flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" />
                Download Ticket
              </button>
              <button className="btn btn-outline flex items-center justify-center">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              <Link to="/movies" className="btn btn-primary">
                Book Another Ticket
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}