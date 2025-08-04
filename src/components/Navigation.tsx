"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/add-date', label: 'Add Date', icon: '➕' },
  { href: '/history', label: 'Date History', icon: '📅' },
  { href: '/insights', label: 'AI Insights', icon: '🤖' },
  { href: '/search', label: 'Search & Filter', icon: '🔍' },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return null; // Don't show navigation for unauthenticated users
  }

  return (
    <Card className="w-full mb-6 bg-white shadow-sm border border-gray-200">
      <nav className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Navigation Links */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          
          {/* User Info and Logout */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Welcome, <span className="font-medium text-gray-900">{user.name}</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm px-3 py-1 border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
    </Card>
  );
}