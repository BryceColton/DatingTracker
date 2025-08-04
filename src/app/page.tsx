"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { user, isLoading } = useAuth();

  // Redirect authenticated users to dashboard
  if (user && !isLoading) {
    redirect('/dashboard');
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Dating <span className="text-purple-600">Tracker</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Take control of your dating journey with intelligent insights, detailed analytics, 
            and personalized recommendations to help you find meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-medium">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg font-medium">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Analytics</h3>
            <p className="text-gray-600">
              Track your dating patterns, success rates, and get insights into what works best for you.
            </p>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Insights</h3>
            <p className="text-gray-600">
              Get personalized recommendations and tips based on your dating history and preferences.
            </p>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Date Management</h3>
            <p className="text-gray-600">
              Organize your dates, track interactions, and never forget important details about connections.
            </p>
          </Card>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Track Your Dates</h3>
              <p className="text-gray-600">
                Log details about your dates, from first meetings to follow-ups.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Insights</h3>
              <p className="text-gray-600">
                Analyze patterns and receive AI-powered recommendations.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Improve & Connect</h3>
              <p className="text-gray-600">
                Use data-driven insights to improve your dating success.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-12 bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Dating Life?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of users who are already improving their dating success with data-driven insights.
          </p>
          <Link href="/signup">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-medium">
              Start Your Journey Today
            </Button>
          </Link>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Dating Tracker</h3>
          <p className="text-gray-400 mb-6">
            Your personal dating analytics and insights platform.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="text-gray-400 hover:text-white transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}