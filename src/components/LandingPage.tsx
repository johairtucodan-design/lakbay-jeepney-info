import { Search, Map, DollarSign, MapPin, MessageSquare, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Navbar from './Navbar';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar user={null} onNavigate={onNavigate} currentPage="landing" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Find your jeepney route with ease in Barangay Suarez!</h1>
            <p className="mb-8 text-green-50">
              Your complete guide to public transportation in Barangay Suarez. Access routes, fares, stops, and safety information all in one place.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter your destination..."
                  className="bg-white text-gray-900"
                />
                <Button className="bg-[#F9A825] hover:bg-[#F57F17] text-white">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Buttons */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('routes')}>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#2E7D32] flex items-center justify-center mb-4">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2">View Routes</h3>
                <p className="text-gray-600 text-sm">Explore all available jeepney routes</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('fares')}>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F9A825] flex items-center justify-center mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2">Check Fare Rates</h3>
                <p className="text-gray-600 text-sm">Calculate your fare easily</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('stops')}>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#2E7D32] flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2">Find Jeepney Stops</h3>
                <p className="text-gray-600 text-sm">Locate stops and landmarks</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('drivers')}>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F9A825] flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2">Our Drivers</h3>
                <p className="text-gray-600 text-sm">Meet our professional drivers</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('feedback')}>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#2E7D32] flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2">Feedback</h3>
                <p className="text-gray-600 text-sm">Share your experience with us</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Routes */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-8 text-[#2E7D32]">Popular Routes from Suarez</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1609051973439-eace9bcf5d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWVwbmV5JTIwcGhpbGlwcGluZXMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjIyNTE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Jeepney Route"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mb-2">Suarez to Poblacion</h3>
                <p className="text-gray-600 text-sm mb-4">Via Villa Verde, Pala-o Church</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2E7D32]">₱10 - ₱18</span>
                  <Button onClick={() => onNavigate('routes')} variant="outline" size="sm" className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1742415105826-0d588fa879b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwcm91dGV8ZW58MXx8fHwxNzYyMjAxNTQxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Route Map"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mb-2">Suarez to Tubod</h3>
                <p className="text-gray-600 text-sm mb-4">Via Mahayahay, San Miguel</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2E7D32]">₱10 - ₱15</span>
                  <Button onClick={() => onNavigate('routes')} variant="outline" size="sm" className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1761064864530-bfd5794f8cf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjB0cmFuc3BvcnQlMjBjb21tdXRlcnxlbnwxfHx8fDE3NjIyNTE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Public Transport"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mb-2">Suarez to MSU-IIT</h3>
                <p className="text-gray-600 text-sm mb-4">Via Villa Verde, Tibanga Highway</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2E7D32]">₱10 - ₱15</span>
                  <Button onClick={() => onNavigate('routes')} variant="outline" size="sm" className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E7D32] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <span>🚎</span>
                </div>
                <span>Lakbay</span>
              </div>
              <p className="text-green-100 text-sm">
                Your trusted jeepney route information system for Barangay Suarez.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-green-100">
                <li><button onClick={() => onNavigate('routes')} className="hover:text-white transition-colors">Routes</button></li>
                <li><button onClick={() => onNavigate('fares')} className="hover:text-white transition-colors">Fares</button></li>
                <li><button onClick={() => onNavigate('stops')} className="hover:text-white transition-colors">Stops</button></li>
                <li><button onClick={() => onNavigate('feedback')} className="hover:text-white transition-colors">Feedback</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact Us</h4>
              <p className="text-green-100 text-sm mb-2">Email: info@lakbay.ph</p>
              <p className="text-green-100 text-sm mb-4">Phone: (063) 123-4567</p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  📘
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  🐦
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  📷
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-green-100 text-sm">
            <p>&copy; 2025 Lakbay. All rights reserved. Barangay Suarez</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
