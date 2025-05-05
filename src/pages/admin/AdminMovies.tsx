import { useState } from 'react';
import { Plus, Search, Edit, Trash, Film } from 'lucide-react';
import { MOVIES } from '../../data/mock-data';
import { Movie } from '../../types';
import { formatDate } from '../../utils/formatters';

export default function AdminMovies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // Filter movies based on search query
  const filteredMovies = MOVIES.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const openEditModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setEditModal(true);
  };
  
  const openAddModal = () => {
    setSelectedMovie(null);
    setEditModal(true);
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Movies Management</h1>
        
        <button
          onClick={openAddModal}
          className="btn btn-primary flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Movie
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
            placeholder="Search movies by title or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 py-2 bg-muted-900 border border-muted-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      
      {/* Movies Table */}
      {filteredMovies.length > 0 ? (
        <div className="bg-muted-800/50 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-muted-700">
              <thead className="bg-muted-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                    Movie
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                    Genre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                    Release Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-300 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-muted-800/30 divide-y divide-muted-700">
                {filteredMovies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-muted-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded object-cover" 
                            src={movie.posterUrl} 
                            alt={movie.title} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{movie.title}</div>
                          <div className="text-sm text-muted-400">{movie.director}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {movie.genre.map((genre, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted-700 text-muted-300"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatDate(movie.releaseDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {movie.duration} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/20 text-blue-400">
                        {movie.rating}/10
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(movie)}
                        className="text-primary-400 hover:text-primary-300 mr-4"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-accent-500 hover:text-accent-400"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-muted-800/30 rounded-lg">
          <Film className="h-16 w-16 mx-auto text-muted-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">No movies found</h3>
          <p className="text-muted-400 mb-6">
            {searchQuery 
              ? "No movies match your search criteria" 
              : "There are no movies in the database yet"}
          </p>
          <button onClick={openAddModal} className="btn btn-primary">
            Add New Movie
          </button>
        </div>
      )}
      
      {/* Movie Edit/Add Modal would go here */}
      {editModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-muted-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-muted-700">
              <h2 className="text-xl font-semibold">
                {selectedMovie ? 'Edit Movie' : 'Add New Movie'}
              </h2>
            </div>
            
            <div className="p-6">
              {/* Form would go here */}
              <div className="text-right mt-6">
                <button 
                  onClick={() => setEditModal(false)}
                  className="btn btn-outline mr-2"
                >
                  Cancel
                </button>
                <button className="btn btn-primary">
                  {selectedMovie ? 'Update Movie' : 'Add Movie'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}