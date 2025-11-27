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
import { MapPin, Search, Building2, X, Clock } from 'lucide-react';

interface StopsPageProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function StopsPage({ user, onNavigate, onLogout }: StopsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStop, setSelectedStop] = useState<any>(null);

  const stops = [
    {
      id: 1,
      name: 'Suarez Terminal',
      type: 'Terminal',
      coordinates: '8°11\'29.4"N, 124°12\'54.4"E',
      position: [8.1915, 124.2151] as [number, number],
      routes: ['Suarez to Desmark', 'Suarez to City Plaza', 'Suarez to Gaisano', 'Suarez to Robinsons', 'Suarez to Wet Market', 'Suarez to Health Office'],
      landmarks: ['Suarez Barangay Hall', 'Suarez Elementary School', 'Suarez Chapel'],
      facilities: ['Waiting Shed', 'Sari-Sari Stores', 'Tricycle Stand'],
      tips: 'Main terminal for all routes starting from Barangay Suarez. Get here early during rush hours (6-8AM).'
    },
    {
      id: 2,
      name: 'Villa Verde Junction',
      type: 'Major Stop',
      coordinates: '8°11\'52.8"N, 124°13\'12.0"E',
      position: [8.1980, 124.2200] as [number, number],
      routes: ['All Routes'],
      landmarks: ['Villa Verde Subdivision', 'Santo Rosario Chapel', 'Community Center'],
      facilities: ['Waiting Shed', 'Sari-Sari Stores'],
      tips: 'Transfer point for all routes. Common waiting area for students and workers heading downtown.'
    },
    {
      id: 3,
      name: 'Desmark (Dupoint Bldg.)',
      type: 'Terminal',
      coordinates: '8°13\'24.2"N, 124°14\'28.3"E',
      position: [8.2234, 124.2412] as [number, number],
      routes: ['Suarez to Desmark'],
      landmarks: ['Dupoint Building', 'Roxas Avenue', 'Zamora Street Intersection', 'Desmark Store'],
      facilities: ['Desmark Store', 'Commercial Area', 'Waiting Shed'],
      tips: 'Popular shopping destination. Located at Roxas Ave corner Zamora St. Heavy traffic during peak hours.'
    },
    {
      id: 4,
      name: 'Iligan City Public Plaza',
      type: 'Terminal',
      coordinates: '8°13\'42.7"N, 124°14\'13.7"E',
      position: [8.2285, 124.2371] as [number, number],
      routes: ['Suarez to City Plaza'],
      landmarks: ['City Hall', 'Public Plaza', 'Cathedral', 'Aguinaldo Street', 'Government Offices'],
      facilities: ['Terminal Building', 'Public Plaza', 'Waiting Shed', 'Nearby Shops'],
      tips: 'Main city center with connections to all routes. Watch belongings in crowded areas. Government offices nearby.'
    },
    {
      id: 5,
      name: 'Gaisano Super City Mall',
      type: 'Terminal',
      coordinates: '8°13\'50.9"N, 124°14\'29.0"E',
      position: [8.2308, 124.2414] as [number, number],
      routes: ['Suarez to Gaisano'],
      landmarks: ['Gaisano Super City Mall', 'Roxas Avenue', 'Shopping District'],
      facilities: ['Mall Terminal', 'Shopping Center', 'Food Court', 'Waiting Area'],
      tips: 'Major shopping mall. Very busy on weekends and holidays. Extended hours until 9PM.'
    },
    {
      id: 6,
      name: 'Robinsons Place Iligan',
      type: 'Terminal',
      coordinates: '8°13\'05.5"N, 124°14\'25.2"E',
      position: [8.2182, 124.2403] as [number, number],
      routes: ['Suarez to Robinsons'],
      landmarks: ['Robinsons Place Iligan', 'Macapagal Avenue', 'Shopping Complex'],
      facilities: ['Mall Terminal', 'Shopping Center', 'Food Court', 'Waiting Shed'],
      tips: 'Popular mall destination. Frequent trips until 9:30PM. Accessible from Macapagal Avenue.'
    },
    {
      id: 7,
      name: 'Iligan City Wet Market',
      type: 'Terminal',
      coordinates: '8°13\'43.6"N, 124°14\'02.5"E',
      position: [8.2288, 124.2338] as [number, number],
      routes: ['Suarez to Wet Market'],
      landmarks: ['Central Wet Market', 'Public Market', 'Poblacion Area', 'Market Stalls'],
      facilities: ['Public Market', 'Market Stalls', 'Waiting Shed', 'Vendor Area'],
      tips: 'Very busy during market hours (4:30AM-7PM). Best to arrive early morning. Watch belongings in crowded areas.'
    },
    {
      id: 8,
      name: 'Iligan City Health Office',
      type: 'Terminal',
      coordinates: '8°13\'39.1"N, 124°14\'29.5"E',
      position: [8.2275, 124.2415] as [number, number],
      routes: ['Suarez to Health Office'],
      landmarks: ['City Health Office', 'Gen. Aguinaldo Street', 'City Hall Area', 'Government Complex'],
      facilities: ['Health Office', 'Government Services', 'Waiting Shed'],
      tips: 'Government health services. Operating hours 6AM-7PM. Heavy traffic during clinic hours (8AM-4PM).'
    },
    {
      id: 9,
      name: 'Roxas Avenue',
      type: 'Major Stop',
      coordinates: '8°12\'36.0"N, 124°13\'48.0"E',
      position: [8.2100, 124.2300] as [number, number],
      routes: ['Suarez to Desmark', 'Suarez to Gaisano', 'Suarez to Robinsons'],
      landmarks: ['Roxas Avenue', 'Commercial District', 'Business Area'],
      facilities: ['Waiting Shed', 'Commercial Stores', 'Restaurants'],
      tips: 'Main commercial avenue. Heavy traffic during rush hours. Multiple route connections available.'
    },
    {
      id: 10,
      name: 'Aguinaldo Street',
      type: 'Major Stop',
      coordinates: '8°13\'12.0"N, 124°13\'58.8"E',
      position: [8.2200, 124.2330] as [number, number],
      routes: ['Suarez to City Plaza', 'Suarez to Health Office'],
      landmarks: ['Gen. Aguinaldo Street', 'Downtown Area', 'Government Buildings'],
      facilities: ['Waiting Shed', 'Nearby Government Offices'],
      tips: 'Downtown area near government offices. Busy during office hours (8AM-5PM).'
    }
  ];

  const filteredStops = stops.filter(stop =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stop.landmarks.some(landmark => landmark.toLowerCase().includes(searchQuery.toLowerCase())) ||
    stop.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="stops" />

      <div className="flex">
        {user && <UserSidebar onNavigate={onNavigate} currentPage="stops" />}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="mb-6">
            <h1 className="mb-2">Jeepney Stops & Landmarks</h1>
            <p className="text-gray-600">Browse all stops and landmarks in Barangay Suarez, Iligan City</p>
          </div>

          {/* Main Layout: Map + Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Big Map Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#2E7D32]" />
                    {selectedStop ? selectedStop.name : 'All Stops Map'}
                  </CardTitle>
                  <CardDescription>
                    {selectedStop 
                      ? `${selectedStop.type} - ${selectedStop.routes.length} route(s)`
                      : 'Select a stop to view details'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveMap
                    center={selectedStop ? selectedStop.position : [8.2100, 124.2300]}
                    zoom={selectedStop ? 15 : 12}
                    height="500px"
                    routes={[
                      {
                        name: 'Suarez to Desmark',
                        color: '#2E7D32',
                        coordinates: [
                          [8.1915, 124.2151],
                          [8.1980, 124.2200],
                          [8.2100, 124.2300],
                          [8.2234, 124.2412]
                        ],
                      },
                      {
                        name: 'Suarez to Gaisano',
                        color: '#F9A825',
                        coordinates: [
                          [8.1915, 124.2151],
                          [8.1980, 124.2200],
                          [8.2100, 124.2300],
                          [8.2308, 124.2414]
                        ],
                      },
                      {
                        name: 'Suarez to City Plaza',
                        color: '#1976D2',
                        coordinates: [
                          [8.1915, 124.2151],
                          [8.1980, 124.2200],
                          [8.2200, 124.2330],
                          [8.2285, 124.2371]
                        ],
                      },
                    ]}
                    markers={selectedStop 
                      ? [{ position: selectedStop.position, label: selectedStop.name, type: selectedStop.type === 'Terminal' ? 'terminal' : 'stop' }]
                      : stops.map(stop => ({
                          position: stop.position,
                          label: stop.name,
                          type: stop.type === 'Terminal' ? 'terminal' : 'stop',
                        }))
                    }
                  />
                </CardContent>
              </Card>
            </div>

            {/* Stop Details Sidebar */}
            <div className="lg:col-span-1">
              {selectedStop ? (
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{selectedStop.name}</CardTitle>
                        <Badge variant={selectedStop.type === 'Terminal' ? 'default' : 'secondary'} className={selectedStop.type === 'Terminal' ? 'bg-[#2E7D32]' : ''}>
                          {selectedStop.type}
                        </Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSelectedStop(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 overflow-y-auto max-h-[calc(500px-80px)]">
                    {/* Quick Info */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Coordinates</p>
                      <p className="text-sm">{selectedStop.coordinates}</p>
                    </div>

                    {/* Available Routes */}
                    <div>
                      <p className="text-sm mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#2E7D32]" />
                        Available Routes ({selectedStop.routes.length})
                      </p>
                      <div className="space-y-2">
                        {selectedStop.routes.map((route: string, index: number) => (
                          <div key={index} className="p-2 bg-gray-50 rounded-lg text-sm">
                            {route}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Nearby Landmarks */}
                    <div>
                      <p className="text-sm mb-2 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#2E7D32]" />
                        Nearby Landmarks
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedStop.landmarks.map((landmark: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">{landmark}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Facilities */}
                    <div>
                      <p className="text-sm mb-2">Available Facilities</p>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedStop.facilities.map((facility: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-[#2E7D32]"></div>
                            <span className="text-sm">{facility}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-800">
                        💡 <strong>Tip:</strong> {selectedStop.tips}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-2">No stop selected</p>
                    <p className="text-sm text-gray-400">Click on any stop below to view details</p>
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
                placeholder="Search by stop name, landmark, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stop Type Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-[#2E7D32] cursor-pointer hover:bg-[#1B5E20]">
              All Stops ({stops.length})
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Terminals ({stops.filter(s => s.type === 'Terminal').length})
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Major Stops ({stops.filter(s => s.type === 'Major Stop').length})
            </Badge>
          </div>

          {/* Stops Grid */}
          <div>
            <h2 className="mb-4">All Stops</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStops.map((stop) => (
                <Card 
                  key={stop.id} 
                  className={`hover:shadow-lg transition-all cursor-pointer ${
                    selectedStop?.id === stop.id ? 'ring-2 ring-[#2E7D32] shadow-lg' : ''
                  }`} 
                  onClick={() => setSelectedStop(stop)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-2">
                        <MapPin className={`w-5 h-5 mt-1 ${stop.type === 'Terminal' ? 'text-[#2E7D32]' : 'text-[#F9A825]'}`} />
                        <div>
                          <CardTitle className="text-base">{stop.name}</CardTitle>
                          <CardDescription>{stop.type}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Routes:</span>
                        <span>{stop.routes.length} route(s)</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Landmarks:</p>
                        <div className="flex flex-wrap gap-1">
                          {stop.landmarks.slice(0, 2).map((landmark, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {landmark}
                            </Badge>
                          ))}
                          {stop.landmarks.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{stop.landmarks.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button 
                      className={`w-full ${
                        selectedStop?.id === stop.id 
                          ? 'bg-[#1B5E20] hover:bg-[#1B5E20]' 
                          : 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                      }`}
                    >
                      {selectedStop?.id === stop.id ? 'Selected' : 'View Details'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {filteredStops.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No stops found matching your search.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}