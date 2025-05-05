import { Movie, Theater, Screen, Showtime, Seat, SeatType, SeatStatus } from '../types';
import { generateTimeSlots } from '../lib/utils';

// Mock Movies Data
export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Dune: Part Two',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.',
    posterUrl: 'https://images.pexels.com/photos/6621171/pexels-photo-6621171.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdropUrl: 'https://images.pexels.com/photos/7919225/pexels-photo-7919225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 165,
    releaseDate: '2024-03-01',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    rating: 8.6,
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Josh Brolin'],
    trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3I',
  },
  {
    id: '2',
    title: 'Poor Things',
    description: 'The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.',
    posterUrl: 'https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=800',
    backdropUrl: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 141,
    releaseDate: '2023-12-08',
    genre: ['Comedy', 'Drama', 'Romance'],
    rating: 8.3,
    director: 'Yorgos Lanthimos',
    cast: ['Emma Stone', 'Mark Ruffalo', 'Willem Dafoe', 'Ramy Youssef'],
    trailerUrl: 'https://www.youtube.com/watch?v=RlbR5N6veqw',
  },
  {
    id: '3',
    title: 'Oppenheimer',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    posterUrl: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdropUrl: 'https://images.pexels.com/photos/6985003/pexels-photo-6985003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 180,
    releaseDate: '2023-07-21',
    genre: ['Biography', 'Drama', 'History'],
    rating: 8.5,
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    trailerUrl: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
  },
  {
    id: '4',
    title: 'Deadpool & Wolverine',
    description: 'Deadpool joins forces with Wolverine in what promises to be an action-packed, violent, and hilarious adventure.',
    posterUrl: 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdropUrl: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 145,
    releaseDate: '2024-07-26',
    genre: ['Action', 'Comedy', 'Superhero'],
    rating: 9.0,
    director: 'Shawn Levy',
    cast: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin', 'Morena Baccarin'],
    trailerUrl: 'https://www.youtube.com/watch?v=4kJYLWkIxIo',
  },
  {
    id: '5',
    title: 'Challengers',
    description: 'A former tennis prodigy turned coach and her husband, an aging champion who is about to play his final tournament, find themselves embroiled in a complex love triangle with a rising tennis star.',
    posterUrl: 'https://images.pexels.com/photos/3697742/pexels-photo-3697742.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdropUrl: 'https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 131,
    releaseDate: '2024-04-26',
    genre: ['Drama', 'Sport', 'Romance'],
    rating: 7.9,
    director: 'Luca Guadagnino',
    cast: ['Zendaya', 'Josh O\'Connor', 'Mike Faist'],
    trailerUrl: 'https://www.youtube.com/watch?v=MdmwYgG_-Qw',
  },
  {
    id: '6',
    title: 'Godzilla x Kong: The New Empire',
    description: 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island\'s mysteries.',
    posterUrl: 'https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdropUrl: 'https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 145,
    releaseDate: '2024-03-29',
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    rating: 7.5,
    director: 'Adam Wingard',
    cast: ['Rebecca Hall', 'Brian Tyree Henry', 'Dan Stevens'],
    trailerUrl: 'https://www.youtube.com/watch?v=3HuJd6-GCeE',
  },
  {
    id: '7',
    title: 'A Quiet Place: Day One',
    description: 'Experience the day the world went quiet in this prequel to A Quiet Place, exploring the beginning of the invasion by the sound-hunting creatures.',
    posterUrl: 'https://images.pexels.com/photos/2873670/pexels-photo-2873670.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdropUrl: 'https://images.pexels.com/photos/1374295/pexels-photo-1374295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 128,
    releaseDate: '2024-06-28',
    genre: ['Horror', 'Sci-Fi', 'Thriller'],
    rating: 8.2,
    director: 'Michael Sarnoski',
    cast: ['Lupita Nyong\'o', 'Joseph Quinn', 'Alex Wolff'],
    trailerUrl: 'https://www.youtube.com/watch?v=BpdP1ScEbGQ',
  },
  {
    id: '8',
    title: 'Inside Out 2',
    description: 'Riley enters adolescence as new emotions join Joy, Sadness, Anger, Fear, and Disgust in the control center of her mind.',
    posterUrl: 'https://images.pexels.com/photos/68111/pexels-photo-68111.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdropUrl: 'https://images.pexels.com/photos/355288/pexels-photo-355288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: 120,
    releaseDate: '2024-06-14',
    genre: ['Animation', 'Adventure', 'Comedy'],
    rating: 8.8,
    director: 'Kelsey Mann',
    cast: ['Amy Poehler', 'Phyllis Smith', 'Lewis Black', 'Tony Hale'],
    trailerUrl: 'https://www.youtube.com/watch?v=3Zfv5ZM4QXE',
  },
];

// Featured movies (for hero section)
export const FEATURED_MOVIES = MOVIES.slice(0, 4);

// Generate mock theaters
export const THEATERS: Theater[] = [
  {
    id: '1',
    name: 'Cineplex Downtown',
    location: '123 Main Street, Downtown',
    screens: [
      {
        id: '1',
        name: 'Screen 1',
        capacity: 150,
        rows: 10,
        columns: 15,
        seatMap: [], // Will be generated
      },
      {
        id: '2',
        name: 'Screen 2',
        capacity: 100,
        rows: 8,
        columns: 12,
        seatMap: [], // Will be generated
      },
    ],
  },
  {
    id: '2',
    name: 'Starplex Cinema',
    location: '456 Oak Avenue, Westside',
    screens: [
      {
        id: '3',
        name: 'Screen 1',
        capacity: 180,
        rows: 12,
        columns: 15,
        seatMap: [], // Will be generated
      },
      {
        id: '4',
        name: 'Screen 2 - IMAX',
        capacity: 200,
        rows: 10,
        columns: 20,
        seatMap: [], // Will be generated
      },
    ],
  },
  {
    id: '3',
    name: 'Lakeside Movies',
    location: '789 Lake Drive, Eastside',
    screens: [
      {
        id: '5',
        name: 'Screen 1',
        capacity: 120,
        rows: 8,
        columns: 15,
        seatMap: [], // Will be generated
      },
    ],
  },
];

// Generate mock showtimes for the next 7 days
const generateShowtimes = (): Showtime[] => {
  const showtimes: Showtime[] = [];
  const timeSlots = generateTimeSlots();
  
  const today = new Date();
  
  MOVIES.forEach(movie => {
    // Generate showtimes for the next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      THEATERS.forEach(theater => {
        theater.screens.forEach(screen => {
          // Not all movies show on all screens every day
          if (Math.random() > 0.3) { // 70% chance of a movie showing on this screen on this day
            // Pick 1-3 random time slots
            const numTimeSlots = Math.floor(Math.random() * 3) + 1;
            const shuffledTimeSlots = [...timeSlots].sort(() => Math.random() - 0.5);
            
            for (let j = 0; j < numTimeSlots; j++) {
              const startTime = shuffledTimeSlots[j];
              // Calculate end time by adding movie duration
              const startDate = new Date(`2000-01-01T${startTime}`);
              const endDate = new Date(startDate.getTime() + movie.duration * 60000);
              const endTime = endDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
              });
              
              showtimes.push({
                id: `${movie.id}-${theater.id}-${screen.id}-${dateStr}-${j}`,
                movieId: movie.id,
                theaterId: theater.id,
                screenId: screen.id,
                date: dateStr,
                startTime,
                endTime,
                price: {
                  standard: 10,
                  vip: 15,
                },
              });
            }
          }
        });
      });
    }
  });
  
  return showtimes;
};

export const SHOWTIMES = generateShowtimes();

// Generate a seat map for a screen
export const generateSeatMap = (rows: number, columns: number): Seat[][] => {
  const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const seatMap: Seat[][] = [];
  
  for (let r = 0; r < rows; r++) {
    const rowSeats: Seat[] = [];
    const rowLetter = rowLetters[r];
    
    for (let c = 0; c < columns; c++) {
      // Determine seat type - make some VIP seats in the middle rows
      const isVipRow = r >= Math.floor(rows / 4) && r < Math.floor(rows * 3 / 4);
      const seatType = isVipRow ? SeatType.VIP : SeatType.STANDARD;
      
      // Randomly mark some seats as booked (for demo purposes)
      const randomStatus = Math.random() > 0.8 ? SeatStatus.BOOKED : SeatStatus.AVAILABLE;
      
      rowSeats.push({
        id: `${rowLetter}${c + 1}`,
        row: rowLetter,
        number: c + 1,
        type: seatType,
        status: randomStatus,
        price: seatType === SeatType.VIP ? 15 : 10,
      });
    }
    
    seatMap.push(rowSeats);
  }
  
  return seatMap;
};

// Generate seat maps for all screens
THEATERS.forEach(theater => {
  theater.screens.forEach(screen => {
    screen.seatMap = generateSeatMap(screen.rows, screen.columns);
  });
});