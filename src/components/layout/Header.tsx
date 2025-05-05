import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Film, User, Search, Ticket } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-muted-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <Film className="h-8 w-8 text-primary-500" />
            <span className="ml-2 text-xl font-bold">CineTicket</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary-400 transition-colors">
              Home
            </Link>
            <Link to="/movies" className="text-sm font-medium hover:text-primary-400 transition-colors">
              Movies
            </Link>
            <Link to="/theaters" className="text-sm font-medium hover:text-primary-400 transition-colors">
              Theaters
            </Link>
            {isAuthenticated && (
              <Link to="/bookings" className="text-sm font-medium hover:text-primary-400 transition-colors flex items-center">
                <Ticket className="h-4 w-4 mr-1" />
                My Bookings
              </Link>
            )}
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 pl-10 pr-4 rounded-full bg-muted-800 focus:bg-muted-700 focus:outline-none focus:ring-1 focus:ring-primary-500 w-60 text-sm"
            />
            <Search className="h-4 w-4 absolute left-3 text-muted-400" />
          </form>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-primary-400">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <User className="h-5 w-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-muted-800 rounded-md shadow-lg overflow-hidden z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-muted-700">My Profile</Link>
                    <Link to="/bookings" className="block px-4 py-2 text-sm hover:bg-muted-700">
                      <div className="flex items-center">
                        <Ticket className="h-4 w-4 mr-2" />
                        My Bookings
                      </div>
                    </Link>
                    {user?.isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-muted-700">Admin Dashboard</Link>
                    )}
                    <button 
                      onClick={logout} 
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-muted-700 text-accent-500"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium hover:text-primary-400">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden rounded-md p-2 text-muted-200 hover:bg-muted-800"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 w-full h-screen transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-20 p-6">
          {/* Search Bar - Mobile */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 rounded-md bg-muted-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-400" />
            </div>
          </form>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-xl font-medium" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/movies" className="text-xl font-medium" onClick={closeMenu}>
              Movies
            </Link>
            <Link to="/theaters" className="text-xl font-medium" onClick={closeMenu}>
              Theaters
            </Link>
            {isAuthenticated && (
              <Link to="/bookings" className="text-xl font-medium flex items-center" onClick={closeMenu}>
                <Ticket className="h-5 w-5 mr-2" />
                My Bookings
              </Link>
            )}
          </nav>

          <div className="mt-auto">
            {isAuthenticated ? (
              <div className="space-y-4">
                <Link to="/profile" className="block text-xl font-medium" onClick={closeMenu}>
                  My Profile
                </Link>
                <Link to="/bookings" className="block text-xl font-medium flex items-center" onClick={closeMenu}>
                  <Ticket className="h-5 w-5 mr-2" />
                  My Bookings
                </Link>
                {user?.isAdmin && (
                  <Link to="/admin" className="block text-xl font-medium" onClick={closeMenu}>
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => { logout(); closeMenu(); }} 
                  className="w-full btn btn-accent"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link to="/login" className="btn btn-outline w-full" onClick={closeMenu}>
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary w-full" onClick={closeMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}