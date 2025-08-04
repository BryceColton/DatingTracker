"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  avatar?: string;
  googleAccessToken?: string;
  authMethod: 'email' | 'google';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (googleUser: any) => Promise<boolean>;
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
      const userData: User = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        createdAt: existingUser.createdAt,
        authMethod: 'email'
      };
      setUser(userData);
      localStorage.setItem('dating-tracker-user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const loginWithGoogle = async (googleUser: any): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract user information from Google response
      const profile = googleUser.getBasicProfile();
      const authResponse = googleUser.getAuthResponse();
      
      const userData: User = {
        id: profile.getId(),
        email: profile.getEmail(),
        name: profile.getName(),
        avatar: profile.getImageUrl(),
        googleAccessToken: authResponse.access_token,
        createdAt: new Date().toISOString(),
        authMethod: 'google'
      };

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('dating-tracker-google-users') || '[]');
      const existingUserIndex = users.findIndex((u: any) => u.email === userData.email);
      
      if (existingUserIndex >= 0) {
        // Update existing user with new access token
        users[existingUserIndex] = { ...users[existingUserIndex], ...userData };
      } else {
        // Add new Google user
        users.push(userData);
      }
      
      localStorage.setItem('dating-tracker-google-users', JSON.stringify(users));
      setUser(userData);
      localStorage.setItem('dating-tracker-user', JSON.stringify(userData));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Google login failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('dating-tracker-users') || '[]');
    const googleUsers = JSON.parse(localStorage.getItem('dating-tracker-google-users') || '[]');
    
    // Check if user already exists (either email or Google)
    if (users.some((u: any) => u.email === email) || googleUsers.some((u: any) => u.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password, // In real app, this would be hashed
      createdAt: new Date().toISOString(),
      authMethod: 'email'
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('dating-tracker-users', JSON.stringify(users));
    
    // Set current user
    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
      authMethod: 'email'
    };
    setUser(userData);
    localStorage.setItem('dating-tracker-user', JSON.stringify(userData));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    // Sign out from Google if user was logged in with Google
    if (user?.authMethod === 'google' && window.gapi?.auth2) {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (authInstance) {
        authInstance.signOut();
      }
    }
    
    setUser(null);
    localStorage.removeItem('dating-tracker-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, signup, logout, isLoading }}>
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

// Declare global gapi for TypeScript
declare global {
  interface Window {
    gapi: any;
    onGoogleLibraryLoad: () => void;
  }
}