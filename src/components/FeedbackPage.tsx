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
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface FeedbackPageProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function FeedbackPage({ user, onNavigate, onLogout }: FeedbackPageProps) {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('');
  const [route, setRoute] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your feedback!', {
      description: 'Your feedback has been submitted successfully and will be reviewed by our team.'
    });
    // Reset form
    setRating(5);
    setCategory('');
    setRoute('');
    setSubject('');
    setMessage('');
  };

  const recentFeedback = [
    {
      id: 1,
      user: 'Maria S.',
      rating: 5,
      category: 'Driver Service',
      comment: 'Very courteous driver! Made the trip comfortable and safe.',
      date: 'Nov 3, 2025',
      route: 'Suarez to Tubod',
      helpful: 12
    },
    {
      id: 2,
      user: 'Anonymous',
      rating: 4,
      category: 'Route Information',
      comment: 'The app is helpful but needs more real-time updates on jeepney schedules.',
      date: 'Nov 2, 2025',
      route: 'General',
      helpful: 8
    },
    {
      id: 3,
      user: 'Juan C.',
      rating: 5,
      category: 'Overall Experience',
      comment: 'Great system! Makes commuting so much easier. Keep it up!',
      date: 'Nov 1, 2025',
      route: 'Suarez to Downtown',
      helpful: 15
    },
    {
      id: 4,
      user: 'Ana R.',
      rating: 3,
      category: 'Fare Information',
      comment: 'Could improve the fare calculator accuracy for stops in between major landmarks.',
      date: 'Oct 31, 2025',
      route: 'Suarez to Terminal',
      helpful: 5
    },
    {
      id: 5,
      user: 'Pedro G.',
      rating: 5,
      category: 'Driver Service',
      comment: 'Driver was very helpful with my heavy bags. Excellent service!',
      date: 'Oct 30, 2025',
      route: 'Suarez to Palao',
      helpful: 9
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="feedback" />

      <div className="flex">
        {user && <UserSidebar onNavigate={onNavigate} currentPage="feedback" />}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        <div className="mb-8">
          <h1 className="mb-2">Feedback & Suggestions</h1>
          <p className="text-gray-600">Share your experience and help us improve our services</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Feedback</CardTitle>
                <CardDescription>Your feedback helps us improve the Lakbay system</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating */}
                  <div className="space-y-2">
                    <Label>Overall Rating</Label>
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

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Feedback Category</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="driver-service">Driver Service</SelectItem>
                        <SelectItem value="route-info">Route Information</SelectItem>
                        <SelectItem value="fare-info">Fare Information</SelectItem>
                        <SelectItem value="app-experience">App Experience</SelectItem>
                        <SelectItem value="overall">Overall Experience</SelectItem>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Route */}
                  <div className="space-y-2">
                    <Label htmlFor="route">Related Route (Optional)</Label>
                    <Select value={route} onValueChange={setRoute}>
                      <SelectTrigger id="route">
                        <SelectValue placeholder="Select route" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General / Not specific</SelectItem>
                        <SelectItem value="suarez-tubod">Suarez to Tubod</SelectItem>
                        <SelectItem value="suarez-downtown">Suarez to Downtown</SelectItem>
                        <SelectItem value="suarez-terminal">Suarez to Terminal</SelectItem>
                        <SelectItem value="suarez-palao">Suarez to Palao</SelectItem>
                        <SelectItem value="suarez-tambacan">Suarez to Tambacan</SelectItem>
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

                  {/* Contact Information */}
                  {!isAnonymous && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required={!isAnonymous}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Brief summary of your feedback"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Feedback</Label>
                    <Textarea
                      id="message"
                      placeholder="Please share your detailed feedback, suggestions, or concerns..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </Button>

                  {/* Privacy Note */}
                  <p className="text-xs text-gray-600 text-center">
                    Your feedback will be reviewed by our team. We respect your privacy and will not share your information with third parties.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Feedback Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Feedback</span>
                  <span className="text-[#2E7D32]">328</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <span className="text-[#2E7D32]">⭐ 4.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-[#2E7D32]">47 reviews</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm mb-1">📧 Email</p>
                  <p className="text-sm text-gray-600">feedback@lakbay.ph</p>
                </div>
                <div>
                  <p className="text-sm mb-1">📞 Hotline</p>
                  <p className="text-sm text-gray-600">(063) 123-4567</p>
                </div>
                <div>
                  <p className="text-sm mb-1">📍 Office</p>
                  <p className="text-sm text-gray-600">Barangay Suarez, Iligan City</p>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-base text-green-900">Feedback Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-green-800 space-y-2">
                  <li>• Be specific and constructive</li>
                  <li>• Include relevant details</li>
                  <li>• Be respectful and courteous</li>
                  <li>• Avoid personal attacks</li>
                  <li>• Focus on the service</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Feedback Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2>Recent Feedback</h2>
            <p className="text-sm text-gray-600">{recentFeedback.length} recent reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentFeedback.map((feedback) => (
              <Card key={feedback.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="mb-1">{feedback.user}</p>
                      <div className="flex items-center gap-2">
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
                        <span className="text-xs text-gray-500">{feedback.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                        {feedback.category}
                      </span>
                      <span className="text-xs text-gray-500">{feedback.route}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-4">{feedback.comment}</p>

                  <div className="flex items-center gap-4 pt-3 border-t">
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
