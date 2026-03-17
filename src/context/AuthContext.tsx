import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role, mockUsers } from '../db';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => boolean;
  signup: (name: string, email: string, password?: string, role?: Role) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('sms_user');
    const storedToken = localStorage.getItem('sms_token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const login = (email: string) => {
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      const newToken = `token_${foundUser.id}_${Date.now()}`;
      setUser(foundUser);
      setToken(newToken);
      localStorage.setItem('sms_user', JSON.stringify(foundUser));
      localStorage.setItem('sms_token', newToken);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, _password?: string, role: Role = 'student') => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      role,
    };
    const newToken = `token_${newUser.id}_${Date.now()}`;
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem('sms_user', JSON.stringify(newUser));
    localStorage.setItem('sms_token', newToken);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('sms_user');
    localStorage.removeItem('sms_token');
  };

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, signup, logout }}>
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
