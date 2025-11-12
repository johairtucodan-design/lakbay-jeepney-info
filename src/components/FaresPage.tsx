import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import { DollarSign, Info } from 'lucide-react';

interface FaresPageProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function FaresPage({ user, onNavigate, onLogout }: FaresPageProps) {
  const [filterDistance, setFilterDistance] = useState('all');

  const faresByRoute = [
    { origin: 'Suarez Terminal', destination: 'Mahayahay', distance: '3 km', fare: '₱10', category: 'short' },
    { origin: 'Suarez Terminal', destination: 'Villa Verde', distance: '2 km', fare: '₱10', category: 'short' },
    { origin: 'Suarez Terminal', destination: 'Santiago', distance: '4 km', fare: '₱12', category: 'short' },
    { origin: 'Suarez Terminal', destination: 'Tubod', distance: '5 km', fare: '₱15', category: 'short' },
    { origin: 'Suarez Terminal', destination: 'MSU-IIT', distance: '6 km', fare: '₱15', category: 'medium' },
    { origin: 'Suarez Terminal', destination: 'Poblacion', distance: '7 km', fare: '₱18', category: 'medium' },
    { origin: 'Suarez Terminal', destination: 'Tibanga', distance: '8 km', fare: '₱15', category: 'medium' },
    { origin: 'Mahayahay', destination: 'Tubod', distance: '3 km', fare: '₱10', category: 'short' },
    { origin: 'Villa Verde', destination: 'Poblacion', distance: '5 km', fare: '₱12', category: 'short' },
    { origin: 'Villa Verde', destination: 'MSU-IIT', distance: '4 km', fare: '₱12', category: 'short' },
    { origin: 'Tubod', destination: 'Poblacion', distance: '3 km', fare: '₱10', category: 'short' },
    { origin: 'MSU-IIT', destination: 'Tibanga', distance: '2 km', fare: '₱10', category: 'short' },
  ];

  const fareStructure = [
    { distanceRange: '0-5 km', baseFare: '₱10', perKm: '₱2', maxFare: '₱15', description: 'Short distance routes within the city center' },
    { distanceRange: '5-10 km', baseFare: '₱15', perKm: '₱2', maxFare: '₱25', description: 'Medium distance routes to suburban areas' },
    { distanceRange: '10+ km', baseFare: '₱20', perKm: '₱3', maxFare: '₱40', description: 'Long distance routes to outer barangays' },
  ];

  const discounts = [
    { category: 'Students', discount: '20%', requirement: 'Valid student ID required', color: 'bg-blue-100 text-blue-800' },
    { category: 'Senior Citizens', discount: '20%', requirement: 'Valid senior citizen ID required', color: 'bg-purple-100 text-purple-800' },
    { category: 'PWD', discount: '20%', requirement: 'Valid PWD ID required', color: 'bg-green-100 text-green-800' },
    { category: 'Children', discount: 'Free', requirement: 'Below 3 feet in height', color: 'bg-yellow-100 text-yellow-800' },
  ];

  const filteredFares = faresByRoute.filter(fare => {
    if (filterDistance === 'all') return true;
    return fare.category === filterDistance;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="fares" />

      <div className="flex">
        {user && <UserSidebar onNavigate={onNavigate} currentPage="fares" />}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        <div className="mb-8">
          <h1 className="mb-2">Fare Rates</h1>
          <p className="text-gray-600">Standardized jeepney fare information for Barangay Suarez routes</p>
        </div>

        {/* Info Banner */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-800 mt-0.5" />
            <div>
              <p className="text-amber-800 mb-1">
                <strong>Important Notice</strong>
              </p>
              <p className="text-sm text-amber-700">
                Rates are standardized as per LGU regulations and approved by the Land Transportation Franchising and Regulatory Board (LTFRB). All drivers must comply with these rates.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="routes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="routes">By Route</TabsTrigger>
            <TabsTrigger value="structure">Fare Structure</TabsTrigger>
            <TabsTrigger value="discounts">Discounts</TabsTrigger>
          </TabsList>

          {/* By Route Tab */}
          <TabsContent value="routes">
            <Card>
              <CardHeader>
                <CardTitle>Fare Rates by Route</CardTitle>
                <CardDescription>Origin to destination fare matrix</CardDescription>
                <div className="pt-4">
                  <Select value={filterDistance} onValueChange={setFilterDistance}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Filter by distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Routes</SelectItem>
                      <SelectItem value="short">Short Distance (0-5 km)</SelectItem>
                      <SelectItem value="medium">Medium Distance (5-10 km)</SelectItem>
                      <SelectItem value="long">Long Distance (10+ km)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Fare Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFares.map((fare, index) => (
                      <TableRow key={index}>
                        <TableCell>{fare.origin}</TableCell>
                        <TableCell>{fare.destination}</TableCell>
                        <TableCell>{fare.distance}</TableCell>
                        <TableCell className="text-[#2E7D32]">{fare.fare}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fare Structure Tab */}
          <TabsContent value="structure">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fare Calculation Structure</CardTitle>
                  <CardDescription>How jeepney fares are calculated</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fareStructure.map((structure, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="mb-1">{structure.distanceRange}</h3>
                            <p className="text-sm text-gray-600">{structure.description}</p>
                          </div>
                          <DollarSign className="w-8 h-8 text-[#F9A825]" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Base Fare</p>
                            <p className="text-[#2E7D32]">{structure.baseFare}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Per Kilometer</p>
                            <p className="text-[#2E7D32]">{structure.perKm}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Maximum Fare</p>
                            <p className="text-[#2E7D32]">{structure.maxFare}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fare Calculation Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="mb-3">
                      <strong>Example: Barangay Suarez to Tubod Terminal (10 km)</strong>
                    </p>
                    <div className="space-y-2 text-sm">
                      <p>• Base fare (0-5 km): ₱10</p>
                      <p>• Additional 5 km at ₱2/km: ₱10</p>
                      <p className="pt-2 border-t border-green-300">
                        <strong>Total Fare: ₱20</strong>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Discounts Tab */}
          <TabsContent value="discounts">
            <Card>
              <CardHeader>
                <CardTitle>Special Discounts & Exemptions</CardTitle>
                <CardDescription>Available discounts for qualified passengers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {discounts.map((discount, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3>{discount.category}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${discount.color}`}>
                          {discount.discount}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{discount.requirement}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> All discounts are mandated by Republic Act No. 9994 (Expanded Senior Citizens Act), RA 10754 (Student Discount Act), and RA 10754 (PWD Magna Carta). Valid IDs must be presented to avail of discounts.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Reference Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Fare Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Minimum Fare</p>
                <p className="text-2xl text-[#2E7D32]">₱10</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Average Fare</p>
                <p className="text-2xl text-[#2E7D32]">₱15</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Maximum Fare</p>
                <p className="text-2xl text-[#2E7D32]">₱40</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Per Kilometer</p>
                <p className="text-2xl text-[#2E7D32]">₱2-₱3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Payment Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💵</span>
                </div>
                <div>
                  <h4 className="text-sm mb-1">Prepare Exact Fare</h4>
                  <p className="text-sm text-gray-600">Have the correct amount ready to avoid delays</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎫</span>
                </div>
                <div>
                  <h4 className="text-sm mb-1">Present Valid ID</h4>
                  <p className="text-sm text-gray-600">For discount eligibility verification</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📢</span>
                </div>
                <div>
                  <h4 className="text-sm mb-1">Inform Your Destination</h4>
                  <p className="text-sm text-gray-600">Tell the driver where you're going</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      </div>
    </div>
  );
}
