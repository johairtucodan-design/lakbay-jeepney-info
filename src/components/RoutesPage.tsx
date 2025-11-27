import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import InteractiveMap from './InteractiveMap';
import { Search, MapPin, Clock, DollarSign, X } from 'lucide-react';

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
      name: 'Suarez to Desmark',
      origin: 'Barangay Suarez Terminal',
      destination: 'Desmark (Dupoint Bldg.)',
      fareMin: 12,
      fareMax: 15,
      distance: '4.5 km',
      duration: '15-20 mins',
      popularity: 'High',
      stops: ['Suarez Terminal', 'Desmark'],
      landmarks: ['Suarez Barangay Hall', 'Villa Verde Subdivision', 'National Highway Junction', 'Roxas Avenue', 'Dupoint Building'],
      schedule: 'First Trip: 5:30 AM | Last Trip: 8:00 PM',
      frequency: 'Every 10 minutes',
      coordinates: [
        [8.191383124090216, 124.21514229708531],
        [8.193736983523905, 124.21511707887781],
        [8.196823561872954, 124.21326586726063],
        [8.197395733867145, 124.2113031128139],
        [8.198467291729273, 124.21035581968397],
        [8.20224885779189, 124.210564938125],
        [8.205447271053712, 124.20887026643493],
        [8.21194677685325, 124.22640328045594],
        [8.21227003875664, 124.23069466552367],
        [8.215965054868358, 124.23880774037669],
        [8.219008356819732, 124.24189537185012],
        [8.226014936484185, 124.24003055810114],
        [8.226451803378593, 124.2401040739517],
        [8.227007946484214, 124.24021422576045],
        [8.227653643199773, 124.24038210871517],
        [8.229505915841813, 124.24063492669981],
        [8.229549836192286, 124.24050143996944]
      ] as Array<[number, number]>
    },
    {
      id: 2,
      name: 'Suarez to City Plaza',
      origin: 'Barangay Suarez Terminal',
      destination: 'Iligan City Public Plaza',
      fareMin: 12,
      fareMax: 15,
      distance: '5 km',
      duration: '18-25 mins',
      popularity: 'High',
      stops: ['Suarez Terminal', 'Public Plaza'],
      landmarks: ['Suarez Barangay Hall', 'Villa Verde Subdivision', 'National Highway', 'City Hall', 'Public Plaza'],
      schedule: 'First Trip: 5:00 AM | Last Trip: 9:00 PM',
      frequency: 'Every 8 minutes',
      coordinates: [
        [8.191383124090216, 124.21514229708531],
        [8.193736983523905, 124.21511707887781],
        [8.196823561872954, 124.21326586726063],
        [8.197395733867145, 124.2113031128139],
        [8.198467291729273, 124.21035581968397],
        [8.20224885779189, 124.210564938125],
        [8.205447271053712, 124.20887026643493],
        [8.21194677685325, 124.22640328045594],
        [8.21227003875664, 124.23069466552367],
        [8.215965054868358, 124.23880774037669],
        [8.219008356819732, 124.24189537185012],
        [8.226014936484185, 124.24003055810114],
        [8.226451803378593, 124.2401040739517],
        [8.227007946484214, 124.24021422576045],
        [8.227653643199773, 124.24038210871517],
        [8.229505915841813, 124.24063492669981],
        [8.228348261940285, 124.23720561055194]
      ] as Array<[number, number]>
    },
    {
      id: 3,
      name: 'Suarez to Octagon',
      origin: 'Barangay Suarez Terminal',
      destination: 'Octagon Business Center',
      fareMin: 12,
      fareMax: 15,
      distance: '5.2 km',
      duration: '20-25 mins',
      popularity: 'High',
      stops: ['Suarez Terminal', 'Octagon'],
      landmarks: ['Suarez Barangay Hall', 'Villa Verde Subdivision', 'National Highway', 'Quezon Avenue Extension', 'Octagon Business Center'],
      schedule: 'First Trip: 6:00 AM | Last Trip: 9:00 PM',
      frequency: 'Every 10 minutes',
      coordinates: [
        [8.191383124090216, 124.21514229708531],
        [8.193736983523905, 124.21511707887781],
        [8.196823561872954, 124.21326586726063],
        [8.197395733867145, 124.2113031128139],
        [8.198467291729273, 124.21035581968397],
        [8.20224885779189, 124.210564938125],
        [8.205447271053712, 124.20887026643493],
        [8.21194677685325, 124.22640328045594],
        [8.21227003875664, 124.23069466552367],
        [8.215965054868358, 124.23880774037669],
        [8.219008356819732, 124.24189537185012],
        [8.226014936484185, 124.24003055810114],
        [8.226451803378593, 124.2401040739517],
        [8.227007946484214, 124.24021422576045],
        [8.227653643199773, 124.24038210871517],
        [8.229505915841813, 124.24063492669981],
        [8.229859157670553, 124.23766276158803]
      ] as Array<[number, number]>
    },
    {
      id: 4,
      name: 'Suarez to Robinsons',
      origin: 'Barangay Suarez Terminal',
      destination: 'Robinsons Iligan',
      fareMin: 10,
      fareMax: 12,
      distance: '3.8 km',
      duration: '12-18 mins',
      popularity: 'High',
      stops: ['Suarez Terminal', 'Robinsons Mall'],
      landmarks: ['Suarez Barangay Hall', 'Villa Verde Subdivision', 'National Highway', 'Macapagal Avenue', 'Robinsons Place Iligan'],
      schedule: 'First Trip: 6:00 AM | Last Trip: 9:30 PM',
      frequency: 'Every 12 minutes',
      coordinates: [
        [8.191383124090216, 124.21514229708531],
        [8.193736983523905, 124.21511707887781],
        [8.196823561872954, 124.21326586726063],
        [8.197395733867145, 124.2113031128139],
        [8.198467291729273, 124.21035581968397],
        [8.20224885779189, 124.210564938125],
        [8.205447271053712, 124.20887026643493],
        [8.21194677685325, 124.22640328045594],
        [8.21227003875664, 124.23069466552367],
        [8.215965054868358, 124.23880774037669],
        [8.217973817147191, 124.24092146525878]
      ] as Array<[number, number]>
    },
    {
      id: 5,
      name: 'Suarez to Wet Market',
      origin: 'Barangay Suarez Terminal',
      destination: 'Iligan City Wet Market',
      fareMin: 12,
      fareMax: 15,
      distance: '4.8 km',
      duration: '18-22 mins',
      popularity: 'High',
      stops: ['Suarez Terminal', 'Wet Market'],
      landmarks: ['Suarez Barangay Hall', 'Villa Verde Subdivision', 'National Highway', 'Downtown Iligan', 'Central Wet Market'],
      schedule: 'First Trip: 4:30 AM | Last Trip: 7:00 PM',
      frequency: 'Every 10 minutes',
      coordinates: [
        [8.191383124090216, 124.21514229708531],
        [8.193736983523905, 124.21511707887781],
        [8.196823561872954, 124.21326586726063],
        [8.197395733867145, 124.2113031128139],
        [8.198467291729273, 124.21035581968397],
        [8.20224885779189, 124.210564938125],
        [8.205447271053712, 124.20887026643493],
        [8.21194677685325, 124.22640328045594],
        [8.21227003875664, 124.23069466552367],
        [8.215965054868358, 124.23880774037669],
        [8.219008356819732, 124.24189537185012],
        [8.226014936484185, 124.24003055810114],
        [8.226451803378593, 124.2401040739517],
        [8.227007946484214, 124.24021422576045],
        [8.227653643199773, 124.24038210871517],
        [8.229505915841813, 124.24063492669981],
        [8.229063462839681, 124.23375493117867]
      ] as Array<[number, number]>
    },
    {
      id: 6,
      name: 'Suarez to Jollibee Aguinaldo',
      origin: 'Barangay Suarez Terminal',
      destination: 'Jollibee Aguinaldo',
      fareMin: 12,
      fareMax: 15,
      distance: '4.9 km',
      duration: '18-23 mins',
      popularity: 'Medium',
      stops: ['Suarez Terminal', 'Jollibee Aguinaldo'],
      landmarks: ['Suarez Barangay Hall', 'Villa Verde Subdivision', 'National Highway', 'City Hall Area', 'Jollibee Aguinaldo'],
      schedule: 'First Trip: 6:00 AM | Last Trip: 7:00 PM',
      frequency: 'Every 15 minutes',
      coordinates: [
        [8.191383124090216, 124.21514229708531],
        [8.193736983523905, 124.21511707887781],
        [8.196823561872954, 124.21326586726063],
        [8.197395733867145, 124.2113031128139],
        [8.198467291729273, 124.21035581968397],
        [8.20224885779189, 124.210564938125],
        [8.205447271053712, 124.20887026643493],
        [8.21194677685325, 124.22640328045594],
        [8.21227003875664, 124.23069466552367],
        [8.215965054868358, 124.23880774037669],
        [8.219008356819732, 124.24189537185012],
        [8.226014936484185, 124.24003055810114],
        [8.226451803378593, 124.2401040739517],
        [8.227007946484214, 124.24021422576045],
        [8.227653643199773, 124.24038210871517],
        [8.22776558137087, 124.2404171030795]
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
          <div className="mb-6">
            <h1 className="mb-2">Jeepney Routes</h1>
            <p className="text-gray-600">Browse all available routes in Barangay Suarez, Iligan City</p>
          </div>

          {/* Main Layout: Map + Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Big Map Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#2E7D32]" />
                    {selectedRoute ? selectedRoute.name : 'All Routes Map'}
                  </CardTitle>
                  <CardDescription>
                    {selectedRoute 
                      ? `${selectedRoute.origin} → ${selectedRoute.destination}`
                      : 'Select a route to view details'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveMap
                    center={selectedRoute 
                      ? selectedRoute.coordinates[Math.floor(selectedRoute.coordinates.length / 2)]
                      : [8.1915, 124.2151]
                    }
                    zoom={selectedRoute ? 14 : 13}
                    height="500px"
                    routes={selectedRoute 
                      ? [{
                          name: selectedRoute.name,
                          color: '#2E7D32',
                          coordinates: selectedRoute.coordinates,
                        }]
                      : routes.map(route => ({
                          name: route.name,
                          color: '#2E7D32',
                          coordinates: route.coordinates,
                        }))
                    }
                    markers={selectedRoute 
                      ? [
                          {
                            position: selectedRoute.coordinates[0],
                            label: selectedRoute.origin,
                            type: 'terminal' as const,
                          },
                          {
                            position: selectedRoute.coordinates[selectedRoute.coordinates.length - 1],
                            label: selectedRoute.destination,
                            type: 'terminal' as const,
                          }
                        ]
                      : []
                    }
                  />
                </CardContent>
              </Card>
            </div>

            {/* Route Details Sidebar */}
            <div className="lg:col-span-1">
              {selectedRoute ? (
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{selectedRoute.name}</CardTitle>
                        <Badge variant={selectedRoute.popularity === 'High' ? 'default' : 'secondary'} className={selectedRoute.popularity === 'High' ? 'bg-[#2E7D32]' : ''}>
                          {selectedRoute.popularity}
                        </Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSelectedRoute(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 overflow-y-auto max-h-[calc(500px-80px)]">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Distance</p>
                        <p className="text-sm">{selectedRoute.distance}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Duration</p>
                        <p className="text-sm">{selectedRoute.duration}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Fare</p>
                        <p className="text-sm text-[#2E7D32]">₱{selectedRoute.fareMin} - ₱{selectedRoute.fareMax}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Frequency</p>
                        <p className="text-sm">{selectedRoute.frequency}</p>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <p className="text-sm text-blue-900">Operating Hours</p>
                      </div>
                      <p className="text-xs text-blue-800">{selectedRoute.schedule}</p>
                    </div>

                    {/* Route Stops */}
                    <div>
                      <p className="text-sm mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#2E7D32]" />
                        Route Stops
                      </p>
                      <div className="space-y-2">
                        {selectedRoute.stops.map((stop: string, index: number) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                              index === 0 ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-sm">{stop}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Landmarks */}
                    <div>
                      <p className="text-sm mb-2">Nearby Landmarks</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedRoute.landmarks.map((landmark: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">{landmark}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Fare Info */}
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-xs text-green-800">
                        <DollarSign className="w-3 h-3 inline mr-1" />
                        Rates are standardized as per LGU regulations. Please prepare exact fare when possible.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-2">No route selected</p>
                    <p className="text-sm text-gray-400">Click on any route below to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
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

          {/* Routes Grid */}
          <div>
            <h2 className="mb-4">Available Routes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRoutes.map((route) => (
                <Card 
                  key={route.id} 
                  className={`hover:shadow-lg transition-all cursor-pointer ${
                    selectedRoute?.id === route.id ? 'ring-2 ring-[#2E7D32] shadow-lg' : ''
                  }`} 
                  onClick={() => setSelectedRoute(route)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-base">{route.name}</CardTitle>
                      <Badge variant={route.popularity === 'High' ? 'default' : 'secondary'} className={route.popularity === 'High' ? 'bg-[#2E7D32]' : ''}>
                        {route.popularity}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {route.origin} → {route.destination}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Distance:</span>
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span>{route.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Fare:</span>
                        <span className="text-[#2E7D32]">₱{route.fareMin} - ₱{route.fareMax}</span>
                      </div>
                    </div>
                    <Button 
                      className={`w-full mt-4 ${
                        selectedRoute?.id === route.id 
                          ? 'bg-[#1B5E20] hover:bg-[#1B5E20]' 
                          : 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                      }`}
                    >
                      {selectedRoute?.id === route.id ? 'Selected' : 'View Details'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {filteredRoutes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No routes found matching your search.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}