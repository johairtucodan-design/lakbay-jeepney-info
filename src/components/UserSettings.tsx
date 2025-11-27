import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import { User as UserIcon, Mail, Phone, MapPin, Edit, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserSettingsProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function UserSettings({ user, onNavigate, onLogout }: UserSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+63 912 345 6789',
    address: 'Suarez, Iligan City',
    emergencyContact: '+63 912 345 6780',
    preferredRoute: 'Suarez to Poblacion',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!', {
      description: 'Your changes have been saved.'
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+63 912 345 6789',
      address: 'Suarez, Iligan City',
      emergencyContact: '+63 912 345 6780',
      preferredRoute: 'Suarez to Poblacion',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="user-settings" />

      <div className="flex">
        {user && <UserSidebar onNavigate={onNavigate} currentPage="user-settings" />}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          {/* Header */}
          <div className="mb-6">
            <h1>Profile Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Overview Card */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-[#2E7D32] flex items-center justify-center mb-4">
                    <UserIcon className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-sm mb-1">{user?.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">{user?.email}</p>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Regular User
                  </span>
                </div>
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-[#2E7D32]" />
                    <span>Email Verified</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-[#2E7D32]" />
                    <span>Phone Verified</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#2E7D32]" />
                    <span>Location: Suarez</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Edit Profile Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-[#2E7D32] hover:bg-[#1B5E20]"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  {/* Personal Details Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={!isEditing}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={!isEditing}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={!isEditing}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          disabled={!isEditing}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Phone Number</Label>
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                          disabled={!isEditing}
                          placeholder="+63 912 345 6780"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferences Section */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm">Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredRoute">Preferred Route</Label>
                        <Input
                          id="preferredRoute"
                          value={formData.preferredRoute}
                          onChange={(e) => setFormData({ ...formData, preferredRoute: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        className="bg-[#2E7D32] hover:bg-[#1B5E20]"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Security Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="text-sm mb-1">Password</h3>
                    <p className="text-xs text-gray-600">Last changed 30 days ago</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}