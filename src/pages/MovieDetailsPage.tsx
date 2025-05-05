import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Star, Users, User } from 'lucide-react';
import { Movie, Showtime, Theater } from '../types';
import { MOVIES, SHOWTIMES, THEATERS } from '../data/mock-data';
import { formatDate } from '../utils/formatters';
import ShowtimeSelector from '../components/booking/ShowtimeSelector';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  
  useEffect(() => {
    // Simulate loading from API
    setLoading(true);
    setTimeout(() => {
      const foundMovie = MOVIES.find(m => m.id === id);
      setMovie(foundMovie || null);
      
      if (foundMovie) {
        // Get showtimes for this movie
        const movieShowtimes = SHOWTIMES.filter(showtime => showtime.movieId === foundMovie.id);
        setShowtimes(movieShowtimes);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return <LoadingSpinner size="lg" />;
  }
  
  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
        <p className="mb-8">The movie you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/movies')}
          className="btn btn-primary"
        >
          Browse All Movies
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero section with backdrop */}
      <div 
        className="relative h-[50vh] md:h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-cinema"></div>
        
        <div className="container mx-auto px-4 h-full relative z-10">
          <div className="flex flex-col md:flex-row items-end h-full pb-8">
            {/* Movie poster (visible on desktop) */}
            <div className="hidden md:block mr-8 -mb-32">
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="w-64 h-auto rounded-lg shadow-xl"
              />
            </div>
            
            {/* Movie info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{movie.rating}/10</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-400 mr-1" />
                  <span>{movie.duration} min</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-400 mr-1" />
                  <span>{formatDate(movie.releaseDate)}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre.map((genre, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 rounded-full bg-muted-800/80 text-white text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Movie poster (visible on mobile) */}
      <div className="md:hidden container mx-auto px-4 -mt-20 mb-8">
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="w-32 mx-auto rounded-lg shadow-xl"
        />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Movie details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
            <p className="text-muted-200 mb-8 leading-relaxed">
              {movie.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary-500" />
                  Director
                </h3>
                <p className="text-muted-200">{movie.director}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary-500" />
                  Cast
                </h3>
                <ul className="text-muted-200">
                  {movie.cast.map((actor, index) => (
                    <li key={index} className="mb-1">{actor}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Trailer */}
            {movie.trailerUrl && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                <div className="aspect-w-16 aspect-h-9 bg-muted-800 rounded-lg overflow-hidden">
                  <iframe
                    width="560"
                    height="315"
                    src={movie.trailerUrl.replace('watch?v=', 'embed/')}
                    title={`${movie.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
          
          {/* Booking section */}
          <div className="bg-muted-800/50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Book Tickets</h2>
            
            {showtimes.length > 0 ? (
              <ShowtimeSelector 
                showtimes={showtimes} 
                theaters={THEATERS} 
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-300 mb-4">
                  No showtimes available for this movie.
                </p>
                <button 
                  onClick={() => navigate('/movies')}
                  className="btn btn-outline"
                >
                  Browse Other Movies
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}