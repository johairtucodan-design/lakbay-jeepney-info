import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import { Star, ThumbsUp, MessageSquare, User as UserIcon, TrendingUp, Award } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DriverFeedbackPageProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function DriverFeedbackPage({ user, onNavigate, onLogout }: DriverFeedbackPageProps) {
  const [rating, setRating] = useState(5);
  const [driverName, setDriverName] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [route, setRoute] = useState('');
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Driver feedback submitted!', {
      description: 'Thank you for helping us improve our driver services.'
    });
    // Reset form
    setRating(5);
    setDriverName('');
    setPlateNumber('');
    setRoute('');
    setCategory('');
    setComment('');
  };

  const recentDriverFeedback = [
    {
      id: 1,
      driver: 'Pedro Gonzales',
      plateNumber: 'ABC 1234',
      route: 'Suarez to Desmark',
      rating: 5,
      category: 'Professional Service',
      comment: 'Very courteous and helpful driver! Made sure all passengers were comfortable.',
      date: 'Nov 18, 2025',
      reviewer: 'Maria S.',
      helpful: 15
    },
    {
      id: 2,
      driver: 'Ramon Torres',
      plateNumber: 'DEF 5678',
      route: 'Suarez to City Plaza',
      rating: 5,
      category: 'Safe Driving',
      comment: 'Excellent driver! Very safe and follows all traffic rules.',
      date: 'Nov 17, 2025',
      reviewer: 'Juan C.',
      helpful: 12
    },
    {
      id: 3,
      driver: 'Carlos Diaz',
      plateNumber: 'GHI 9012',
      route: 'Suarez to Gaisano',
      rating: 4,
      category: 'Friendly',
      comment: 'Friendly and knows the route very well. Slight delay but overall good service.',
      date: 'Nov 16, 2025',
      reviewer: 'Ana R.',
      helpful: 8
    },
    {
      id: 4,
      driver: 'Pedro Gonzales',
      plateNumber: 'ABC 1234',
      route: 'Suarez to Robinsons',
      rating: 5,
      category: 'Professional Service',
      comment: 'Always on time and very professional. Highly recommended!',
      date: 'Nov 15, 2025',
      reviewer: 'Anonymous',
      helpful: 10
    },
    {
      id: 5,
      driver: 'Ramon Torres',
      plateNumber: 'DEF 5678',
      route: 'Suarez to Wet Market',
      rating: 5,
      category: 'Helpful',
      comment: 'Helped me with my grocery bags. Very kind and patient driver.',
      date: 'Nov 14, 2025',
      reviewer: 'Rosa M.',
      helpful: 9
    }
  ];

  // Calculate driver stats
  const topDrivers = [
    { name: 'Pedro Gonzales', rating: 4.9, reviews: 127, plate: 'ABC 1234' },
    { name: 'Ramon Torres', rating: 4.8, reviews: 98, plate: 'DEF 5678' },
    { name: 'Carlos Diaz', rating: 4.7, reviews: 85, plate: 'GHI 9012' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="driver-feedback" />

      <div className="flex">
        {user && <UserSidebar onNavigate={onNavigate} currentPage="driver-feedback" />}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="mb-8">
            <h1 className="mb-2">Driver Feedback</h1>
            <p className="text-gray-600">Rate and review jeepney drivers to help improve service quality</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feedback Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Driver Feedback</CardTitle>
                  <CardDescription>Share your experience with a specific driver</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Rating */}
                    <div className="space-y-2">
                      <Label>Driver Rating</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="text-3xl transition-transform hover:scale-110"
                          >
                            {star <= rating ? '⭐' : '☆'}
                          </button>
                        ))}
                        <span className="ml-2 self-center text-gray-600">
                          {rating === 5 ? 'Excellent' : rating === 4 ? 'Good' : rating === 3 ? 'Average' : rating === 2 ? 'Poor' : 'Very Poor'}
                        </span>
                      </div>
                    </div>

                    {/* Driver Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="driverName">Driver Name</Label>
                        <Input
                          id="driverName"
                          type="text"
                          placeholder="e.g., Pedro Gonzales"
                          value={driverName}
                          onChange={(e) => setDriverName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="plateNumber">Plate Number</Label>
                        <Input
                          id="plateNumber"
                          type="text"
                          placeholder="e.g., ABC 1234"
                          value={plateNumber}
                          onChange={(e) => setPlateNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Route */}
                    <div className="space-y-2">
                      <Label htmlFor="route">Route</Label>
                      <Select value={route} onValueChange={setRoute} required>
                        <SelectTrigger id="route">
                          <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="suarez-desmark">Suarez to Desmark</SelectItem>
                          <SelectItem value="suarez-plaza">Suarez to City Plaza</SelectItem>
                          <SelectItem value="suarez-gaisano">Suarez to Gaisano</SelectItem>
                          <SelectItem value="suarez-robinsons">Suarez to Robinsons</SelectItem>
                          <SelectItem value="suarez-market">Suarez to Wet Market</SelectItem>
                          <SelectItem value="suarez-health">Suarez to Health Office</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Feedback Category</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional Service</SelectItem>
                          <SelectItem value="safe-driving">Safe Driving</SelectItem>
                          <SelectItem value="friendly">Friendly & Courteous</SelectItem>
                          <SelectItem value="helpful">Helpful</SelectItem>
                          <SelectItem value="punctual">Punctual</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Anonymous option */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="w-4 h-4 text-[#2E7D32] border-gray-300 rounded focus:ring-[#2E7D32]"
                      />
                      <Label htmlFor="anonymous" className="cursor-pointer">
                        Submit anonymously
                      </Label>
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                      <Label htmlFor="comment">Your Review</Label>
                      <Textarea
                        id="comment"
                        placeholder="Share your experience with this driver..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={6}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Submit Driver Feedback
                    </Button>

                    {/* Privacy Note */}
                    <p className="text-xs text-gray-600 text-center">
                      Your feedback helps drivers improve their service. Reviews are monitored for quality and authenticity.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Rated Drivers */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#F9A825]" />
                    Top Rated Drivers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topDrivers.map((driver, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        {index === 0 ? '🏆' : index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{driver.name}</p>
                        <p className="text-xs text-gray-500">{driver.plate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#2E7D32]">⭐ {driver.rating}</p>
                        <p className="text-xs text-gray-500">{driver.reviews} reviews</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Feedback Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Reviews</span>
                    <span className="text-[#2E7D32]">528</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Rating</span>
                    <span className="text-[#2E7D32]">⭐ 4.7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="text-[#2E7D32]">87 reviews</span>
                  </div>
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-base text-green-900">Review Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>• Be honest and specific</li>
                    <li>• Focus on the service quality</li>
                    <li>• Include route details</li>
                    <li>• Be respectful and fair</li>
                    <li>• Avoid false information</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Driver Reviews */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2>Recent Driver Reviews</h2>
              <p className="text-sm text-gray-600">{recentDriverFeedback.length} recent reviews</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentDriverFeedback.map((feedback) => (
                <Card key={feedback.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Driver Info */}
                    <div className="flex items-start gap-3 mb-4 pb-4 border-b">
                      <div className="w-10 h-10 rounded-full bg-[#2E7D32] flex items-center justify-center text-white">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{feedback.driver}</p>
                        <p className="text-sm text-gray-500">{feedback.plateNumber}</p>
                        <p className="text-xs text-gray-400">{feedback.route}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < feedback.rating ? 'fill-[#F9A825] text-[#F9A825]' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{feedback.date}</p>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="space-y-2 mb-3">
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                        {feedback.category}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-4">{feedback.comment}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <p className="text-xs text-gray-500">by {feedback.reviewer}</p>
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#2E7D32] transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({feedback.helpful})</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
