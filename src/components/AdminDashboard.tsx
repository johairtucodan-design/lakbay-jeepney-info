import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import Navbar from './Navbar';
import { Menu, X, LayoutDashboard, Users, Car, Map, DollarSign, MessageSquare, TrendingUp, AlertCircle, Plus, Edit, Trash2, MapPin, Bell, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AdminDashboardProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onNavigate, onLogout }: AdminDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  const [isAddStopOpen, setIsAddStopOpen] = useState(false);
  const [isUpdateFareOpen, setIsUpdateFareOpen] = useState(false);
  const [isSendNotificationOpen, setIsSendNotificationOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<typeof users[0] | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);

  const stats = {
    totalUsers: 1248,
    activeDrivers: 87,
    totalRoutes: 15,
    reportedIssues: 3
  };

  const users = [
    { id: 1, name: 'Maria Santos', email: 'maria@example.com', role: 'User', joinedDate: 'Oct 15, 2025', status: 'Active' },
    { id: 2, name: 'Juan Cruz', email: 'juan@example.com', role: 'User', joinedDate: 'Oct 20, 2025', status: 'Active' },
    { id: 3, name: 'Ana Reyes', email: 'ana@example.com', role: 'User', joinedDate: 'Oct 25, 2025', status: 'Active' },
  ];

  const drivers = [
    { id: 1, name: 'Pedro Gonzales', plateNumber: 'ABC 1234', route: 'Suarez to Poblacion', rating: 4.7, status: 'Active' },
    { id: 2, name: 'Ramon Torres', plateNumber: 'DEF 5678', route: 'Suarez to Tubod', rating: 4.5, status: 'Active' },
    { id: 3, name: 'Carlos Diaz', plateNumber: 'GHI 9012', route: 'Suarez to MSU-IIT', rating: 4.8, status: 'Active' },
  ];

  const routes = [
    { id: 1, name: 'Suarez to Poblacion', stops: 5, distance: '7 km', fareRange: '₱10-₱18', popularity: 'High' },
    { id: 2, name: 'Suarez to Tubod', stops: 5, distance: '5 km', fareRange: '₱10-₱15', popularity: 'High' },
    { id: 3, name: 'Suarez to MSU-IIT', stops: 4, distance: '6 km', fareRange: '₱10-₱15', popularity: 'High' },
    { id: 4, name: 'Suarez to Mahayahay', stops: 3, distance: '3 km', fareRange: '₱8-₱10', popularity: 'Medium' },
    { id: 5, name: 'Suarez to Tibanga', stops: 4, distance: '8 km', fareRange: '₱12-₱15', popularity: 'Medium' },
  ];

  const feedback = [
    { id: 1, user: 'Anonymous User', rating: 5, comment: 'Great service!', date: 'Nov 3, 2025', status: 'Reviewed' },
    { id: 2, user: 'Maria S.', rating: 4, comment: 'Could improve schedule accuracy', date: 'Nov 2, 2025', status: 'Pending' },
    { id: 3, user: 'Juan C.', rating: 3, comment: 'Route needs more stops', date: 'Nov 1, 2025', status: 'Pending' },
  ];

  const stops = [
    { id: 1, name: 'Suarez Terminal', location: 'Suarez, Iligan City', route: 'Suarez to Poblacion', coordinates: '8.1914, 124.2151', status: 'Active' },
    { id: 2, name: 'Villa Verde Subdivision', location: 'Villa Verde, Suarez', route: 'Suarez to Poblacion', coordinates: '8.1968, 124.2133', status: 'Active' },
    { id: 3, name: 'National Highway Junction', location: 'National Highway', route: 'Suarez to Poblacion', coordinates: '8.1974, 124.2113', status: 'Active' },
    { id: 4, name: 'City Hall Area', location: 'Downtown Core', route: 'Suarez to Poblacion', coordinates: '8.2260, 124.2400', status: 'Active' },
    { id: 5, name: 'Public Plaza Area', location: 'City Center', route: 'Suarez to Poblacion', coordinates: '8.2295, 124.2406', status: 'Active' },
  ];

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Route added successfully!');
    setIsAddRouteOpen(false);
  };

  const handleAddStop = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Stop added successfully!');
    setIsAddStopOpen(false);
  };

  const handleUpdateFare = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Fare rates updated successfully!');
    setIsUpdateFareOpen(false);
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification sent successfully to drivers!');
    setIsSendNotificationOpen(false);
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('User updated successfully!');
    setIsEditUserOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h1>Admin Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Users</p>
                      <p className="text-3xl text-[#2E7D32]">{stats.totalUsers}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#2E7D32]" />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Active Drivers</p>
                      <p className="text-3xl text-[#F9A825]">{stats.activeDrivers}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Car className="w-6 h-6 text-[#F9A825]" />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">↑ 5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Popular Routes</p>
                      <p className="text-3xl text-[#2E7D32]">{stats.totalRoutes}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#2E7D32]" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">3 high-traffic routes</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Reported Issues</p>
                      <p className="text-3xl text-red-600">{stats.reportedIssues}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <p className="text-sm text-red-600 mt-2">Needs attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => setActiveSection('routes')} className="h-auto py-4 flex flex-col gap-2 bg-[#2E7D32] hover:bg-[#1B5E20]">
                    <Plus className="w-5 h-5" />
                    <span className="text-sm">Add Route</span>
                  </Button>
                  <Button onClick={() => setActiveSection('drivers')} className="h-auto py-4 flex flex-col gap-2" variant="outline">
                    <Car className="w-5 h-5" />
                    <span className="text-sm">Manage Drivers</span>
                  </Button>
                  <Button onClick={() => setActiveSection('fares')} className="h-auto py-4 flex flex-col gap-2" variant="outline">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm">Update Fares</span>
                  </Button>
                  <Button onClick={() => setActiveSection('feedback')} className="h-auto py-4 flex flex-col gap-2" variant="outline">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm">View Feedback</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div>
                      <p className="text-sm">New driver registered: Pedro Gonzales</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <p className="text-sm">Fare rates updated for 3 routes</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
                    <div>
                      <p className="text-sm">New feedback received (3 pending reviews)</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1>Manage Users</h1>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Create a new user account in the system</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEditUser} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input placeholder="e.g., Maria Santos" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input placeholder="e.g., maria@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                      <Edit className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Input placeholder="Search users..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.joinedDate}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit User</DialogTitle>
                                  <DialogDescription>Update user details</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleEditUser} className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input placeholder="e.g., Maria Santos" required />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input placeholder="e.g., maria@example.com" required />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Role</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Update User
                                  </Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'drivers':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h1>Manage Drivers</h1>
              <div className="flex gap-2">
                <Dialog open={isSendNotificationOpen} onOpenChange={setIsSendNotificationOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                      <Bell className="w-4 h-4 mr-2" />
                      Send Notification
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Notification to Drivers</DialogTitle>
                      <DialogDescription>Send an important message or announcement to drivers</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSendNotification} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Recipients</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipients" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Drivers</SelectItem>
                            <SelectItem value="suarez-poblacion">Suarez to Poblacion Route</SelectItem>
                            <SelectItem value="suarez-tubod">Suarez to Tubod Route</SelectItem>
                            <SelectItem value="suarez-msu">Suarez to MSU-IIT Route</SelectItem>
                            <SelectItem value="active">Active Drivers Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Notification Title</Label>
                        <Input placeholder="e.g., Important Route Update" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Message</Label>
                        <Textarea 
                          placeholder="Enter your message here..."
                          className="min-h-[120px]"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                        <Send className="w-4 h-4 mr-2" />
                        Send Notification
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Dialog open={isAddDriverOpen} onOpenChange={setIsAddDriverOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#F9A825] hover:bg-[#F57F17]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Driver
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Driver</DialogTitle>
                      <DialogDescription>Create a new driver account in the system</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditUser} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="e.g., Maria Santos" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input placeholder="e.g., maria@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Plate Number</Label>
                        <Input placeholder="e.g., ABC 1234" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Route Assignment</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select route" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="suarez-poblacion">Suarez to Poblacion</SelectItem>
                            <SelectItem value="suarez-tubod">Suarez to Tubod</SelectItem>
                            <SelectItem value="suarez-msu">Suarez to MSU-IIT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                        <Edit className="w-4 h-4 mr-2" />
                        Add Driver
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Input placeholder="Search drivers..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Route" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Routes</SelectItem>
                      <SelectItem value="suarez-tubod">Suarez to Tubod</SelectItem>
                      <SelectItem value="suarez-downtown">Suarez to Downtown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Plate Number</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {drivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell>{driver.name}</TableCell>
                        <TableCell>{driver.plateNumber}</TableCell>
                        <TableCell>{driver.route}</TableCell>
                        <TableCell>⭐ {driver.rating}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {driver.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'routes':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1>Manage Routes</h1>
              <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Route
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Route</DialogTitle>
                    <DialogDescription>Create a new jeepney route in the system</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddRoute} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Route Name</Label>
                      <Input placeholder="e.g., Suarez to City Center" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Number of Stops</Label>
                        <Input type="number" placeholder="5" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Distance</Label>
                        <Input placeholder="10 km" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Fare Range</Label>
                      <Input placeholder="₱12-₱20" required />
                    </div>
                    <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                      Add Route
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route Name</TableHead>
                      <TableHead>Stops</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Fare Range</TableHead>
                      <TableHead>Popularity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell>{route.name}</TableCell>
                        <TableCell>{route.stops}</TableCell>
                        <TableCell>{route.distance}</TableCell>
                        <TableCell className="text-[#2E7D32]">{route.fareRange}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            route.popularity === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {route.popularity}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'stops':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1>Manage Stops</h1>
              <Dialog open={isAddStopOpen} onOpenChange={setIsAddStopOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stop
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Stop</DialogTitle>
                    <DialogDescription>Create a new stop location in the system</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddStop} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Stop Name</Label>
                      <Input placeholder="e.g., Suarez Terminal" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input placeholder="e.g., Suarez, Iligan City" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Route Assignment</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="suarez-poblacion">Suarez to Poblacion</SelectItem>
                          <SelectItem value="suarez-tubod">Suarez to Tubod</SelectItem>
                          <SelectItem value="suarez-msu">Suarez to MSU-IIT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Coordinates (Lat, Long)</Label>
                      <Input placeholder="e.g., 8.1914, 124.2151" required />
                    </div>
                    <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                      Add Stop
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Input placeholder="Search stops..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Route" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Routes</SelectItem>
                      <SelectItem value="suarez-poblacion">Suarez to Poblacion</SelectItem>
                      <SelectItem value="suarez-tubod">Suarez to Tubod</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stop Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Coordinates</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stops.map((stop) => (
                      <TableRow key={stop.id}>
                        <TableCell>{stop.name}</TableCell>
                        <TableCell>{stop.location}</TableCell>
                        <TableCell>{stop.route}</TableCell>
                        <TableCell className="text-sm text-gray-600">{stop.coordinates}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {stop.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'fares':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1>Manage Fares</h1>
              <Dialog open={isUpdateFareOpen} onOpenChange={setIsUpdateFareOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                    Update Fare Rates
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Fare Rates</DialogTitle>
                    <DialogDescription>Update the fare rates for all routes</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleUpdateFare} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Distance Range</Label>
                      <Input placeholder="0-5 km" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Base Fare</Label>
                        <Input placeholder="₱10" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Per Kilometer</Label>
                        <Input placeholder="₱2" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Maximum Fare</Label>
                      <Input placeholder="₱15" required />
                    </div>
                    <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                      Update Fares
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Current Fare Structure</CardTitle>
                <CardDescription>Standardized rates as per LGU regulations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> All fare updates must comply with LGU regulations. Changes will affect all routes immediately.
                    </p>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Distance Range</TableHead>
                        <TableHead>Base Fare</TableHead>
                        <TableHead>Per Kilometer</TableHead>
                        <TableHead>Maximum Fare</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>0-5 km</TableCell>
                        <TableCell>₱10</TableCell>
                        <TableCell>₱2</TableCell>
                        <TableCell>₱15</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>5-10 km</TableCell>
                        <TableCell>₱15</TableCell>
                        <TableCell>₱2</TableCell>
                        <TableCell>₱25</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>10+ km</TableCell>
                        <TableCell>₱20</TableCell>
                        <TableCell>₱3</TableCell>
                        <TableCell>₱40</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'feedback':
        return (
          <div className="space-y-6">
            <h1>User Feedback & Reports</h1>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Input placeholder="Search feedback..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.map((fb) => (
                    <div key={fb.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p>{fb.user}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < fb.rating ? '⭐' : '☆'}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            fb.status === 'Reviewed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {fb.status}
                          </span>
                          <span className="text-sm text-gray-500">{fb.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{fb.comment}</p>
                      {fb.status === 'Pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Mark as Reviewed</Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="admin-dashboard" />

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeSection === 'dashboard' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveSection('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeSection === 'users' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Manage Users</span>
            </button>
            <button
              onClick={() => setActiveSection('drivers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeSection === 'drivers' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Car className="w-5 h-5" />
              <span>Manage Drivers</span>
            </button>
            <button
              onClick={() => setActiveSection('routes')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeSection === 'routes' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Map className="w-5 h-5" />
              <span>Manage Routes</span>
            </button>
            <button
              onClick={() => setActiveSection('stops')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeSection === 'stops' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Manage Stops</span>
            </button>
            <button
              onClick={() => setActiveSection('fares')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeSection === 'fares' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span>Fares</span>
            </button>
            <button
              onClick={() => setActiveSection('feedback')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeSection === 'feedback' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Feedback</span>
            </button>
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <aside className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)}>
            <div className="w-64 bg-white h-full" onClick={(e) => e.stopPropagation()}>
              <nav className="p-4 space-y-2">
                <button
                  onClick={() => { setActiveSection('dashboard'); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeSection === 'dashboard' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => { setActiveSection('users'); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeSection === 'users' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Manage Users</span>
                </button>
                <button
                  onClick={() => { setActiveSection('drivers'); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeSection === 'drivers' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Car className="w-5 h-5" />
                  <span>Manage Drivers</span>
                </button>
                <button
                  onClick={() => { setActiveSection('routes'); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeSection === 'routes' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Map className="w-5 h-5" />
                  <span>Manage Routes</span>
                </button>
                <button
                  onClick={() => { setActiveSection('stops'); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeSection === 'stops' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span>Manage Stops</span>
                </button>
                <button
                  onClick={() => { setActiveSection('fares'); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeSection === 'fares' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <DollarSign className="w-5 h-5" />
                  <span>Fares</span>
                </button>
                <button
                  onClick={() => { setActiveSection('feedback'); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeSection === 'feedback' ? 'bg-[#2E7D32] text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Feedback</span>
                </button>
              </nav>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}