import { useState, useEffect } from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { Seat, SeatStatus, SeatType } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface SeatMapProps {
  seats: Seat[][];
}

export default function SeatMap({ seats }: SeatMapProps) {
  const { selectedSeats, toggleSeatSelection } = useBooking();
  const [seatMap, setSeatMap] = useState<Seat[][]>(seats);
  
  // Update local seat map when selected seats change
  useEffect(() => {
    const newSeatMap = seatMap.map(row => 
      row.map(seat => {
        const isSelected = selectedSeats.some(s => s.id === seat.id);
        return isSelected 
          ? { ...seat, status: SeatStatus.SELECTED } 
          : seat.status === SeatStatus.SELECTED 
            ? { ...seat, status: SeatStatus.AVAILABLE } 
            : seat;
      })
    );
    
    setSeatMap(newSeatMap);
  }, [selectedSeats]);

  const renderSeat = (seat: Seat) => {
    // Determine seat class based on status and type
    let seatClass = 'seat ';
    
    if (seat.status === SeatStatus.BOOKED || seat.status === SeatStatus.BLOCKED) {
      seatClass += 'seat-booked';
    } else if (seat.status === SeatStatus.SELECTED) {
      seatClass += seat.type === SeatType.VIP ? 'seat-vip seat-selected' : 'seat-selected';
    } else {
      seatClass += seat.type === SeatType.VIP ? 'seat-vip' : 'seat-available';
    }
    
    return (
      <div
        key={seat.id}
        className={seatClass}
        onClick={() => toggleSeatSelection(seat)}
        title={`${seat.row}${seat.number} - ${formatCurrency(seat.price)}`}
      >
        {seat.row}{seat.number}
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col items-center mb-8">
        {/* Screen */}
        <div className="w-4/5 h-10 bg-primary-900/30 border border-primary-500 rounded-t-3xl mb-8 flex items-center justify-center">
          <p className="text-sm text-primary-400">SCREEN</p>
        </div>
        
        {/* Seats */}
        <div className="grid gap-y-2">
          {seatMap.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {/* Row indicator */}
              <div className="w-6 flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-muted-400">
                  {row[0]?.row}
                </span>
              </div>
              
              {/* Seats */}
              <div className="flex flex-wrap">
                {row.map((seat, seatIndex) => (
                  <div key={seatIndex}>
                    {renderSeat(seat)}
                    {/* Add an aisle after every 4th seat */}
                    {(seatIndex + 1) % 4 === 0 && seatIndex !== row.length - 1 && (
                      <div className="w-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center">
          <div className="seat-available w-6 h-6 mr-2" />
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="seat-selected w-6 h-6 mr-2" />
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="seat-booked w-6 h-6 mr-2" />
          <span>Booked</span>
        </div>
        <div className="flex items-center">
          <div className="seat-vip w-6 h-6 mr-2" />
          <span>VIP</span>
        </div>
      </div>
    </div>
  );
}