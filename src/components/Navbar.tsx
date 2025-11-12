import { Button } from './ui/button';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { User } from '../App';

interface NavbarProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  currentPage?: string;
}

export default function Navbar({ user, onNavigate, onLogout, currentPage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = user 
    ? [
        { id: 'home', name: 'Home', page: user.role === 'user' ? 'user-dashboard' : user.role === 'driver' ? 'driver-dashboard' : 'admin-dashboard' },
        { id: 'routes', name: 'Routes', page: 'routes' },
        { id: 'fares', name: 'Fares', page: 'fares' },
        { id: 'stops', name: 'Stops', page: 'stops' },
        { id: 'drivers', name: 'Drivers', page: 'drivers' },
        { id: 'feedback', name: 'Feedback', page: 'feedback' },
      ]
    : [
        { id: 'home', name: 'Home', page: 'landing' },
        { id: 'routes', name: 'Routes', page: 'routes' },
        { id: 'fares', name: 'Fares', page: 'fares' },
        { id: 'stops', name: 'Stops', page: 'stops' },
        { id: 'drivers', name: 'Drivers', page: 'drivers' },
      ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate(user ? `${user.role}-dashboard` : 'landing')}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-[#2E7D32] flex items-center justify-center">
              <span className="text-white">🚎</span>
            </div>
            <span className="text-[#2E7D32]">Lakbay</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.page)}
                className={`transition-colors ${
                  currentPage === link.page
                    ? 'text-[#2E7D32]'
                    : 'text-gray-700 hover:text-[#2E7D32]'
                }`}
              >
                {link.name}
              </button>
            ))}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 hidden lg:block">
                  {user.name}
                </span>
                {onLogout && (
                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                )}
              </div>
            ) : (
              <Button
                onClick={() => onNavigate('login')}
                className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
              >
                Login
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <span className="text-sm text-gray-600 hidden sm:block">
                {user.name}
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left transition-colors ${
                    currentPage === link.page
                      ? 'text-[#2E7D32]'
                      : 'text-gray-700 hover:text-[#2E7D32]'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              {user ? (
                onLogout && (
                  <Button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="justify-start hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                )
              ) : (
                <Button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
                >
                  Login
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
