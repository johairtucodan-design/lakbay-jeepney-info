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
import { MapPin, Search, Building2 } from 'lucide-react';

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
      coordinates: '8.2280° N, 124.2452° E',
      position: [8.2280, 124.2452] as [number, number],
      routes: ['Suarez to Tubod', 'Suarez to Poblacion', 'Suarez to MSU-IIT', 'Suarez to Mahayahay', 'Suarez to Santiago', 'Suarez to Tibanga'],
      landmarks: ['Suarez Barangay Hall', 'Suarez Elementary School', 'Suarez Chapel'],
      facilities: ['Waiting Shed', 'Sari-Sari Stores', 'Tricycle Stand'],
      tips: 'Main terminal for all routes starting from Barangay Suarez. Get here early during rush hours (6-8AM).'
    },
    {
      id: 2,
      name: 'Suarez Market Area',
      type: 'Major Stop',
      coordinates: '8.2282° N, 124.2455° E',
      position: [8.2282, 124.2455] as [number, number],
      routes: ['Suarez to Tubod', 'Suarez to Mahayahay'],
      landmarks: ['Suarez Public Market', 'Suarez Elementary School', 'Local Stores'],
      facilities: ['Market Stalls', 'Waiting Shed', 'Nearby Stores'],
      tips: 'Very busy during market days (Wednesday & Sunday). Best to arrive early.'
    },
    {
      id: 3,
      name: 'Villa Verde Junction',
      type: 'Major Stop',
      coordinates: '8.2285° N, 124.2460° E',
      position: [8.2285, 124.2460] as [number, number],
      routes: ['Suarez to Poblacion', 'Suarez to MSU-IIT', 'Suarez to Santiago'],
      landmarks: ['Villa Verde Subdivision', 'Santo Rosario Chapel', 'Community Center'],
      facilities: ['Waiting Shed', 'Sari-Sari Stores'],
      tips: 'Transfer point for multiple routes. Common waiting area for students and workers.'
    },
    {
      id: 4,
      name: 'Mahayahay Center',
      type: 'Terminal',
      coordinates: '8.2275° N, 124.2448° E',
      position: [8.2275, 124.2448] as [number, number],
      routes: ['Suarez to Mahayahay', 'Suarez to Tubod'],
      landmarks: ['Mahayahay Elementary School', 'Mahayahay Chapel', 'Community Center'],
      facilities: ['Waiting Shed', 'Community Center', 'Stores'],
      tips: 'Local residential area. Less frequent trips in the afternoon.'
    },
    {
      id: 5,
      name: 'Tubod Proper',
      type: 'Terminal',
      coordinates: '8.2300° N, 124.2470° E',
      position: [8.2300, 124.2470] as [number, number],
      routes: ['Suarez to Tubod'],
      landmarks: ['Saint Michael Church', 'Tubod Elementary School', 'Tubod Barangay Hall'],
      facilities: ['Terminal Area', 'Waiting Shed', 'Public Market'],
      tips: 'End point for Tubod route. Return jeeps available throughout the day.'
    },
    {
      id: 6,
      name: 'Poblacion (City Center)',
      type: 'Terminal',
      coordinates: '8.2288° N, 124.2480° E',
      position: [8.2288, 124.2480] as [number, number],
      routes: ['Suarez to Poblacion'],
      landmarks: ['Iligan City Hall', 'Iligan Public Market', 'Plaza Divisoria', 'Cathedral'],
      facilities: ['Terminal Building', 'Public Plaza', 'Market', 'Shops'],
      tips: 'Main city center with connections to all routes. Watch belongings in crowded areas.'
    },
    {
      id: 7,
      name: 'MSU-IIT Gate',
      type: 'Terminal',
      coordinates: '8.2290° N, 124.2465° E',
      position: [8.2290, 124.2465] as [number, number],
      routes: ['Suarez to MSU-IIT', 'Suarez to Tibanga'],
      landmarks: ['MSU-IIT Campus', 'Tibanga Highway', 'Student Dormitories'],
      facilities: ['University Terminal', 'Waiting Area', 'Student Services'],
      tips: 'Very busy during school days (7AM-8AM, 5PM-6PM). Heavy student traffic.'
    },
    {
      id: 8,
      name: 'Pala-o Church',
      type: 'Regular Stop',
      coordinates: '8.2286° N, 124.2472° E',
      position: [8.2286, 124.2472] as [number, number],
      routes: ['Suarez to Poblacion'],
      landmarks: ['Pala-o Parish Church', 'Pala-o Elementary School', 'Community Plaza'],
      facilities: ['Waiting Shed', 'Church Plaza'],
      tips: 'Popular stop for churchgoers. Very busy on Sundays.'
    },
    {
      id: 9,
      name: 'Santiago Proper',
      type: 'Terminal',
      coordinates: '8.2283° N, 124.2458° E',
      position: [8.2283, 124.2458] as [number, number],
      routes: ['Suarez to Santiago'],
      landmarks: ['Santiago Church', 'Santiago Elementary School', 'Santiago Barangay Hall'],
      facilities: ['Barangay Hall Area', 'Waiting Shed'],
      tips: 'Coastal barangay. Limited trips in the evening. Plan return trips early.'
    },
    {
      id: 10,
      name: 'Tibanga Terminal',
      type: 'Terminal',
      coordinates: '8.2295° N, 124.2468° E',
      position: [8.2295, 124.2468] as [number, number],
      routes: ['Suarez to Tibanga'],
      landmarks: ['Tibanga Elementary School', 'Tibanga Airport Road', 'MSU-IIT Back Gate'],
      facilities: ['Terminal Area', 'Waiting Shed', 'Stores'],
      tips: 'Gateway to airport area. Connect to other routes going to different parts of the city.'
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
        <div className="mb-8">
          <h1 className="mb-2">Jeepney Stops & Landmarks</h1>
          <p className="text-gray-600">Locate stops and view nearby landmarks in Barangay Suarez</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
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

        {/* Interactive Map Preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Route Map Overview</CardTitle>
            <CardDescription>Interactive map showing all jeepney stops and landmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <InteractiveMap
              center={[8.2285, 124.2460]}
              zoom={14}
              height="500px"
              routes={[
                {
                  name: 'Suarez to Poblacion',
                  color: '#2E7D32',
                  coordinates: [
                    [8.2280, 124.2452],
                    [8.2285, 124.2460],
                    [8.2286, 124.2472],
                    [8.2288, 124.2480]
                  ],
                },
                {
                  name: 'Suarez to MSU-IIT',
                  color: '#F9A825',
                  coordinates: [
                    [8.2280, 124.2452],
                    [8.2285, 124.2460],
                    [8.2290, 124.2465]
                  ],
                },
                {
                  name: 'Suarez to Tubod',
                  color: '#1976D2',
                  coordinates: [
                    [8.2280, 124.2452],
                    [8.2282, 124.2455],
                    [8.2275, 124.2448],
                    [8.2270, 124.2445]
                  ],
                },
              ]}
              markers={stops.map(stop => ({
                position: stop.position,
                label: stop.name,
                type: stop.type === 'Terminal' ? 'terminal' : 'stop',
              }))}
            />
          </CardContent>
        </Card>

        {/* Stop Type Filter */}
        <div className="flex gap-2 mb-6">
          <Badge className="bg-[#2E7D32] cursor-pointer hover:bg-[#1B5E20]">
            All Stops ({stops.length})
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Terminals ({stops.filter(s => s.type === 'Terminal').length})
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Major Stops ({stops.filter(s => s.type === 'Major Stop').length})
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Regular Stops ({stops.filter(s => s.type === 'Regular Stop').length})
          </Badge>
        </div>

        {/* Stops List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStops.map((stop) => (
            <Card key={stop.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedStop(stop)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-6 h-6 mt-1 ${stop.type === 'Terminal' ? 'text-[#2E7D32]' : 'text-[#F9A825]'}`} />
                    <div>
                      <CardTitle className="text-base">{stop.name}</CardTitle>
                      <CardDescription>{stop.type}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Routes</p>
                    <p className="text-sm">{stop.routes.length} route(s)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Nearby Landmarks</p>
                    <div className="flex flex-wrap gap-1">
                      {stop.landmarks.slice(0, 2).map((landmark, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {landmark}
                        </Badge>
                      ))}
                      {stop.landmarks.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{stop.landmarks.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-[#2E7D32] hover:bg-[#1B5E20]" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stops found matching your search.</p>
          </div>
        )}
      </main>
      </div>

      {/* Stop Detail Modal */}
      <Dialog open={!!selectedStop} onOpenChange={() => setSelectedStop(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className={`w-6 h-6 ${selectedStop?.type === 'Terminal' ? 'text-[#2E7D32]' : 'text-[#F9A825]'}`} />
              {selectedStop?.name}
            </DialogTitle>
            <DialogDescription>{selectedStop?.type}</DialogDescription>
          </DialogHeader>
          
          {selectedStop && (
            <div className="space-y-6">
              {/* Location Map Preview */}
              <InteractiveMap
                center={selectedStop.position}
                zoom={16}
                height="300px"
                markers={[
                  {
                    position: selectedStop.position,
                    label: selectedStop.name,
                    type: selectedStop.type === 'Terminal' ? 'terminal' : 'stop',
                  },
                ]}
              />

              {/* Routes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Available Routes</CardTitle>
                  <CardDescription>{selectedStop.routes.length} route(s) pass through this stop</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedStop.routes.map((route: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">{route}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStop(null);
                            onNavigate('routes');
                          }}
                        >
                          View Route
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Nearby Landmarks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 className="w-5 h-5 text-[#2E7D32]" />
                    Nearby Landmarks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedStop.landmarks.map((landmark: string, index: number) => (
                      <Badge key={index} variant="outline">{landmark}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Facilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Available Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedStop.facilities.map((facility: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-[#2E7D32]"></div>
                        <span className="text-sm">{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm">
                  <strong className="text-blue-900">💡 Tip: </strong>
                  <span className="text-blue-800">{selectedStop.tips}</span>
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
