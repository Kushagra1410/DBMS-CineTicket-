import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { useAuth } from './contexts/AuthContext';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const SeatSelectionPage = lazy(() => import('./pages/SeatSelectionPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const MyBookingsPage = lazy(() => import('./pages/MyBookingsPage'));

function App() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
          <Route path="/booking/:id/seats" element={<SeatSelectionPage />} />
          <Route path="/booking/:id/checkout" element={<CheckoutPage />} />
          <Route path="/booking/:id/confirmation" element={<BookingConfirmationPage />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          {isAuthenticated && (
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bookings" element={<MyBookingsPage />} />
            </>
          )}
          
          {/* Admin routes */}
          {isAdmin && (
            <Route path="/admin/*" element={<AdminDashboardPage />} />
          )}
          
          {/* Catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;