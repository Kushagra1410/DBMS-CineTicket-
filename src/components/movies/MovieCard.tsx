import { Link } from 'react-router-dom';
import { Clock, Star, Calendar } from 'lucide-react';
import { Movie } from '../../types';
import { formatDate } from '../../utils/formatters';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export default function MovieCard({ movie, className }: MovieCardProps) {
  return (
    <div className={`movie-card ${className}`}>
      {/* Poster Image */}
      <img src={movie.posterUrl} alt={movie.title} className="aspect-[2/3]" />
      
      {/* Overlay with information */}
      <div className="movie-card-overlay">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{movie.rating}/10</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-3 w-3 mr-1" />
              <span>{movie.duration} min</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold line-clamp-1">{movie.title}</h3>
          
          <div className="flex items-center text-xs text-muted-300">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(movie.releaseDate)}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-1">
            {movie.genre.slice(0, 3).map((genre, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-0.5 rounded-full bg-muted-800/70 text-muted-200"
              >
                {genre}
              </span>
            ))}
          </div>
          
          <Link 
            to={`/movies/${movie.id}`} 
            className="btn btn-primary w-full mt-2 text-sm py-1.5"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}