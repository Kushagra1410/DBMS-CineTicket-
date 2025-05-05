import { useState } from 'react';
import { Plus, Search, Clock, Calendar, Film } from 'lucide-react';
import { MOVIES, SHOWTIMES, THEATERS } from '../../data/mock-data';
import { formatDate } from '../../utils/formatters';

export default function AdminShowtimes() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get movie and theater details for each showtime
  const showtimesWithDetails = SHOWTIMES.map(showtime => {
    const movie = MOVIES.find(m => m.id === showtime.movieId);
    const theater = THEATERS.find(t => t.id === showtime.theaterId);
    const screen = theater?.screens.find(s => s.id === showtime.screenId);
    
    return {
      ...showtime,
      movieTitle: movie?.title || 'Unknown Movie',
      theaterName: theater?.name || 'Unknown Theater',
      screenName: screen?.name || 'Unknown Screen',
    };
  });
  
  // Filter showtimes based on search query
  const filteredShowtimes = showtimesWithDetails.filter(showtime => 
    showtime.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    showtime.theaterName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group showtimes by date
  const showtimesByDate = filteredShowtimes.reduce((acc, showtime) => {
    if (!acc[showtime.date]) {
      acc[showtime.date] = [];
    }
    acc[showtime.date].push(showtime);
    return acc;
  }, {} as Record<string, typeof showtimesWithDetails>);
  
  // Sort dates in descending order
  const sortedDates = Object.keys(showtimesByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Showtimes Management</h1>
        
        <button
          className="btn btn-primary flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Showtime
        </button>
      </div>
      
      {/* Search and filters */}
      <div className="bg-muted-800/50 rounded-lg p-4 mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-400" />
          </div>
          <input
            type="text"
            placeholder="Search by movie or theater..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 py-2 bg-muted-900 border border-muted-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      
      {sortedDates.length > 0 ? (
        <div className="space-y-8">
          {sortedDates.map(date => (
            <div key={date}>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary-500" />
                {formatDate(date)}
              </h2>
              
              <div className="bg-muted-800/50 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-muted-700">
                    <thead className="bg-muted-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                          Movie
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                          Theater
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                          Screen
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                          Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-muted-800/30 divide-y divide-muted-700">
                      {showtimesByDate[date].map((showtime) => (
                        <tr key={showtime.id} className="hover:bg-muted-800/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium">{showtime.movieTitle}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {showtime.theaterName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {showtime.screenName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-1 text-muted-400" />
                              <span>{showtime.startTime} - {showtime.endTime}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-400 hover:text-primary-300 mr-2">
                              Edit
                            </button>
                            <button className="text-accent-500 hover:text-accent-400">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted-800/30 rounded-lg">
          <Clock className="h-16 w-16 mx-auto text-muted-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">No showtimes found</h3>
          <p className="text-muted-400 mb-6">
            {searchQuery 
              ? "No showtimes match your search criteria" 
              : "There are no showtimes scheduled yet"}
          </p>
          <button className="btn btn-primary">
            Add New Showtime
          </button>
        </div>
      )}
    </div>
  );
}