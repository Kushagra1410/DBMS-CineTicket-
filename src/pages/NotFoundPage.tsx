import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
      <Film className="h-20 w-20 text-primary-500 mb-6" />
      <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-300 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}