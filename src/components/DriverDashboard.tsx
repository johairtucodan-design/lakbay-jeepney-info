import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import Navbar from './Navbar';
import InteractiveMap from './InteractiveMap';
import { MapPin, DollarSign, MessageSquare, Settings, Bell, QrCode } from 'lucide-react';

interface DriverDashboardProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function DriverDashboard({ user, onNavigate, onLogout }: DriverDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const driverInfo = {
    routeAssignment: 'Suarez to City Plaza Route',
    plateNumber: 'ABC 1234',
    schedule: 'Monday - Saturday, 5:00 AM - 9:00 PM',
    todayTrips: 12,
    rating: 4.7
  };

  // Route coordinates for Suarez to City Plaza - Main path through Barangay Suarez
  const routeCoordinates: Array<[number, number]> = [
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
    [8.229959802764037, 124.2369215896386],
    [8.228546989083359, 124.24050947575181],
    [8.229440315281181, 124.24064767808366],
    [8.23099970148639, 124.23708469793914],
    [8.231209933385774, 124.23473290390947],
    [8.229479271021042, 124.23451289734456],
    [8.229595649853882, 124.23378839301886],
    [8.228585780774038, 124.2337314947762],
    [8.228153566468235, 124.2384269220013],
    [8.226835053704024, 124.2382563602236],
    [8.226513052039435, 124.24009362850958]
  ];

  const routeStops = [
    { name: 'Suarez Terminal', time: '5:00 AM', status: 'Start', coordinates: [8.191383124090216, 124.21514229708531] },
    { name: 'Suarez Barangay Hall', time: '5:03 AM', status: 'Stop', coordinates: [8.193736983523905, 124.21511707887781] },
    { name: 'Villa Verde Subdivision', time: '5:06 AM', status: 'Stop', coordinates: [8.196823561872954, 124.21326586726063] },
    { name: 'National Highway Junction', time: '5:10 AM', status: 'Stop', coordinates: [8.197395733867145, 124.2113031128139] },
    { name: 'Main Highway', time: '5:14 AM', status: 'Stop', coordinates: [8.20224885779189, 124.210564938125] },
    { name: 'Roxas Avenue', time: '5:18 AM', status: 'Stop', coordinates: [8.21194677685325, 124.22640328045594] },
    { name: 'Macapagal Avenue', time: '5:22 AM', status: 'Stop', coordinates: [8.215965054868358, 124.23880774037669] },
    { name: 'Downtown Core / Technomart', time: '5:26 AM', status: 'Stop', coordinates: [8.219008356819732, 124.24189537185012] },
    { name: 'City Hall Area / CPK', time: '5:32 AM', status: 'Stop', coordinates: [8.226014936484185, 124.24003055810114] },
    { name: 'Aguinaldo Street / Sabayle Street', time: '5:34 AM', status: 'Stop', coordinates: [8.227653643199773, 124.24038210871517] },
    { name: 'Public Plaza Area', time: '5:38 AM', status: 'Stop', coordinates: [8.229505915841813, 124.24063492669981] },
    { name: 'Quezon Avenue', time: '5:42 AM', status: 'Stop', coordinates: [8.23099970148639, 124.23708469793914] },
    { name: 'Central Business District', time: '5:46 AM', status: 'Stop', coordinates: [8.231209933385774, 124.23473290390947] },
    { name: 'Market Area', time: '5:50 AM', status: 'Stop', coordinates: [8.229595649853882, 124.23378839301886] },
    { name: 'Final Stop', time: '5:54 AM', status: 'End', coordinates: [8.226513052039435, 124.24009362850958] },
  ];

  const fareTable = [
    { from: 'Suarez', to: 'Villa Verde', distance: '2 km', fare: '₱10' },
    { from: 'Suarez', to: 'Pala-o', distance: '4 km', fare: '₱12' },
    { from: 'Suarez', to: 'Quezon Ave', distance: '6 km', fare: '₱15' },
    { from: 'Suarez', to: 'Poblacion', distance: '7 km', fare: '₱18' },
  ];

  const recentFeedback = [
    { id: 1, rating: 5, comment: 'Very good driver, safe and courteous!', date: 'Nov 3, 2025' },
    { id: 2, rating: 4, comment: 'On time and clean jeepney.', date: 'Nov 2, 2025' },
    { id: 3, rating: 5, comment: 'Respectful and helpful driver.', date: 'Nov 1, 2025' },
    { id: 4, rating: 4, comment: 'Good service overall.', date: 'Oct 31, 2025' },
  ];

  const notifications = [
    { id: 1, message: 'New fare rate effective November 5, 2025', time: '2 hours ago', type: 'info' },
    { id: 2, message: 'Route update: Temporary detour at Main St', time: '1 day ago', type: 'warning' },
    { id: 3, message: 'Monthly performance report available', time: '2 days ago', type: 'info' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="driver-dashboard" />

      <div className="flex">

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          {/* Profile Area */}
          <Card className="mb-6 bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-white border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-white text-[#F9A825] text-2xl">
                    {user?.name?.charAt(0) || 'D'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="mb-2">{user?.name}</h1>
                  <div className="space-y-1">
                    <p className="text-yellow-50">
                      <strong>Route:</strong> {driverInfo.routeAssignment}
                    </p>
                    <p className="text-yellow-50">
                      <strong>Plate:</strong> {driverInfo.plateNumber}
                    </p>
                    <p className="text-yellow-50">
                      <strong>Schedule:</strong> {driverInfo.schedule}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-yellow-50 text-sm">Today's Trips</p>
                    <p className="text-2xl">{driverInfo.todayTrips}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <p className="text-yellow-50 text-sm">Rating</p>
                    <p className="text-2xl">⭐ {driverInfo.rating}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#F9A825]" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${notif.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                    <div className="flex-1">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="route" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="route">
                <MapPin className="w-4 h-4 mr-2" />
                Route Info
              </TabsTrigger>
              <TabsTrigger value="fare">
                <span className="w-4 h-4 mr-2 flex items-center justify-center">₱</span>
                Fare Table
              </TabsTrigger>
              <TabsTrigger value="feedback">
                <MessageSquare className="w-4 h-4 mr-2" />
                Feedback
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Route Info Tab */}
            <TabsContent value="route">
              <Card>
                <CardHeader>
                  <CardTitle>Route Information</CardTitle>
                  <CardDescription>{driverInfo.routeAssignment}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden">
                    <InteractiveMap 
                      height="100%"
                      routes={[{
                        name: driverInfo.routeAssignment,
                        color: '#2E7D32',
                        coordinates: routeCoordinates
                      }]}
                      markers={routeStops.map((stop) => ({
                        position: stop.coordinates as [number, number],
                        label: stop.name,
                        type: stop.status === 'Start' || stop.status === 'End' ? 'terminal' : 'stop'
                      }))}
                    />
                  </div>
                  <div className="space-y-3">
                    <h3>Route Stops</h3>
                    {routeStops.map((stop, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${stop.status === 'Start' ? 'bg-green-500' : stop.status === 'End' ? 'bg-red-500' : 'bg-[#F9A825]'}`}></div>
                          <div>
                            <p>{stop.name}</p>
                            <p className="text-sm text-gray-600">{stop.time}</p>
                          </div>
                        </div>
                        <Badge variant={stop.status === 'Start' || stop.status === 'End' ? 'default' : 'secondary'}>
                          {stop.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fare Table Tab */}
            <TabsContent value="fare">
              <Card>
                <CardHeader>
                  <CardTitle>Standardized Fare Rates</CardTitle>
                  <CardDescription>As per LGU regulations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Distance</TableHead>
                        <TableHead>Fare</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fareTable.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.from}</TableCell>
                          <TableCell>{row.to}</TableCell>
                          <TableCell>{row.distance}</TableCell>
                          <TableCell className="text-[#2E7D32]">{row.fare}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> Rates are standardized as per LGU regulations. Any deviation may result in penalties.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Passenger Feedback</CardTitle>
                  <CardDescription>Recent ratings and comments from passengers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentFeedback.map((fb) => (
                      <div key={fb.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < fb.rating ? '⭐' : '☆'}</span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{fb.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{fb.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Account Settings Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your driver account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm">Personal Information</h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Full Name</p>
                          <p>{user?.name}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Email</p>
                          <p>{user?.email}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Plate Number</p>
                          <p>{driverInfo.plateNumber}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Route Assignment</p>
                          <p>{driverInfo.routeAssignment}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm">Actions</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline">Update Profile</Button>
                        <Button variant="outline">Change Password</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* QR Code Card */}
                <Card className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white border-0">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <QrCode className="w-6 h-6" />
                      Your Driver QR Code
                    </CardTitle>
                    <CardDescription className="text-green-100">
                      Display this QR code in your vehicle for passengers to scan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-6 rounded-lg">
                      <div className="flex items-center justify-center mb-4">
                        <div className="bg-gray-100 p-8 rounded-lg border-4 border-[#2E7D32]">
                          <QrCode className="w-32 h-32 text-[#2E7D32]" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Your Unique QR Code</p>
                        <p className="text-2xl text-[#2E7D32] font-mono mb-4">DRIVER-1</p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-800">
                            <strong>Tip:</strong> Passengers can scan this code to view your profile, rating, and contact information.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="secondary" className="w-full">
                        Download QR Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}