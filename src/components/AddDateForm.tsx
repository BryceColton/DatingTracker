"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Heart, Star } from 'lucide-react';

interface DateEntry {
  location: string;
  date: string;
  time: string;
  type: string;
  outcome: string;
  rating: number;
  notes: string;
}

export default function AddDateForm() {
  const [formData, setFormData] = useState<DateEntry>({
    location: '',
    date: '',
    time: '',
    type: '',
    outcome: '',
    rating: 0,
    notes: ''
  });
  const [errors, setErrors] = useState<Partial<DateEntry>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<DateEntry> = {};

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.date = 'Date cannot be in the future';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.type) {
      newErrors.type = 'Date type is required';
    }

    if (!formData.outcome) {
      newErrors.outcome = 'Outcome is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof DateEntry, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving date entry:', formData);
      
      // Reset form after successful save
      setFormData({
        location: '',
        date: '',
        time: '',
        type: '',
        outcome: '',
        rating: 0,
        notes: ''
      });
      
      // Show success message (you could add a toast here)
      alert('Date entry saved successfully!');
      
    } catch (error) {
      console.error('Error saving date entry:', error);
      alert('Failed to save date entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleInputChange('rating', star)}
            className={`transition-colors ${
              star <= formData.rating 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star 
              size={20} 
              fill={star <= formData.rating ? 'currentColor' : 'none'}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Card className="max-w-lg mx-auto mt-6 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-pink-600 flex items-center justify-center gap-2">
          <Heart className="text-pink-500" size={24} />
          Add Date Experience
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Location Field */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" />
            Location
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Where did you go?"
            className={`w-full ${errors.location ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        {/* Date and Time Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              max={format(new Date(), 'yyyy-MM-dd')}
              className={`w-full ${errors.date ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
              <Clock size={16} className="text-gray-500" />
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className={`w-full ${errors.time ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.time && (
              <p className="text-red-500 text-xs mt-1">{errors.time}</p>
            )}
          </div>
        </div>

        {/* Type Field */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Date Type</Label>
          <Select onValueChange={(value) => handleInputChange('type', value)}>
            <SelectTrigger className={errors.type ? 'border-red-500 focus:border-red-500' : ''}>
              <SelectValue placeholder="What kind of date was it?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Coffee">☕ Coffee Date</SelectItem>
              <SelectItem value="Dinner">🍽️ Dinner</SelectItem>
              <SelectItem value="Lunch">🥗 Lunch</SelectItem>
              <SelectItem value="Drinks">🍸 Drinks</SelectItem>
              <SelectItem value="Walk">🚶 Walk/Outdoor</SelectItem>
              <SelectItem value="Movie">🎬 Movie</SelectItem>
              <SelectItem value="Activity">🎯 Activity/Event</SelectItem>
              <SelectItem value="Other">💫 Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-red-500 text-xs mt-1">{errors.type}</p>
          )}
        </div>

        {/* Outcome Field */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">How did it go?</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'Great', emoji: '😍', color: 'bg-green-50 border-green-200 text-green-700' },
              { value: 'Good', emoji: '😊', color: 'bg-blue-50 border-blue-200 text-blue-700' },
              { value: 'Okay', emoji: '😐', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
              { value: 'No spark', emoji: '😕', color: 'bg-gray-50 border-gray-200 text-gray-700' }
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                  formData.outcome === option.value
                    ? option.color
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="outcome"
                  value={option.value}
                  checked={formData.outcome === option.value}
                  onChange={(e) => handleInputChange('outcome', e.target.value)}
                  className="sr-only"
                />
                <span className="text-lg">{option.emoji}</span>
                <span className="text-sm font-medium">{option.value}</span>
              </label>
            ))}
          </div>
          {errors.outcome && (
            <p className="text-red-500 text-xs mt-1">{errors.outcome}</p>
          )}
        </div>

        {/* Rating Field */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Overall Rating</Label>
          <div className="flex items-center gap-2">
            {renderStarRating()}
            <span className="text-sm text-gray-500 ml-2">
              {formData.rating > 0 ? `${formData.rating}/5` : 'Not rated'}
            </span>
          </div>
        </div>

        {/* Notes Field */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium">
            Notes (Optional)
          </Label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Any additional thoughts or details..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <Button 
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 text-sm font-medium transition-all duration-200 transform hover:scale-105" 
          onClick={handleSave}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </div>
          ) : (
            'Save Date Experience'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}