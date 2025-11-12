import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import Navbar from './Navbar';
import InteractiveMap from './InteractiveMap';
import { Home, Map, DollarSign, MapPin, MessageSquare, Menu, X, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserDashboardProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function UserDashboard({ user, onNavigate, onLogout }: UserDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    { icon: '😷', title: 'Wear Face Mask', description: 'Always wear your face mask properly' },
    { icon: '💰', title: 'Exact Fare', description: 'Prepare exact fare when possible' },
    { icon: '👥', title: 'Social Distance', description: 'Maintain safe distance from others' },
    { icon: '🚪', title: 'Wait Safely', description: 'Stand away from the road edge' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="user-dashboard" />

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-white border-r min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2E7D32] text-white">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button onClick={() => onNavigate('routes')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
              <Map className="w-5 h-5" />
              <span>Routes</span>
            </button>
            <button onClick={() => onNavigate('fares')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
              <DollarSign className="w-5 h-5" />
              <span>Fares</span>
            </button>
            <button onClick={() => onNavigate('stops')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
              <MapPin className="w-5 h-5" />
              <span>Stops</span>
            </button>
            <button onClick={() => onNavigate('drivers')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
              <UserIcon className="w-5 h-5" />
              <span>Drivers</span>
            </button>
            <button onClick={() => onNavigate('feedback')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
              <MessageSquare className="w-5 h-5" />
              <span>Feedback</span>
            </button>
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <aside className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)}>
            <div className="w-64 bg-white h-full" onClick={(e) => e.stopPropagation()}>
              <nav className="p-4 space-y-2">
                <button onClick={() => { setSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2E7D32] text-white">
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </button>
                <button onClick={() => { onNavigate('routes'); setSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  <Map className="w-5 h-5" />
                  <span>Routes</span>
                </button>
                <button onClick={() => { onNavigate('fares'); setSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  <DollarSign className="w-5 h-5" />
                  <span>Fares</span>
                </button>
                <button onClick={() => { onNavigate('stops'); setSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  <MapPin className="w-5 h-5" />
                  <span>Stops</span>
                </button>
                <button onClick={() => { onNavigate('drivers'); setSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  <UserIcon className="w-5 h-5" />
                  <span>Drivers</span>
                </button>
                <button onClick={() => { onNavigate('feedback'); setSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  <MessageSquare className="w-5 h-5" />
                  <span>Feedback</span>
                </button>
              </nav>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
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
                  center={[8.2280, 124.2452]}
                  zoom={13}
                  height="400px"
                  routes={[
                    {
                      name: 'Suarez to Poblacion',
                      color: '#2E7D32',
                      coordinates: [
                        [8.2280, 124.2452], // Suarez
                        [8.2285, 124.2460], // Villa Verde
                        [8.2290, 124.2470], // Pala-o
                        [8.2288, 124.2480], // Poblacion
                      ],
                    },
                    {
                      name: 'Suarez to MSU-IIT',
                      color: '#F9A825',
                      coordinates: [
                        [8.2280, 124.2452], // Suarez
                        [8.2285, 124.2460], // Villa Verde
                        [8.2290, 124.2465], // MSU-IIT
                      ],
                    },
                  ]}
                  markers={[
                    { position: [8.2280, 124.2452], label: 'Suarez Terminal', type: 'terminal' },
                    { position: [8.2285, 124.2460], label: 'Villa Verde Junction', type: 'stop' },
                    { position: [8.2288, 124.2480], label: 'Poblacion', type: 'terminal' },
                    { position: [8.2290, 124.2465], label: 'MSU-IIT', type: 'terminal' },
                    { position: [8.2283, 124.2455], label: 'Mahayahay Center', type: 'stop' },
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

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="grid grid-cols-6 gap-1 p-2">
          <button onClick={() => onNavigate('user-dashboard')} className="flex flex-col items-center gap-1 py-2 text-[#2E7D32]">
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button onClick={() => onNavigate('routes')} className="flex flex-col items-center gap-1 py-2 text-gray-600">
            <Map className="w-5 h-5" />
            <span className="text-xs">Map</span>
          </button>
          <button onClick={() => onNavigate('fares')} className="flex flex-col items-center gap-1 py-2 text-gray-600">
            <DollarSign className="w-5 h-5" />
            <span className="text-xs">Fare</span>
          </button>
          <button onClick={() => onNavigate('stops')} className="flex flex-col items-center gap-1 py-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span className="text-xs">Stops</span>
          </button>
          <button onClick={() => onNavigate('drivers')} className="flex flex-col items-center gap-1 py-2 text-gray-600">
            <UserIcon className="w-5 h-5" />
            <span className="text-xs">Drivers</span>
          </button>
          <button onClick={() => onNavigate('feedback')} className="flex flex-col items-center gap-1 py-2 text-gray-600">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Feedback</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
