import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { CreditCard, Calendar, User, Lock } from 'lucide-react';
import { MOVIES, THEATERS, SHOWTIMES } from '../data/mock-data';
import { useBooking } from '../contexts/BookingContext';
import { formatCurrency } from '../lib/utils';
import { formatDate } from '../utils/formatters';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedShowtime, selectedSeats, totalAmount, createBooking } = useBooking();
  
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Find movie and theater details
  const showtime = SHOWTIMES.find(s => s.id === id);
  const movie = showtime ? MOVIES.find(m => m.id === showtime.movieId) : null;
  const theater = showtime ? THEATERS.find(t => t.id === showtime.theaterId) : null;
  const screen = theater?.screens.find(s => s.id === showtime?.screenId);
  
  // Payment form state
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Basic formatting for card inputs
    if (name === 'cardNumber') {
      // Only allow numbers and format with spaces
      const formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      setFormData({ ...formData, [name]: formatted.substring(0, 19) });
    } else if (name === 'expiryDate') {
      // Format as MM/YY
      const numbers = value.replace(/\D/g, '');
      if (numbers.length <= 2) {
        setFormData({ ...formData, [name]: numbers });
      } else {
        setFormData({ 
          ...formData, 
          [name]: `${numbers.substring(0, 2)}/${numbers.substring(2, 4)}`
        });
      }
    } else if (name === 'cvv') {
      // Only allow 3-4 digits
      setFormData({ 
        ...formData, 
        [name]: value.replace(/\D/g, '').substring(0, 4) 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      alert('Please fill in all payment details');
      return;
    }
    
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create booking
      const booking = await createBooking();
      
      // Redirect to confirmation page
      navigate(`/booking/${id}/confirmation`);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment processing failed. Please try again.');
      setProcessing(false);
    }
  };
  
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
  
  if (selectedSeats.length === 0) {
    // If no seats selected, redirect to seat selection
    navigate(`/booking/${id}/seats`);
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-muted-800/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">
              Payment Details
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                    Name on Card
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-muted-500" />
                    </div>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="block w-full pl-10 py-3 bg-muted-900 border border-muted-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-muted-500" />
                    </div>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="block w-full pl-10 py-3 bg-muted-900 border border-muted-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-muted-500" />
                      </div>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="block w-full pl-10 py-3 bg-muted-900 border border-muted-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-muted-500" />
                      </div>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="block w-full pl-10 py-3 bg-muted-900 border border-muted-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full py-3"
                    disabled={processing}
                  >
                    {processing ? (
                      <span className="flex items-center justify-center">
                        <LoadingSpinner size="sm" className="mr-2" />
                        Processing Payment...
                      </span>
                    ) : (
                      `Pay ${formatCurrency(totalAmount)}`
                    )}
                  </button>
                </div>
                
                <div className="text-center text-sm text-muted-400">
                  <p>Your payment information is secured with SSL encryption.</p>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-muted-800/50 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>
            
            <div className="flex items-start mb-6 pb-6 border-b border-muted-700">
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="w-24 h-auto rounded-md mr-4"
              />
              <div>
                <h3 className="font-semibold mb-1">{movie.title}</h3>
                <p className="text-sm text-muted-300 mb-1">
                  {formatDate(showtime.date)} • {showtime.startTime}
                </p>
                <p className="text-sm text-muted-300 mb-1">
                  {theater.name}, {screen.name}
                </p>
                <p className="text-sm font-medium mt-2">
                  Seats: {selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                </p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 pb-6 border-b border-muted-700">
              <div className="flex justify-between">
                <span className="text-muted-300">Ticket Price</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-300">Booking Fee</span>
                <span>{formatCurrency(0)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-300">Taxes</span>
                <span>{formatCurrency(0)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-lg font-semibold mb-6">
              <span>Total</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
            
            <div className="text-sm text-muted-400">
              <p>By completing this purchase, you agree to our <a href="#" className="text-primary-400 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-400 hover:underline">Refund Policy</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}