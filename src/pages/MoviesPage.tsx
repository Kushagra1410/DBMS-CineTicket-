import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Film, FilterX } from 'lucide-react';
import MovieList from '../components/movies/MovieList';
import { MOVIES } from '../data/mock-data';
import { Movie } from '../types';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(MOVIES);
  const [activeFilters, setActiveFilters] = useState({
    search: '',
    genre: '',
  });
  
  // Extract all unique genres from movies
  const allGenres = Array.from(new Set(MOVIES.flatMap(movie => movie.genre)));
  
  // Effect to handle search params
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const genre = searchParams.get('genre') || '';
    
    setActiveFilters({ search, genre });
    
    // Apply filters
    let results = [...MOVIES];
    
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(movie => 
        movie.title.toLowerCase().includes(searchLower) || 
        movie.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (genre) {
      results = results.filter(movie => movie.genre.includes(genre));
    }
    
    setFilteredMovies(results);
  }, [searchParams]);
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    
    if (search.trim()) {
      searchParams.set('search', search);
    } else {
      searchParams.delete('search');
    }
    
    setSearchParams(searchParams);
  };
  
  const handleGenreClick = (genre: string) => {
    if (searchParams.get('genre') === genre) {
      searchParams.delete('genre');
    } else {
      searchParams.set('genre', genre);
    }
    
    setSearchParams(searchParams);
  };
  
  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Sidebar with filters */}
        <div className="w-full md:w-64 bg-muted-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Filters</h2>
          
          {/* Search */}
          <form onSubmit={handleSearch} className="mb-8">
            <label htmlFor="search" className="block text-sm font-medium mb-2">
              Search Movies
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Movie title or keyword"
                defaultValue={activeFilters.search}
                className="w-full py-2 px-3 rounded-md bg-muted-900 border border-muted-700 focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-muted-400 hover:text-primary-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
          
          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Genre
            </label>
            <div className="space-y-2">
              {allGenres.map(genre => (
                <button
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeFilters.genre === genre
                      ? 'bg-primary-500 text-white'
                      : 'hover:bg-muted-700 text-muted-200'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          
          {/* Clear filters button */}
          {(activeFilters.search || activeFilters.genre) && (
            <button
              onClick={clearFilters}
              className="flex items-center justify-center w-full mt-6 py-2 rounded-md bg-muted-700 hover:bg-muted-600 text-sm transition-colors"
            >
              <FilterX className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
          )}
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Movies</h1>
            <span className="text-muted-400">
              {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} found
            </span>
          </div>
          
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMovies.map(movie => (
                <div key={movie.id} className="movie-card">
                  <img src={movie.posterUrl} alt={movie.title} className="aspect-[2/3]" />
                  
                  <div className="movie-card-overlay">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold line-clamp-1">{movie.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span>{movie.duration} min</span>
                        <span className="bg-primary-500 text-white px-1.5 py-0.5 rounded-sm">
                          {movie.rating}/10
                        </span>
                      </div>
                      <div className="line-clamp-3 text-sm text-muted-300 mb-2">
                        {movie.description}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {movie.genre.map((genre, index) => (
                          <span 
                            key={index} 
                            className="text-xs px-2 py-0.5 rounded-full bg-muted-800/70 text-muted-200"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Film className="h-16 w-16 text-muted-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">No movies found</h3>
              <p className="text-muted-400 mb-6">
                We couldn't find any movies matching your filters.
              </p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}