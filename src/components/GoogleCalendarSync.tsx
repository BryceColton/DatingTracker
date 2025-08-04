"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { googleCalendarService, DateEntry } from '@/lib/google-calendar';
import { Calendar, Sync, CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';

interface GoogleCalendarSyncProps {
  dateEntries: DateEntry[];
  onSyncComplete?: (result: { success: number; failed: number }) => void;
  accessToken?: string;
}

export default function GoogleCalendarSync({ 
  dateEntries, 
  onSyncComplete, 
  accessToken 
}: GoogleCalendarSyncProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<{ success: number; failed: number } | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Google Calendar service when access token is available
  useEffect(() => {
    const initializeService = async () => {
      if (accessToken && !isInitialized) {
        try {
          const success = await googleCalendarService.initialize(accessToken);
          if (success) {
            setIsInitialized(true);
            const permission = await googleCalendarService.hasCalendarPermission();
            setHasPermission(permission);
            setError(null);
          } else {
            setError('Failed to initialize Google Calendar service');
          }
        } catch (err) {
          setError('Error initializing Google Calendar service');
          console.error('Calendar initialization error:', err);
        }
      }
    };

    initializeService();
  }, [accessToken, isInitialized]);

  // Handle sync with Google Calendar
  const handleSync = async () => {
    if (!isInitialized || !hasPermission) {
      setError('Google Calendar not properly initialized or permission not granted');
      return;
    }

    setIsSyncing(true);
    setError(null);

    try {
      const result = await googleCalendarService.syncDateEntries(dateEntries);
      setLastSyncResult(result);
      
      if (onSyncComplete) {
        onSyncComplete(result);
      }

      // Store last sync time
      localStorage.setItem('last-calendar-sync', new Date().toISOString());
      
    } catch (err) {
      setError('Failed to sync with Google Calendar');
      console.error('Sync error:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Get last sync time
  const getLastSyncTime = (): string | null => {
    const lastSync = localStorage.getItem('last-calendar-sync');
    if (lastSync) {
      return new Date(lastSync).toLocaleString();
    }
    return null;
  };

  // Request Google Calendar permission
  const requestPermission = () => {
    // This would typically trigger the OAuth flow
    // For now, we'll show instructions
    setError('Please ensure you have granted calendar permissions during Google Sign-In');
  };

  if (!accessToken) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-600">
            <Calendar size={20} />
            Google Calendar Sync
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-4">
            <AlertCircle className="mx-auto text-yellow-500 mb-2" size={48} />
            <p className="text-gray-600">
              Sign in with Google to sync your dates with Google Calendar
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Calendar className="text-blue-500" size={20} />
          Google Calendar Sync
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Status Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {isInitialized ? (
              <CheckCircle className="text-green-500" size={16} />
            ) : (
              <AlertCircle className="text-yellow-500" size={16} />
            )}
            <span className="text-sm">
              Service: {isInitialized ? 'Connected' : 'Connecting...'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {hasPermission ? (
              <CheckCircle className="text-green-500" size={16} />
            ) : (
              <AlertCircle className="text-red-500" size={16} />
            )}
            <span className="text-sm">
              Permissions: {hasPermission ? 'Granted' : 'Not granted'}
            </span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Sync Statistics */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Date entries:</span>
            <span className="font-medium">{dateEntries.length}</span>
          </div>
          
          {lastSyncResult && (
            <>
              <div className="flex justify-between text-sm">
                <span>Last sync - Success:</span>
                <span className="text-green-600 font-medium">{lastSyncResult.success}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last sync - Failed:</span>
                <span className="text-red-600 font-medium">{lastSyncResult.failed}</span>
              </div>
            </>
          )}
          
          {getLastSyncTime() && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
              <Clock size={12} />
              <span>Last synced: {getLastSyncTime()}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {!hasPermission ? (
            <Button
              onClick={requestPermission}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Grant Calendar Permission
            </Button>
          ) : (
            <Button
              onClick={handleSync}
              disabled={isSyncing || !isInitialized || dateEntries.length === 0}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isSyncing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Syncing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sync size={16} />
                  Sync with Google Calendar
                </div>
              )}
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={() => window.open('https://calendar.google.com', '_blank')}
            className="w-full"
          >
            <div className="flex items-center gap-2">
              <ExternalLink size={16} />
              Open Google Calendar
            </div>
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-xs text-gray-500 text-center">
          Syncing will create events in your Google Calendar with details about your dates.
          Events are color-coded based on outcomes and include ratings and notes.
        </div>
      </CardContent>
    </Card>
  );
}