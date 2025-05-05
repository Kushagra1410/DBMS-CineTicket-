import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types';
import { FEATURED_MOVIES } from '../../data/mock-data';

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const featuredMovies = FEATURED_MOVIES.slice(0, 5);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const currentMovie = featuredMovies[currentIndex];

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Backdrop image */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url(${currentMovie.backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-cinema"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative h-full z-10 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 
            className={`text-4xl md:text-6xl font-bold mb-4 transition-transform duration-700 ${
              isTransitioning ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            {currentMovie.title}
          </h1>
          <div 
            className={`flex items-center mb-6 transition-transform duration-700 delay-100 ${
              isTransitioning ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <span className="bg-primary-500 text-white px-2 py-1 rounded-md text-sm font-medium mr-3">
              {currentMovie.rating}/10
            </span>
            <span className="text-muted-200 mr-4">
              {currentMovie.duration} min
            </span>
            <div className="flex flex-wrap">
              {currentMovie.genre.map((genre, index) => (
                <span key={index} className="text-muted-200 mr-2">
                  {genre}{index < currentMovie.genre.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
          <p 
            className={`text-muted-200 mb-8 max-w-prose transition-transform duration-700 delay-200 ${
              isTransitioning ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            {currentMovie.description}
          </p>
          <div 
            className={`flex flex-wrap gap-4 transition-transform duration-700 delay-300 ${
              isTransitioning ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <Link 
              to={`/movies/${currentMovie.id}`} 
              className="btn btn-primary"
            >
              Book Tickets
            </Link>
            <a 
              href={currentMovie.trailerUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline text-white border-white flex items-center"
            >
              <Play className="mr-2 h-4 w-4" /> Watch Trailer
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary-500 scale-110' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}