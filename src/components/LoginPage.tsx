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
  const [error, setError] = useState('');

  // Valid credentials
  const validCredentials = [
    { email: 'user@lakbay.ph', password: 'user123', role: 'user' as const, name: 'User' },
    { email: 'driver@lakbay.ph', password: 'driver123', role: 'driver' as const, name: 'Driver' },
    { email: 'admin@lakbay.ph', password: 'admin123', role: 'admin' as const, name: 'Admin' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate credentials against the valid list
    const validUser = validCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (validUser) {
      // Login successful
      onLogin({
        name: validUser.name,
        email: validUser.email,
        role: validUser.role
      });
    } else {
      // Invalid credentials
      setError('Invalid email or password. Please check your credentials and try again.');
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
              
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
                  {error}
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