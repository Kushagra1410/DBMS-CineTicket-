import { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import MovieCard from './MovieCard';
import { Movie } from '../../types';

interface MovieListProps {
  title: string;
  movies: Movie[];
  showFilters?: boolean;
}

export default function MovieList({ title, movies, showFilters = false }: MovieListProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [genreFilter, setGenreFilter] = useState<string>('All');
  
  // Extract unique genres from all movies
  const allGenres = ['All', ...Array.from(new Set(movies.flatMap(movie => movie.genre)))];
  
  // Apply genre filter
  const filteredMovies = genreFilter === 'All' 
    ? movies 
    : movies.filter(movie => movie.genre.includes(genreFilter));
  
  // Pagination
  const moviesPerPage = 5;
  const pageCount = Math.ceil(filteredMovies.length / moviesPerPage);
  const displayedMovies = filteredMovies.slice(
    currentPage * moviesPerPage,
    (currentPage + 1) * moviesPerPage
  );
  
  const nextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          
          {showFilters && (
            <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-muted-800 rounded-full px-3 py-1.5">
                <Filter className="h-4 w-4 mr-2 text-muted-400" />
                <span className="text-sm mr-3">Genre:</span>
                <select
                  value={genreFilter}
                  onChange={(e) => {
                    setGenreFilter(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="bg-transparent text-sm focus:outline-none cursor-pointer"
                >
                  {allGenres.map(genre => (
                    <option key={genre} value={genre} className="bg-muted-900">
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {filteredMovies.length === 0 ? (
          <div className="bg-muted-800/50 rounded-lg p-8 text-center">
            <p className="text-muted-300">No movies found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {displayedMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            
            {pageCount > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="p-2 rounded-full bg-muted-800 hover:bg-muted-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <span className="mx-4 text-sm">
                    Page {currentPage + 1} of {pageCount}
                  </span>
                  
                  <button
                    onClick={nextPage}
                    disabled={currentPage === pageCount - 1}
                    className="p-2 rounded-full bg-muted-800 hover:bg-muted-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}