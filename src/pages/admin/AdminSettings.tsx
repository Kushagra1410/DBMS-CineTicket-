import { useState } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'CineTicket',
    contactEmail: 'support@cineticket.com',
    phoneNumber: '+1 (555) 123-4567',
    address: '1234 Cinema Street, Movie District, CA 90001'
  });
  
  const [bookingSettings, setBookingSettings] = useState({
    maxTicketsPerBooking: 10,
    bookingFeePercentage: 5,
    cancelationTimeLimit: 24, // hours
    allowRefunds: true,
  });
  
  const [emailSettings, setEmailSettings] = useState({
    sendBookingConfirmations: true,
    sendReminders: true,
    reminderHours: 24, // hours before showtime
  });
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };
  
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBookingSettings({
      ...bookingSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save settings to a database
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">System Settings</h1>
      
      <form onSubmit={handleSubmit}>
        {/* General Settings */}
        <div className="bg-muted-800/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">General Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium mb-2">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={generalSettings.siteName}
                onChange={handleGeneralChange}
                className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={generalSettings.contactEmail}
                onChange={handleGeneralChange}
                className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={generalSettings.phoneNumber}
                onChange={handleGeneralChange}
                className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                Business Address
              </label>
              <textarea
                id="address"
                name="address"
                value={generalSettings.address}
                onChange={handleGeneralChange}
                rows={3}
                className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
        
        {/* Booking Settings */}
        <div className="bg-muted-800/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Booking Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="maxTicketsPerBooking" className="block text-sm font-medium mb-2">
                Maximum Tickets Per Booking
              </label>
              <input
                type="number"
                id="maxTicketsPerBooking"
                name="maxTicketsPerBooking"
                value={bookingSettings.maxTicketsPerBooking}
                onChange={handleBookingChange}
                min="1"
                className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="bookingFeePercentage" className="block text-sm font-medium mb-2">
                Booking Fee Percentage (%)
              </label>
              <input
                type="number"
                id="bookingFeePercentage"
                name="bookingFeePercentage"
                value={bookingSettings.bookingFeePercentage}
                onChange={handleBookingChange}
                min="0"
                max="100"
                step="0.1"
                className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="cancelationTimeLimit" className="block text-sm font-medium mb-2">
                Cancelation Time Limit (hours before showtime)
              </label>
              <input
                type="number"
                id="cancelationTimeLimit"
                name="cancelationTimeLimit"
                value={bookingSettings.cancelationTimeLimit}
                onChange={handleBookingChange}
                min="0"
                className="w-full bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="allowRefunds"
                name="allowRefunds"
                checked={bookingSettings.allowRefunds}
                onChange={handleBookingChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-muted-700 rounded bg-muted-900"
              />
              <label htmlFor="allowRefunds" className="ml-2 block text-sm">
                Allow refunds for canceled bookings
              </label>
            </div>
          </div>
        </div>
        
        {/* Email Settings */}
        <div className="bg-muted-800/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Email Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sendBookingConfirmations"
                name="sendBookingConfirmations"
                checked={emailSettings.sendBookingConfirmations}
                onChange={handleEmailChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-muted-700 rounded bg-muted-900"
              />
              <label htmlFor="sendBookingConfirmations" className="ml-2 block text-sm">
                Send booking confirmation emails
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sendReminders"
                name="sendReminders"
                checked={emailSettings.sendReminders}
                onChange={handleEmailChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-muted-700 rounded bg-muted-900"
              />
              <label htmlFor="sendReminders" className="ml-2 block text-sm">
                Send showtime reminder emails
              </label>
            </div>
            
            {emailSettings.sendReminders && (
              <div className="ml-6 mt-2">
                <label htmlFor="reminderHours" className="block text-sm font-medium mb-2">
                  Send reminders (hours before showtime)
                </label>
                <input
                  type="number"
                  id="reminderHours"
                  name="reminderHours"
                  value={emailSettings.reminderHours}
                  onChange={handleEmailChange}
                  min="1"
                  max="72"
                  className="w-full max-w-xs bg-muted-900 border border-muted-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary flex items-center">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}