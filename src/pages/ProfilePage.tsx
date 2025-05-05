import { useState } from 'react';
import { User, Mail, Calendar, Edit2, Key, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock booking history data
  const bookings = [
    {
      id: 'CINE123456',
      movieTitle: 'Dune: Part Two',
      date: '2024-04-15',
      time: '7:30 PM',
      theater: 'Cineplex Downtown',
      seats: ['A1', 'A2'],
      totalAmount: 20,
      status: 'Confirmed',
    },
    {
      id: 'CINE789012',
      movieTitle: 'Poor Things',
      date: '2024-03-20',
      time: '5:45 PM',
      theater: 'Starplex Cinema',
      seats: ['C5', 'C6', 'C7'],
      totalAmount: 30,
      status: 'Completed',
    },
  ];
  
  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-muted-800/50 rounded-lg p-6 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-primary-900 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-400 text-sm">{user.email}</p>
              <button className="mt-4 text-sm text-primary-400 hover:text-primary-300 flex items-center">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit Profile
              </button>
            </div>
          </div>
          
          <nav className="bg-muted-800/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center w-full px-6 py-4 text-left ${
                activeTab === 'profile' ? 'bg-primary-900/30 border-l-4 border-primary-500' : ''
              }`}
            >
              <User className="h-5 w-5 mr-3" />
              <span>Profile</span>
            </button>
            
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center w-full px-6 py-4 text-left ${
                activeTab === 'bookings' ? 'bg-primary-900/30 border-l-4 border-primary-500' : ''
              }`}
            >
              <Calendar className="h-5 w-5 mr-3" />
              <span>Booking History</span>
            </button>
            
            <button
              onClick={() => setActiveTab('password')}
              className={`flex items-center w-full px-6 py-4 text-left ${
                activeTab === 'password' ? 'bg-primary-900/30 border-l-4 border-primary-500' : ''
              }`}
            >
              <Key className="h-5 w-5 mr-3" />
              <span>Change Password</span>
            </button>
            
            <button
              onClick={logout}
              className="flex items-center w-full px-6 py-4 text-left text-accent-500 hover:bg-accent-900/20"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-muted-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue={user.name}
                      className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={user.email}
                      className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone number"
                      className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="birthdate" className="block text-sm font-medium mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="birthdate"
                      className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div className="border-t border-muted-700 pt-6 mb-6">
                  <h3 className="text-lg font-medium mb-4">Preferences</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="email-notifications"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-muted-700 rounded bg-muted-900"
                      />
                      <label htmlFor="email-notifications" className="ml-2 block text-sm">
                        Receive email notifications about new releases
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sms-notifications"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-muted-700 rounded bg-muted-900"
                      />
                      <label htmlFor="sms-notifications" className="ml-2 block text-sm">
                        Receive SMS confirmations for bookings
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="promotional-emails"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-muted-700 rounded bg-muted-900"
                      />
                      <label htmlFor="promotional-emails" className="ml-2 block text-sm">
                        Receive promotional offers and discounts
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'bookings' && (
            <div className="bg-muted-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Booking History</h2>
              
              {bookings.length > 0 ? (
                <div className="space-y-6">
                  {bookings.map(booking => (
                    <div key={booking.id} className="border border-muted-700 rounded-lg overflow-hidden">
                      <div className="bg-muted-800 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="font-medium">{booking.movieTitle}</h3>
                          <p className="text-sm text-muted-400">
                            {new Date(booking.date).toLocaleDateString()} • {booking.time}
                          </p>
                        </div>
                        <div className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-900/20 text-green-400'
                            : 'bg-muted-700 text-muted-300'
                        }`}>
                          {booking.status}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-400">Booking ID</p>
                            <p>{booking.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-400">Theater</p>
                            <p>{booking.theater}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-400">Seats</p>
                            <p>{booking.seats.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-400">Amount</p>
                            <p>${booking.totalAmount.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-4">
                          <button className="text-sm text-primary-400 hover:text-primary-300">
                            View Details
                          </button>
                          {booking.status === 'Confirmed' && (
                            <button className="text-sm text-accent-500 hover:text-accent-400">
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto text-muted-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Bookings Yet</h3>
                  <p className="text-muted-400 mb-6">
                    You haven't made any bookings yet. Start exploring movies!
                  </p>
                  <Link to="/movies" className="btn btn-primary">
                    Browse Movies
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'password' && (
            <div className="bg-muted-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Change Password</h2>
              
              <form>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}