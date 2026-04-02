import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (name.trim().length <= 2) {
      newErrors.name = 'Name must be more than 2 characters.';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (password.length <= 4) {
      newErrors.password = 'Password must be more than 4 characters.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('https://projects-restapi.vercel.app/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // If API returns a user object or token, we could use it here.
      // For now, we'll use the existing login mock to set the user state.
      const token = data.token;
      login(name, email, token);
      navigate('/');
    } catch (error: any) {
      setErrors({ form: error.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md space-y-12 bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl shadow-black/5">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight">Create Account</h2>
          <p className="text-gray-500">Join our community today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {errors.form && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium">
              {errors.form}
            </div>
          )}
          
          <div className="space-y-6">
            <div className="space-y-1">
              <Input 
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User size={18} />}
                required
                disabled={isLoading}
              />
              {errors.name && <p className="text-xs text-red-500 font-medium pl-1">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <Input 
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={18} />}
                required
                disabled={isLoading}
              />
              {errors.email && <p className="text-xs text-red-500 font-medium pl-1">{errors.email}</p>}
            </div>
            <div className="space-y-1">
              <Input 
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={18} />}
                required
                disabled={isLoading}
              />
              {errors.password && <p className="text-xs text-red-500 font-medium pl-1">{errors.password}</p>}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            icon={isLoading ? <Spinner size="sm" className="border-t-white" /> : <ArrowRight size={18} />}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-black hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
