import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import InteractiveMap from './InteractiveMap';
import { Map, DollarSign, MapPin, MessageSquare } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserDashboardProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function UserDashboard({ user, onNavigate, onLogout }: UserDashboardProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const calculateFare = () => {
    if (origin && destination) {
      // Mock fare calculation
      const baseFare = 10;
      const distance = Math.floor(Math.random() * 10) + 1;
      const fare = baseFare + (distance * 2);
      setEstimatedFare(fare);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your feedback!', {
      description: 'Your feedback has been submitted successfully.'
    });
    setFeedback('');
    setRating(5);
  };

  const safetyTips = [
    { icon: '💰', title: 'Exact Fare', description: 'Prepare exact fare when possible' },
    { icon: '🎒', title: 'Secure Belongings', description: 'Keep your bags close and secure' },
    { icon: '🚪', title: 'Wait Safely', description: 'Stand away from the road edge' },
    { icon: '🗣️', title: 'Communicate Clearly', description: 'Tell driver your destination early' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="user-dashboard" />

      <div className="flex">
        {user && <UserSidebar onNavigate={onNavigate} currentPage="user-dashboard" />}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white rounded-lg p-6 mb-6">
            <h1 className="mb-2">Welcome, {user?.name}! 👋</h1>
            <p className="text-green-100">Ready to explore jeepney routes in Barangay Suarez?</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Interactive Map */}
            <Card>
              <CardHeader>
                <CardTitle>Route Map</CardTitle>
                <CardDescription>Interactive map showing jeepney routes from Suarez</CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveMap
                  center={[8.2100, 124.2280]}
                  zoom={12}
                  height="400px"
                  routes={[
                    {
                      name: 'Suarez to City Plaza',
                      color: '#2E7D32',
                      coordinates: [
                        [8.1915, 124.2151],   // Suarez Terminal
                        [8.1935, 124.2165],   // Local road
                        [8.1960, 124.2185],   // Residential area
                        [8.1980, 124.2200],   // Villa Verde
                        [8.2010, 124.2220],   // Heading to downtown
                        [8.2050, 124.2245],   // Continue northeast
                        [8.2100, 124.2270],   // Towards downtown
                        [8.2150, 124.2300],   // Downtown approach
                        [8.2200, 124.2330],   // Aguinaldo St approach
                        [8.2240, 124.2355],   // Near City Hall
                        [8.2285, 124.2371]    // Iligan City Public Plaza
                      ],
                    },
                    {
                      name: 'Suarez to Gaisano',
                      color: '#F9A825',
                      coordinates: [
                        [8.1915, 124.2151],   // Suarez Terminal
                        [8.1935, 124.2165],   // Local road
                        [8.1960, 124.2185],   // Northeast
                        [8.1980, 124.2200],   // Villa Verde
                        [8.2020, 124.2240],   // Continue on main road
                        [8.2060, 124.2280],   // Approaching Roxas
                        [8.2100, 124.2310],   // Roxas Ave
                        [8.2150, 124.2350],   // Along Roxas
                        [8.2200, 124.2385],   // Approaching mall area
                        [8.2250, 124.2400],   // Near mall
                        [8.2308, 124.2414]    // Gaisano Super City Mall
                      ],
                    },
                    {
                      name: 'Suarez to Robinsons',
                      color: '#1976D2',
                      coordinates: [
                        [8.1915, 124.2151],   // Suarez Terminal
                        [8.1935, 124.2170],   // Local streets
                        [8.1960, 124.2195],   // Residential
                        [8.1980, 124.2215],   // Villa Verde area
                        [8.2020, 124.2260],   // Heading to Macapagal
                        [8.2060, 124.2310],   // Macapagal Ave direction
                        [8.2100, 124.2350],   // Along Macapagal
                        [8.2140, 124.2380],   // Approaching mall
                        [8.2182, 124.2403]    // Robinsons Iligan
                      ],
                    },
                  ]}
                  markers={[
                    { position: [8.1915, 124.2151], label: 'Suarez Terminal', type: 'terminal' },
                    { position: [8.1980, 124.2200], label: 'Villa Verde Junction', type: 'stop' },
                    { position: [8.2285, 124.2371], label: 'City Plaza', type: 'terminal' },
                    { position: [8.2308, 124.2414], label: 'Gaisano Mall', type: 'terminal' },
                    { position: [8.2182, 124.2403], label: 'Robinsons Mall', type: 'terminal' },
                  ]}
                />
              </CardContent>
            </Card>

            {/* Fare Estimator */}
            <Card>
              <CardHeader>
                <CardTitle>Fare Estimator</CardTitle>
                <CardDescription>Calculate your jeepney fare</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Origin</Label>
                  <Select value={origin} onValueChange={setOrigin}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suarez">Suarez Terminal</SelectItem>
                      <SelectItem value="mahayahay">Mahayahay</SelectItem>
                      <SelectItem value="villa-verde">Villa Verde</SelectItem>
                      <SelectItem value="tubod">Tubod</SelectItem>
                      <SelectItem value="poblacion">Poblacion</SelectItem>
                      <SelectItem value="msu-iit">MSU-IIT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Destination</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suarez">Suarez Terminal</SelectItem>
                      <SelectItem value="mahayahay">Mahayahay</SelectItem>
                      <SelectItem value="villa-verde">Villa Verde</SelectItem>
                      <SelectItem value="tubod">Tubod</SelectItem>
                      <SelectItem value="poblacion">Poblacion</SelectItem>
                      <SelectItem value="msu-iit">MSU-IIT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={calculateFare} className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                  Calculate Fare
                </Button>
                {estimatedFare !== null && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Estimated Fare</p>
                    <p className="text-[#2E7D32]">₱{estimatedFare}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h2 className="mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('routes')}>
                <CardContent className="p-6 text-center">
                  <Map className="w-8 h-8 mx-auto mb-3 text-[#2E7D32]" />
                  <h3 className="mb-1 text-sm">Browse Routes</h3>
                  <p className="text-xs text-gray-600">View all available jeepney routes</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('stops')}>
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-3 text-[#2E7D32]" />
                  <h3 className="mb-1 text-sm">Find Stops</h3>
                  <p className="text-xs text-gray-600">Locate jeepney stops near you</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('driver-feedback')}>
                <CardContent className="p-6 text-center">
                  <span className="text-3xl mb-3 block">⭐</span>
                  <h3 className="mb-1 text-sm">Rate Driver</h3>
                  <p className="text-xs text-gray-600">Share your driver experience</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('feedback')}>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-8 h-8 mx-auto mb-3 text-[#2E7D32]" />
                  <h3 className="mb-1 text-sm">Give Feedback</h3>
                  <p className="text-xs text-gray-600">Help us improve our service</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="mb-6">
            <h2 className="mb-4">Safety Tips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {safetyTips.map((tip, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{tip.icon}</div>
                    <h3 className="mb-1 text-sm">{tip.title}</h3>
                    <p className="text-xs text-gray-600">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Share Your Feedback</CardTitle>
              <CardDescription>Help us improve the service</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-2xl"
                      >
                        {star <= rating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your experience..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button type="submit" className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}