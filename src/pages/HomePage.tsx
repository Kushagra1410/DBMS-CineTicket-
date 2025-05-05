import HeroSection from '../components/home/HeroSection';
import MovieList from '../components/movies/MovieList';
import { MOVIES } from '../data/mock-data';

export default function HomePage() {
  // Get latest releases (newest 5 movies by release date)
  const latestReleases = [...MOVIES]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 5);
    
  // Get top rated movies
  const topRated = [...MOVIES]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div>
      <HeroSection />
      
      <MovieList 
        title="Latest Releases" 
        movies={latestReleases} 
      />
      
      <MovieList 
        title="Top Rated" 
        movies={topRated} 
      />
      
      {/* Promotional banner */}
      <section className="py-12 bg-gradient-to-r from-primary-900 to-accent-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Become a Premium Member
              </h2>
              <p className="text-lg mb-6 text-muted-200 max-w-md">
                Get exclusive discounts, early access to tickets, and special perks with our premium membership.
              </p>
              <button className="btn btn-accent">
                Learn More
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img 
                src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Premium Membership" 
                className="w-full max-w-md rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How it works section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Browse Movies</h3>
              <p className="text-muted-300">
                Explore our vast collection of latest movies and upcoming releases.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Select Seats</h3>
              <p className="text-muted-300">
                Choose your preferred seats from our interactive seating plan.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Enjoy the Show</h3>
              <p className="text-muted-300">
                Get your e-tickets instantly and head to the cinema!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}