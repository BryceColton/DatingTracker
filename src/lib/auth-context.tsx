"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('dating-tracker-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('dating-tracker-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call - in real app, this would be an actual API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('dating-tracker-users') || '[]');
    const existingUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const userData = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        createdAt: existingUser.createdAt
      };
      setUser(userData);
      localStorage.setItem('dating-tracker-user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('dating-tracker-users') || '[]');
    
    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password, // In real app, this would be hashed
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('dating-tracker-users', JSON.stringify(users));
    
    // Set current user
    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt
    };
    setUser(userData);
    localStorage.setItem('dating-tracker-user', JSON.stringify(userData));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dating-tracker-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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