import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import DriverDashboard from './components/DriverDashboard';
import AdminDashboard from './components/AdminDashboard';
import RoutesPage from './components/RoutesPage';
import FaresPage from './components/FaresPage';
import StopsPage from './components/StopsPage';
import DriversPage from './components/DriversPage';
import DriverQRScanner from './components/DriverQRScanner';
import FeedbackPage from './components/FeedbackPage';
import DriverFeedbackPage from './components/DriverFeedbackPage';
import UserSettings from './components/UserSettings';
import { Toaster } from './components/ui/sonner';

export type UserRole = 'user' | 'driver' | 'admin' | null;

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize from localStorage if available
    const savedPage = localStorage.getItem('lakbay_currentPage');
    return savedPage || 'landing';
  });
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage if available
    const savedUser = localStorage.getItem('lakbay_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save to localStorage whenever user or page changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('lakbay_user', JSON.stringify(user));
      localStorage.setItem('lakbay_currentPage', currentPage);
    } else {
      localStorage.removeItem('lakbay_user');
      localStorage.removeItem('lakbay_currentPage');
    }
  }, [user, currentPage]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === 'user') {
      setCurrentPage('user-dashboard');
    } else if (userData.role === 'driver') {
      setCurrentPage('driver-dashboard');
    } else if (userData.role === 'admin') {
      setCurrentPage('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
    localStorage.removeItem('lakbay_user');
    localStorage.removeItem('lakbay_currentPage');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'user-dashboard':
        return <UserDashboard user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'driver-dashboard':
        return <DriverDashboard user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'admin-dashboard':
        return <AdminDashboard user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'routes':
        return <RoutesPage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'fares':
        return <FaresPage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'stops':
        return <StopsPage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'drivers':
        // Only admins can access the drivers page
        if (user?.role === 'admin') {
          return <DriversPage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
        }
        // Redirect users to dashboard
        return <UserDashboard user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'driver-qr-scanner':
        return <DriverQRScanner user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'feedback':
        return <FeedbackPage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'driver-feedback':
        return <DriverFeedbackPage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'user-settings':
        return <UserSettings user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {renderPage()}
      <Toaster />
    </>
  );
}