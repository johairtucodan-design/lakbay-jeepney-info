import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import InteractiveMap from './InteractiveMap';
import { Search, MapPin, Clock, DollarSign } from 'lucide-react';

interface RoutesPageProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function RoutesPage({ user, onNavigate, onLogout }: RoutesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  const routes = [
    {
      id: 1,
      name: 'Suarez to Tubod',
      origin: 'Barangay Suarez',
      destination: 'Tubod',
      fareMin: 10,
      fareMax: 15,
      distance: '5 km',
      duration: '15-20 mins',
      popularity: 'High',
      stops: ['Suarez Elementary School', 'Suarez Market', 'Mahayahay', 'San Miguel', 'Tubod'],
      landmarks: ['Suarez Barangay Hall', 'Saint Michael Church', 'Tubod Elementary School'],
      schedule: 'First Trip: 5:30 AM | Last Trip: 8:00 PM',
      frequency: 'Every 15 minutes',
      coordinates: [
        [8.2280, 124.2452],
        [8.2278, 124.2455],
        [8.2283, 124.2455],
        [8.2275, 124.2450],
        [8.2270, 124.2448]
      ] as Array<[number, number]>
    },
    {
      id: 2,
      name: 'Suarez to Poblacion',
      origin: 'Barangay Suarez',
      destination: 'Poblacion (City Center)',
      fareMin: 12,
      fareMax: 18,
      distance: '7 km',
      duration: '20-25 mins',
      popularity: 'High',
      stops: ['Suarez Terminal', 'Villa Verde', 'Pala-o', 'Quezon Avenue', 'Poblacion'],
      landmarks: ['Suarez Chapel', 'Pala-o Church', 'City Hall', 'Iligan City Public Market'],
      schedule: 'First Trip: 5:00 AM | Last Trip: 9:00 PM',
      frequency: 'Every 10 minutes',
      coordinates: [
        [8.2280, 124.2452],
        [8.2285, 124.2460],
        [8.2290, 124.2470],
        [8.2287, 124.2475],
        [8.2288, 124.2480]
      ] as Array<[number, number]>
    },
    {
      id: 3,
      name: 'Suarez to MSU-IIT',
      origin: 'Barangay Suarez',
      destination: 'MSU-IIT Campus',
      fareMin: 10,
      fareMax: 15,
      distance: '6 km',
      duration: '15-20 mins',
      popularity: 'High',
      stops: ['Suarez Barangay Hall', 'Villa Verde', 'Tibanga Highway', 'MSU-IIT Gate'],
      landmarks: ['Suarez Elementary School', 'MSU-IIT Campus', 'Tibanga Terminal'],
      schedule: 'First Trip: 6:00 AM | Last Trip: 7:00 PM',
      frequency: 'Every 15 minutes',
      coordinates: [
        [8.2280, 124.2452],
        [8.2285, 124.2460],
        [8.2288, 124.2463],
        [8.2290, 124.2465]
      ] as Array<[number, number]>
    },
    {
      id: 4,
      name: 'Suarez to Mahayahay',
      origin: 'Barangay Suarez',
      destination: 'Mahayahay',
      fareMin: 8,
      fareMax: 10,
      distance: '3 km',
      duration: '10 mins',
      popularity: 'Medium',
      stops: ['Suarez Terminal', 'Suarez-Mahayahay Road', 'Mahayahay Center'],
      landmarks: ['Suarez Market', 'Mahayahay Elementary School', 'Mahayahay Chapel'],
      schedule: 'First Trip: 5:30 AM | Last Trip: 7:30 PM',
      frequency: 'Every 20 minutes',
      coordinates: [
        [8.2280, 124.2452],
        [8.2282, 124.2454],
        [8.2283, 124.2455]
      ] as Array<[number, number]>
    },
    {
      id: 5,
      name: 'Suarez to Santiago',
      origin: 'Barangay Suarez',
      destination: 'Santiago',
      fareMin: 10,
      fareMax: 12,
      distance: '4 km',
      duration: '12-15 mins',
      popularity: 'Medium',
      stops: ['Suarez', 'Villa Verde', 'Santiago Road', 'Santiago Proper'],
      landmarks: ['Santiago Church', 'Santiago Elementary School'],
      schedule: 'First Trip: 6:00 AM | Last Trip: 6:30 PM',
      frequency: 'Every 25 minutes',
      coordinates: [
        [8.2280, 124.2452],
        [8.2285, 124.2460],
        [8.2283, 124.2458],
        [8.2283, 124.2458]
      ] as Array<[number, number]>
    },
    {
      id: 6,
      name: 'Suarez to Tibanga',
      origin: 'Barangay Suarez',
      destination: 'Tibanga',
      fareMin: 12,
      fareMax: 15,
      distance: '8 km',
      duration: '20-25 mins',
      popularity: 'Medium',
      stops: ['Suarez', 'Mahayahay', 'Tibanga Highway', 'Tibanga Center'],
      landmarks: ['Tibanga Terminal', 'Tibanga Elementary School', 'MSU-IIT'],
      schedule: 'First Trip: 5:30 AM | Last Trip: 7:00 PM',
      frequency: 'Every 20 minutes',
      coordinates: [
        [8.2280, 124.2452],
        [8.2283, 124.2455],
        [8.2292, 124.2466],
        [8.2295, 124.2468]
      ] as Array<[number, number]>
    }
  ];

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="routes" />

      <div className="flex">
        {user && <UserSidebar onNavigate={onNavigate} currentPage="routes" />}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        <div className="mb-8">
          <h1 className="mb-2">Jeepney Routes</h1>
          <p className="text-gray-600">Browse all available routes in Barangay Suarez, Iligan City</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by route name, origin, or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Routes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <Card key={route.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedRoute(route)}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{route.name}</CardTitle>
                  <Badge variant={route.popularity === 'High' ? 'default' : 'secondary'} className={route.popularity === 'High' ? 'bg-[#2E7D32]' : ''}>
                    {route.popularity}
                  </Badge>
                </div>
                <CardDescription>
                  {route.origin} → {route.destination}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Distance:</span>
                    <span>{route.distance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Fare:</span>
                    <span className="text-[#2E7D32]">₱{route.fareMin} - ₱{route.fareMax}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-500 mb-2">Major Stops:</p>
                    <p className="text-sm">{route.stops.slice(0, 3).join(' • ')}</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-[#2E7D32] hover:bg-[#1B5E20]">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No routes found matching your search.</p>
          </div>
        )}
      </main>
      </div>

      {/* Route Detail Modal */}
      <Dialog open={!!selectedRoute} onOpenChange={() => setSelectedRoute(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRoute?.name}</DialogTitle>
            <DialogDescription>Complete route information and schedule</DialogDescription>
          </DialogHeader>
          
          {selectedRoute && (
            <div className="space-y-6">
              {/* Route Map Preview */}
              <InteractiveMap
                center={selectedRoute.coordinates[Math.floor(selectedRoute.coordinates.length / 2)]}
                zoom={14}
                height="350px"
                routes={[
                  {
                    name: selectedRoute.name,
                    color: '#2E7D32',
                    coordinates: selectedRoute.coordinates,
                  },
                ]}
                markers={selectedRoute.coordinates.map((coord, index) => ({
                  position: coord,
                  label: selectedRoute.stops[index] || `Stop ${index + 1}`,
                  type: (index === 0 || index === selectedRoute.coordinates.length - 1) ? 'terminal' : 'stop',
                }))}
              />

              {/* Route Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Distance</p>
                  <p>{selectedRoute.distance}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p>{selectedRoute.duration}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Fare Range</p>
                  <p className="text-[#2E7D32]">₱{selectedRoute.fareMin} - ₱{selectedRoute.fareMax}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Frequency</p>
                  <p>{selectedRoute.frequency}</p>
                </div>
              </div>

              {/* Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Clock className="w-5 h-5 text-[#2E7D32]" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedRoute.schedule}</p>
                </CardContent>
              </Card>

              {/* Route Stops */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <MapPin className="w-5 h-5 text-[#2E7D32]" />
                    Route Stops
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedRoute.stops.map((stop: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-green-500' : 
                          index === selectedRoute.stops.length - 1 ? 'bg-red-500' : 
                          'bg-[#F9A825]'
                        }`}></div>
                        <span className="text-sm">{stop}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Landmarks */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Nearby Landmarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoute.landmarks.map((landmark: string, index: number) => (
                      <Badge key={index} variant="outline">{landmark}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fare Info */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  <strong>Fare Information:</strong> Rates are standardized as per LGU regulations. Please prepare exact fare when possible.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
