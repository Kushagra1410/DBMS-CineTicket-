import { useState } from 'react';
import { format, add, isToday, isTomorrow } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Showtime, Theater } from '../../types';
import { useBooking } from '../../contexts/BookingContext';

interface ShowtimeSelectorProps {
  showtimes: Showtime[];
  theaters: Theater[];
}

export default function ShowtimeSelector({ showtimes, theaters }: ShowtimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const { selectShowtime, selectedShowtime } = useBooking();
  
  // Generate date options for next 7 days
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const date = add(new Date(), { days: i });
    return {
      value: format(date, 'yyyy-MM-dd'),
      label: isToday(date) 
        ? 'Today' 
        : isTomorrow(date) 
          ? 'Tomorrow' 
          : format(date, 'EEE, MMM d'),
    };
  });
  
  // Filter showtimes by selected date
  const filteredShowtimes = showtimes.filter(
    showtime => showtime.date === selectedDate
  );
  
  // Group showtimes by theater
  const showtimesByTheater = filteredShowtimes.reduce((acc, showtime) => {
    const theater = theaters.find(t => t.id === showtime.theaterId);
    if (!theater) return acc;
    
    if (!acc[theater.id]) {
      acc[theater.id] = {
        theater,
        showtimes: [],
      };
    }
    
    acc[theater.id].showtimes.push(showtime);
    return acc;
  }, {} as Record<string, { theater: Theater; showtimes: Showtime[] }>);
  
  return (
    <div className="space-y-6">
      {/* Date selector */}
      <div>
        <div className="flex items-center mb-4">
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-400" />
          <h3 className="font-medium">Select Date</h3>
        </div>
        
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
          {dateOptions.map(date => (
            <button
              key={date.value}
              onClick={() => setSelectedDate(date.value)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-200 min-w-[100px] ${
                selectedDate === date.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-muted-800 hover:bg-muted-700 text-muted-200'
              }`}
            >
              {date.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Theaters and showtimes */}
      <div>
        <h3 className="font-medium mb-4">Select Showtime</h3>
        
        {Object.keys(showtimesByTheater).length === 0 ? (
          <div className="bg-muted-800/50 rounded-lg p-6 text-center">
            <p className="text-muted-300">No showtimes available for this date.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.values(showtimesByTheater).map(({ theater, showtimes }) => (
              <div key={theater.id} className="bg-muted-800/50 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">{theater.name}</h4>
                    <p className="text-sm text-muted-400">{theater.location}</p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <span className="text-xs text-muted-400 bg-muted-800 px-2 py-1 rounded">
                      Standard: $10 | VIP: $15
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {showtimes.map(showtime => (
                    <button
                      key={showtime.id}
                      onClick={() => selectShowtime(showtime)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedShowtime?.id === showtime.id
                          ? 'bg-primary-500 text-white'
                          : 'bg-muted-700 hover:bg-muted-600 text-muted-200'
                      }`}
                    >
                      {showtime.startTime}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}