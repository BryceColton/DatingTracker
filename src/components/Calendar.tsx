"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Heart, Star } from 'lucide-react';

interface DateEntry {
  id: string;
  location: string;
  date: string;
  time: string;
  type: string;
  outcome: string;
  rating: number;
  notes: string;
}

interface CalendarProps {
  dateEntries?: DateEntry[];
  onDateClick?: (date: Date) => void;
  selectedDate?: Date;
}

export default function Calendar({ dateEntries = [], onDateClick, selectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the first day of the month to determine padding
  const firstDayOfMonth = monthStart.getDay();
  const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => {
    const paddingDate = new Date(monthStart);
    paddingDate.setDate(paddingDate.getDate() - (firstDayOfMonth - i));
    return paddingDate;
  });

  // Get entries for a specific date
  const getEntriesForDate = (date: Date): DateEntry[] => {
    return dateEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return isSameDay(entryDate, date);
    });
  };

  // Get the best outcome for a date (for display purposes)
  const getBestOutcomeForDate = (date: Date): string | null => {
    const entries = getEntriesForDate(date);
    if (entries.length === 0) return null;
    
    const outcomeRanking = { 'Great': 4, 'Good': 3, 'Okay': 2, 'No spark': 1 };
    const bestEntry = entries.reduce((best, current) => {
      const bestRank = outcomeRanking[best.outcome as keyof typeof outcomeRanking] || 0;
      const currentRank = outcomeRanking[current.outcome as keyof typeof outcomeRanking] || 0;
      return currentRank > bestRank ? current : best;
    });
    
    return bestEntry.outcome;
  };

  // Get outcome color class
  const getOutcomeColor = (outcome: string): string => {
    switch (outcome) {
      case 'Great': return 'bg-green-100 border-green-300 text-green-800';
      case 'Good': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'Okay': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'No spark': return 'bg-gray-100 border-gray-300 text-gray-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  // Navigate months
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (onDateClick) {
      onDateClick(date);
    }
  };

  const renderDay = (date: Date, isCurrentMonth: boolean = true) => {
    const entries = getEntriesForDate(date);
    const hasEntries = entries.length > 0;
    const bestOutcome = getBestOutcomeForDate(date);
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isTodayDate = isToday(date);
    const isHovered = hoveredDate && isSameDay(date, hoveredDate);

    return (
      <button
        key={date.toISOString()}
        onClick={() => handleDateClick(date)}
        onMouseEnter={() => setHoveredDate(date)}
        onMouseLeave={() => setHoveredDate(null)}
        className={`
          relative h-14 w-full border border-gray-100 transition-all duration-200 hover:shadow-md hover:z-10
          ${isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-25 text-gray-400 hover:bg-gray-100'}
          ${isSelected ? 'ring-2 ring-pink-500 z-20' : ''}
          ${isTodayDate ? 'border-pink-300 bg-pink-25' : ''}
          ${isHovered ? 'transform scale-105' : ''}
          ${hasEntries && bestOutcome ? getOutcomeColor(bestOutcome) : ''}
        `}
        disabled={!isCurrentMonth}
      >
        {/* Day number */}
        <span className={`
          absolute top-1 left-1 text-xs font-medium
          ${isTodayDate ? 'text-pink-600' : ''}
          ${!isCurrentMonth ? 'text-gray-400' : ''}
        `}>
          {format(date, 'd')}
        </span>

        {/* Entry indicators */}
        {hasEntries && (
          <div className="absolute bottom-1 right-1 flex items-center gap-1">
            {/* Heart icon for dates */}
            <Heart size={10} className="text-pink-500 fill-current" />
            
            {/* Entry count */}
            {entries.length > 1 && (
              <span className="text-xs font-bold text-pink-600 bg-pink-100 rounded-full w-4 h-4 flex items-center justify-center">
                {entries.length}
              </span>
            )}
          </div>
        )}

        {/* Rating indicator */}
        {hasEntries && entries[0].rating > 0 && (
          <div className="absolute top-1 right-1">
            <Star 
              size={8} 
              className="text-yellow-500 fill-current" 
            />
          </div>
        )}
      </button>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarIcon className="text-pink-500" size={24} />
          {format(currentDate, 'MMMM yyyy')}
        </CardTitle>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft size={16} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="px-3 text-xs"
          >
            Today
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0 border-t border-gray-200">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="bg-gray-50 border-b border-gray-200 p-2 text-center text-xs font-semibold text-gray-600"
            >
              {day}
            </div>
          ))}

          {/* Padding days from previous month */}
          {paddingDays.map((date) => renderDay(date, false))}

          {/* Current month days */}
          {calendarDays.map((date) => renderDay(date, true))}
        </div>

        {/* Legend */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Heart size={12} className="text-pink-500 fill-current" />
              <span>Has date entry</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-500 fill-current" />
              <span>Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
              <span>Great</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
              <span>Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
              <span>Okay</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
              <span>No spark</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}