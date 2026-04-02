import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string, token?: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('mock_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (name: string, email: string, token?: string) => {
    const newUser = { name, email, token };
    setUser(newUser);
    localStorage.setItem('mock_user', JSON.stringify(newUser));
    if (token) {
      localStorage.setItem('auth_token', token);
    }
  };

  const logout = async () => {
    try {
      await fetch('https://projects-restapi.vercel.app/api/v1/auth/logout', {
        method: 'GET',
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('mock_user');
      localStorage.removeItem('auth_token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
