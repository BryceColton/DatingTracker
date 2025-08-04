"use client";

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import Calendar from '@/components/Calendar';
import GoogleCalendarSync from '@/components/GoogleCalendarSync';
import AddDateForm from '@/components/AddDateForm';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus, Sync } from 'lucide-react';

// Sample date entries for demonstration
const sampleDateEntries = [
  {
    id: '1',
    location: 'Starbucks Downtown',
    date: '2024-01-15',
    time: '14:00',
    type: 'Coffee',
    outcome: 'Great',
    rating: 5,
    notes: 'Really enjoyed our conversation about travel!'
  },
  {
    id: '2',
    location: 'Italian Bistro',
    date: '2024-01-20',
    time: '19:30',
    type: 'Dinner',
    outcome: 'Good',
    rating: 4,
    notes: 'Nice atmosphere, good food'
  },
  {
    id: '3',
    location: 'Central Park',
    date: '2024-01-25',
    time: '11:00',
    type: 'Walk',
    outcome: 'Okay',
    rating: 3,
    notes: 'Weather was a bit cold'
  }
];

export default function CalendarPage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [dateEntries, setDateEntries] = useState(sampleDateEntries);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // You could show details for this date or allow editing
    console.log('Selected date:', date);
  };

  const handleSyncComplete = (result: { success: number; failed: number }) => {
    console.log(`Sync completed: ${result.success} successful, ${result.failed} failed`);
    // You could show a toast notification here
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <CalendarIcon className="text-pink-500" size={28} />
                Your Dating Calendar
              </CardTitle>
              <p className="text-gray-600">
                Track and visualize your dating experiences with calendar integration
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Calendar */}
            <div className="lg:col-span-2">
              <Calendar
                dateEntries={dateEntries}
                onDateClick={handleDateClick}
                selectedDate={selectedDate}
              />

              {/* Quick Actions */}
              <Card className="mt-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      <Plus size={16} />
                      Add New Date
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Sync size={16} />
                      Sync All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Google Calendar Integration */}
              <GoogleCalendarSync
                dateEntries={dateEntries}
                onSyncComplete={handleSyncComplete}
                accessToken={user?.googleAccessToken}
              />

              {/* Add Date Form */}
              {showAddForm && (
                <div className="space-y-4">
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Quick Add</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => setShowAddForm(false)}
                        variant="outline"
                        size="sm"
                        className="mb-4"
                      >
                        Hide Form
                      </Button>
                    </CardContent>
                  </Card>
                  <AddDateForm />
                </div>
              )}

              {/* Selected Date Info */}
              {selectedDate && (
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {dateEntries.filter(entry => {
                      const entryDate = new Date(entry.date);
                      return entryDate.toDateString() === selectedDate.toDateString();
                    }).length > 0 ? (
                      <div className="space-y-3">
                        {dateEntries
                          .filter(entry => {
                            const entryDate = new Date(entry.date);
                            return entryDate.toDateString() === selectedDate.toDateString();
                          })
                          .map(entry => (
                            <div
                              key={entry.id}
                              className="border rounded-lg p-3 bg-gray-50"
                            >
                              <div className="font-medium text-pink-600">
                                {entry.type} at {entry.location}
                              </div>
                              <div className="text-sm text-gray-600">
                                {entry.time} • {entry.outcome} • {entry.rating}/5 stars
                              </div>
                              {entry.notes && (
                                <div className="text-sm text-gray-500 mt-1">
                                  {entry.notes}
                                </div>
                              )}
                            </div>
                          ))
                        }
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        No dates scheduled for this day.
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Quick Stats */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Dates:</span>
                    <span className="font-medium">{dateEntries.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Great Outcomes:</span>
                    <span className="font-medium text-green-600">
                      {dateEntries.filter(e => e.outcome === 'Great').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average Rating:</span>
                    <span className="font-medium">
                      {(dateEntries.reduce((sum, e) => sum + e.rating, 0) / dateEntries.length).toFixed(1)}/5
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>This Month:</span>
                    <span className="font-medium">
                      {dateEntries.filter(e => {
                        const entryDate = new Date(e.date);
                        const now = new Date();
                        return entryDate.getMonth() === now.getMonth() && 
                               entryDate.getFullYear() === now.getFullYear();
                      }).length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}