"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card } from '@/components/ui/card';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/add-date', label: 'Add Date', icon: '➕' },
  { href: '/history', label: 'Date History', icon: '📅' },
  { href: '/insights', label: 'AI Insights', icon: '🤖' },
  { href: '/search', label: 'Search & Filter', icon: '🔍' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <Card className="w-full mb-6 bg-white shadow-sm border border-gray-200">
      <nav className="p-4">
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
      </nav>
    </Card>
  );
}