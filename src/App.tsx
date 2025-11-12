import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import DriverDashboard from './components/DriverDashboard';
import AdminDashboard from './components/AdminDashboard';
import RoutesPage from './components/RoutesPage';
import FaresPage from './components/FaresPage';
import StopsPage from './components/StopsPage';
import DriversPage from './components/DriversPage';
import FeedbackPage from './components/FeedbackPage';
import { Toaster } from './components/ui/sonner';

export type UserRole = 'user' | 'driver' | 'admin' | null;

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState<User | null>(null);

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
        return <DriversPage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'feedback':
        return <FeedbackPage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
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
