import { useState } from 'react';
import { User, MapPin, Star, Phone, Mail, Calendar, Award, TrendingUp } from 'lucide-react';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import { User as UserType } from '../App';

interface Driver {
  id: number;
  name: string;
  licenseNumber: string;
  assignedRoute: string;
  rating: number;
  totalTrips: number;
  yearsOfService: number;
  phone: string;
  email: string;
  vehiclePlateNumber: string;
  avatarColor: string;
}

interface DriversPageProps {
  user?: UserType | null;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export default function DriversPage({ user = null, onNavigate = () => {}, onLogout }: DriversPageProps) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const drivers: Driver[] = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      licenseNumber: 'N01-12-345678',
      assignedRoute: 'Suarez Route 1',
      rating: 4.8,
      totalTrips: 1250,
      yearsOfService: 8,
      phone: '+63 912 345 6789',
      email: 'juan.delacruz@lakbay.com',
      vehiclePlateNumber: 'ABC 1234',
      avatarColor: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Maria Santos',
      licenseNumber: 'N01-12-876543',
      assignedRoute: 'Suarez Route 2',
      rating: 4.9,
      totalTrips: 1580,
      yearsOfService: 12,
      phone: '+63 923 456 7890',
      email: 'maria.santos@lakbay.com',
      vehiclePlateNumber: 'DEF 5678',
      avatarColor: 'bg-pink-500'
    },
    {
      id: 3,
      name: 'Pedro Reyes',
      licenseNumber: 'N01-12-234567',
      assignedRoute: 'Suarez Route 3',
      rating: 4.7,
      totalTrips: 980,
      yearsOfService: 6,
      phone: '+63 934 567 8901',
      email: 'pedro.reyes@lakbay.com',
      vehiclePlateNumber: 'GHI 9012',
      avatarColor: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Rosa Gonzales',
      licenseNumber: 'N01-12-345679',
      assignedRoute: 'Suarez Route 4',
      rating: 4.9,
      totalTrips: 1420,
      yearsOfService: 10,
      phone: '+63 945 678 9012',
      email: 'rosa.gonzales@lakbay.com',
      vehiclePlateNumber: 'JKL 3456',
      avatarColor: 'bg-purple-500'
    },
    {
      id: 5,
      name: 'Roberto Cruz',
      licenseNumber: 'N01-12-456780',
      assignedRoute: 'Suarez Route 5',
      rating: 4.6,
      totalTrips: 870,
      yearsOfService: 5,
      phone: '+63 956 789 0123',
      email: 'roberto.cruz@lakbay.com',
      vehiclePlateNumber: 'MNO 7890',
      avatarColor: 'bg-yellow-600'
    },
    {
      id: 6,
      name: 'Elena Ramos',
      licenseNumber: 'N01-12-567891',
      assignedRoute: 'Suarez Route 6',
      rating: 4.8,
      totalTrips: 1150,
      yearsOfService: 7,
      phone: '+63 967 890 1234',
      email: 'elena.ramos@lakbay.com',
      vehiclePlateNumber: 'PQR 1234',
      avatarColor: 'bg-red-500'
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : star - rating < 1
                ? 'fill-yellow-200 text-yellow-400'
                : 'fill-gray-200 text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="drivers" />
      
      <div className="flex">
        {user && <UserSidebar onNavigate={onNavigate} currentPage="drivers" />}
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-[#2E7D32] mb-2">Our Professional Drivers</h1>
              <p className="text-gray-600">
                Meet the dedicated drivers serving Barangay Suarez, Iligan City
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-900">Total Drivers</span>
              </div>
              <div className="text-blue-900">{drivers.length}</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-900">Avg Rating</span>
              </div>
              <div className="text-green-900">
                {(drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length).toFixed(1)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-yellow-900">Total Trips</span>
              </div>
              <div className="text-yellow-900">
                {drivers.reduce((sum, d) => sum + d.totalTrips, 0).toLocaleString()}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-purple-900">Avg Experience</span>
              </div>
              <div className="text-purple-900">
                {Math.round(drivers.reduce((sum, d) => sum + d.yearsOfService, 0) / drivers.length)} years
              </div>
            </div>
          </div>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => setSelectedDriver(driver)}
            >
              {/* Card Header with Avatar */}
              <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 ${driver.avatarColor} rounded-full flex items-center justify-center text-white text-2xl shadow-lg`}>
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{driver.name}</h3>
                    <div className="flex items-center gap-2 text-green-100 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{driver.assignedRoute}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Rating */}
                <div className="mb-4">
                  {renderStars(driver.rating)}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Total Trips</div>
                    <div className="text-[#2E7D32]">{driver.totalTrips.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Experience</div>
                    <div className="text-[#2E7D32]">{driver.yearsOfService} years</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone className="w-4 h-4 text-[#2E7D32]" />
                    <span>{driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail className="w-4 h-4 text-[#2E7D32]" />
                    <span className="truncate">{driver.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <User className="w-4 h-4 text-[#2E7D32]" />
                    <span>{driver.vehiclePlateNumber}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  className="w-full mt-4 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white py-2 rounded-lg hover:shadow-lg transition-shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDriver(driver);
                  }}
                >
                  View Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Driver Detail Modal */}
        {selectedDriver && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedDriver(null)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] p-8 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-24 h-24 ${selectedDriver.avatarColor} rounded-full flex items-center justify-center text-white text-3xl shadow-lg`}>
                      {selectedDriver.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-white mb-2">{selectedDriver.name}</h2>
                      <div className="flex items-center gap-2 text-green-100 mb-2">
                        <MapPin className="w-5 h-5" />
                        <span>{selectedDriver.assignedRoute}</span>
                      </div>
                      {renderStars(selectedDriver.rating)}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDriver(null)}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">License Number</div>
                      <div className="text-gray-900">{selectedDriver.licenseNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Vehicle Plate</div>
                      <div className="text-gray-900">{selectedDriver.vehiclePlateNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Phone Number</div>
                      <div className="text-gray-900">{selectedDriver.phone}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Email Address</div>
                      <div className="text-gray-900">{selectedDriver.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Years of Service</div>
                      <div className="text-gray-900">{selectedDriver.yearsOfService} years</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Total Trips Completed</div>
                      <div className="text-gray-900">{selectedDriver.totalTrips.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-gray-900 mb-3">Driver Information</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Professional License:</strong> {selectedDriver.licenseNumber}</p>
                    <p><strong>Vehicle:</strong> {selectedDriver.vehiclePlateNumber}</p>
                    <p><strong>Service Record:</strong> {selectedDriver.totalTrips.toLocaleString()} trips completed</p>
                    <p><strong>Rating:</strong> {selectedDriver.rating} out of 5.0 stars</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
