import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

export default function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');

  const determineRole = (email: string): 'user' | 'driver' | 'admin' => {
    // Determine role based on email
    if (email.includes('admin')) {
      return 'admin';
    } else if (email.includes('driver')) {
      return 'driver';
    }
    return 'user';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would validate credentials
    if (email && password) {
      const role = determineRole(email);
      const userName = name || email.split('@')[0];
      onLogin({
        name: userName,
        email: email,
        role: role
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Button
          onClick={() => onNavigate('landing')}
          variant="ghost"
          className="text-white hover:bg-white/10 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#2E7D32] flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚎</span>
            </div>
            <CardTitle>Welcome to Lakbay</CardTitle>
            <CardDescription>
              {isRegistering ? 'Create your account' : 'Sign in to access your dashboard'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Sample Credentials Banner */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm mb-2">
                <strong className="text-blue-900">Sample Credentials for Testing:</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-2 bg-white rounded border border-blue-100">
                  <p className="text-blue-900 mb-1"><strong>User/Commuter:</strong></p>
                  <p className="text-gray-600">Email: user@lakbay.ph</p>
                  <p className="text-gray-600">Password: user123</p>
                </div>
                <div className="p-2 bg-white rounded border border-blue-100">
                  <p className="text-blue-900 mb-1"><strong>Driver:</strong></p>
                  <p className="text-gray-600">Email: driver@lakbay.ph</p>
                  <p className="text-gray-600">Password: driver123</p>
                </div>
                <div className="p-2 bg-white rounded border border-blue-100">
                  <p className="text-blue-900 mb-1"><strong>Admin:</strong></p>
                  <p className="text-gray-600">Email: admin@lakbay.ph</p>
                  <p className="text-gray-600">Password: admin123</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3 text-center">
                Your dashboard will be automatically determined based on your account type.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegistering && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Juan Dela Cruz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={isRegistering}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email / Username</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your-email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isRegistering && (
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-[#2E7D32] hover:underline">
                    Forgot Password?
                  </button>
                </div>
              )}
              <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                {isRegistering ? 'Register' : 'Sign In'}
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-sm text-gray-600 hover:text-[#2E7D32]"
                >
                  {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Register"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
