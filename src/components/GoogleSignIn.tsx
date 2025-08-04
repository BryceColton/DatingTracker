"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

interface GoogleSignInProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export default function GoogleSignIn({ onSuccess, onError, disabled }: GoogleSignInProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  // Google API configuration
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id';

  useEffect(() => {
    // Load Google API
    const loadGoogleAPI = () => {
      // Check if gapi is already loaded
      if (window.gapi) {
        initializeGapi();
        return;
      }

      // Create script element to load Google API
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('auth2', initializeGapi);
      };
      document.head.appendChild(script);
    };

    const initializeGapi = () => {
      window.gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'profile email https://www.googleapis.com/auth/calendar'
      }).then(() => {
        setIsGapiLoaded(true);
      }).catch((error: any) => {
        console.error('Failed to initialize Google Auth:', error);
        if (onError) {
          onError('Failed to initialize Google Sign-In');
        }
      });
    };

    loadGoogleAPI();
  }, [GOOGLE_CLIENT_ID, onError]);

  const handleGoogleSignIn = async () => {
    if (!isGapiLoaded || disabled) {
      return;
    }

    setIsLoading(true);

    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      const googleUser = await authInstance.signIn({
        scope: 'profile email https://www.googleapis.com/auth/calendar'
      });

      const success = await loginWithGoogle(googleUser);
      
      if (success) {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/dashboard');
        }
      } else {
        if (onError) {
          onError('Google Sign-In failed. Please try again.');
        }
      }
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      
      // Handle different error types
      if (error.error === 'popup_closed_by_user') {
        if (onError) {
          onError('Sign-in was cancelled');
        }
      } else if (error.error === 'access_denied') {
        if (onError) {
          onError('Access denied. Please grant the required permissions.');
        }
      } else {
        if (onError) {
          onError('Google Sign-In failed. Please try again.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={disabled || isLoading || !isGapiLoaded}
      variant="outline"
      className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
          Signing in with Google...
        </div>
      ) : !isGapiLoaded ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
          Loading Google Sign-In...
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </div>
      )}
    </Button>
  );
}