import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  Calendar, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminMovies from './AdminMovies';
import AdminShowtimes from './AdminShowtimes';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';
import { cn } from '../../lib/utils';

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Movies', href: '/admin/movies', icon: Film },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Showtimes', href: '/admin/showtimes', icon: Calendar },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-8">You do not have permission to access the admin dashboard.</p>
        <Link to="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted-900">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-6 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-muted-800 text-muted-200"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-muted-900 border-r border-muted-800 transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-muted-800">
            <Film className="h-8 w-8 text-primary-500 mr-2" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                    isActive(item.href)
                      ? "bg-primary-900/30 text-primary-400"
                      : "text-muted-300 hover:bg-muted-800 hover:text-muted-100"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-muted-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-800 flex items-center justify-center">
                  <span className="text-sm font-medium">{user.name.charAt(0)}</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-400">Admin</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-4 flex items-center w-full px-4 py-2 text-sm text-accent-500 hover:bg-accent-900/20 rounded-md"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="lg:pl-64">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route index element={<AdminDashboardContent />} />
              <Route path="movies" element={<AdminMovies />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="showtimes" element={<AdminShowtimes />} />
              <Route path="settings" element={<AdminSettings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

function AdminDashboardContent() {
  // Mock statistics data
  const stats = [
    { name: 'Total Movies', value: '24', icon: Film, color: 'bg-blue-900/20 text-blue-400' },
    { name: 'Total Users', value: '1,245', icon: Users, color: 'bg-green-900/20 text-green-400' },
    { name: 'Showtimes Today', value: '56', icon: Calendar, color: 'bg-yellow-900/20 text-yellow-400' },
    { name: 'Total Bookings', value: '834', icon: Calendar, color: 'bg-purple-900/20 text-purple-400' },
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-muted-800/50 rounded-lg p-6 flex items-center"
          >
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-400">{stat.name}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent activity */}
      <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
      <div className="bg-muted-800/50 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-muted-700">
          <p className="font-medium">Latest Bookings</p>
        </div>
        <div className="divide-y divide-muted-700">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Booking #{Math.floor(Math.random() * 1000000)}</p>
                  <p className="text-sm text-muted-400">Movie: Dune: Part Two</p>
                  <p className="text-sm text-muted-400">User: john.doe@example.com</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-300">Today, 14:32</p>
                  <p className="text-sm px-2 py-1 bg-green-900/20 text-green-400 rounded-full mt-1">
                    Confirmed
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}