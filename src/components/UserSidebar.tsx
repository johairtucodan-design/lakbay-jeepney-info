import { Home, Map, DollarSign, MapPin, MessageSquare, Star, Settings } from 'lucide-react';

interface UserSidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function UserSidebar({ onNavigate, currentPage }: UserSidebarProps) {
  const menuItems = [
    { id: 'user-dashboard', label: 'Home', icon: Home },
    { id: 'routes', label: 'Routes', icon: Map },
    { id: 'fares', label: 'Fares', icon: DollarSign },
    { id: 'stops', label: 'Stops', icon: MapPin },
    { id: 'driver-feedback', label: 'Driver Reviews', icon: Star },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'user-settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r min-h-[calc(100vh-73px)] sticky top-[73px]">
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive
                    ? 'bg-[#2E7D32] text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="grid grid-cols-7 gap-1 p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const mobileLabel = 
              item.label === 'Routes' ? 'Map' : 
              item.label === 'Fares' ? 'Fare' : 
              item.label === 'Driver Reviews' ? 'Drivers' :
              item.label === 'Feedback' ? 'Help' :
              item.label === 'Settings' ? 'Profile' :
              item.label;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 py-2 ${
                  isActive ? 'text-[#2E7D32]' : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{mobileLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}