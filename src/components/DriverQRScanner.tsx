import { useState } from 'react';
import { User as UserType } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import { QrCode, User, MapPin, Star, Phone, Mail, Calendar, Award, TrendingUp, X } from 'lucide-react';
import { Badge } from './ui/badge';

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

interface DriverQRScannerProps {
  user?: UserType | null;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export default function DriverQRScanner({ user = null, onNavigate = () => {}, onLogout }: DriverQRScannerProps) {
  const [qrCode, setQrCode] = useState('');
  const [scannedDriver, setScannedDriver] = useState<Driver | null>(null);
  const [error, setError] = useState('');

  // Sample drivers database (same as in DriversPage for admin)
  const drivers: Driver[] = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      licenseNumber: 'N01-12-345678',
      assignedRoute: 'Suarez to Poblacion',
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
      assignedRoute: 'Suarez to City Plaza',
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
      assignedRoute: 'Suarez to Gaisano',
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
      assignedRoute: 'Suarez to Robinsons',
      rating: 4.9,
      totalTrips: 1420,
      yearsOfService: 10,
      phone: '+63 945 678 9012',
      email: 'rosa.gonzales@lakbay.com',
      vehiclePlateNumber: 'JKL 3456',
      avatarColor: 'bg-purple-500'
    },
  ];

  const handleScan = () => {
    setError('');
    
    // QR code format: DRIVER-{id}
    if (!qrCode.trim()) {
      setError('Please enter a QR code');
      return;
    }

    const match = qrCode.match(/DRIVER-(\d+)/);
    if (!match) {
      setError('Invalid QR code format');
      return;
    }

    const driverId = parseInt(match[1]);
    const driver = drivers.find(d => d.id === driverId);

    if (driver) {
      setScannedDriver(driver);
      setError('');
    } else {
      setError('Driver not found');
      setScannedDriver(null);
    }
  };

  const handleReset = () => {
    setQrCode('');
    setScannedDriver(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="scan-driver" />

      <div className="flex">
        <UserSidebar currentPage="scan-driver" onNavigate={onNavigate} />

        <main className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="mb-2">Scan Driver QR Code</h1>
              <p className="text-gray-600">
                Scan the driver's QR code to view their information and rating
              </p>
            </div>

            {/* QR Scanner Card */}
            {!scannedDriver ? (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-6 h-6 text-[#2E7D32]" />
                    Enter QR Code
                  </CardTitle>
                  <CardDescription>
                    Type or paste the QR code from the driver's vehicle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., DRIVER-1"
                        value={qrCode}
                        onChange={(e) => setQrCode(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                        className="flex-1"
                      />
                      <Button onClick={handleScan} className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                        Scan
                      </Button>
                    </div>
                    
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>How to use:</strong> Look for the QR code sticker inside the jeepney or ask the driver to show their QR code. Each driver has a unique code format like "DRIVER-1", "DRIVER-2", etc.
                      </p>
                    </div>

                    {/* Demo QR Codes */}
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 mb-3">Try these demo QR codes:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {drivers.map((driver) => (
                          <Button
                            key={driver.id}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setQrCode(`DRIVER-${driver.id}`);
                              setError('');
                            }}
                          >
                            {driver.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Driver Information Card */
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-6 h-6 text-[#2E7D32]" />
                        Driver Information
                      </CardTitle>
                      <CardDescription>Verified driver details</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleReset}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Driver Header */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] rounded-lg text-white">
                      <div className={`w-16 h-16 rounded-full ${scannedDriver.avatarColor} flex items-center justify-center text-2xl text-white`}>
                        {scannedDriver.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-white mb-1">{scannedDriver.name}</h2>
                        <p className="text-green-100 text-sm">License: {scannedDriver.licenseNumber}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-300 mb-1">
                          <Star className="w-5 h-5 fill-yellow-300" />
                          <span className="text-xl">{scannedDriver.rating}</span>
                        </div>
                        <p className="text-green-100 text-sm">{scannedDriver.totalTrips} trips</p>
                      </div>
                    </div>

                    {/* Driver Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                        <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl text-blue-900 mb-1">{scannedDriver.totalTrips}</p>
                        <p className="text-sm text-blue-700">Total Trips</p>
                      </div>
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
                        <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl text-purple-900 mb-1">{scannedDriver.yearsOfService}</p>
                        <p className="text-sm text-purple-700">Years of Service</p>
                      </div>
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
                        <Star className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                        <p className="text-2xl text-amber-900 mb-1">{scannedDriver.rating}/5.0</p>
                        <p className="text-sm text-amber-700">Rating</p>
                      </div>
                    </div>

                    {/* Route & Vehicle Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-[#2E7D32]" />
                        <div>
                          <p className="text-sm text-gray-600">Assigned Route</p>
                          <p className="text-gray-900">{scannedDriver.assignedRoute}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-[#2E7D32]" />
                        <div>
                          <p className="text-sm text-gray-600">Vehicle Plate Number</p>
                          <p className="text-gray-900">{scannedDriver.vehiclePlateNumber}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="border-t pt-4">
                      <h3 className="mb-3">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Phone className="w-5 h-5 text-[#2E7D32]" />
                          <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="text-gray-900">{scannedDriver.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Mail className="w-5 h-5 text-[#2E7D32]" />
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="text-gray-900">{scannedDriver.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Button className="flex-1" variant="outline" onClick={handleReset}>
                        Scan Another Driver
                      </Button>
                      <Button 
                        className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]"
                        onClick={() => onNavigate('feedback')}
                      >
                        Rate Driver
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}