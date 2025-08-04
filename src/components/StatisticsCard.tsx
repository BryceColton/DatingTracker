"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const pickupLineData = [
  { name: 'Flirty', value: 85 },
  { name: 'Funny', value: 45 },
  { name: 'Compliment', value: 100 },
  { name: 'Question', value: 40 },
];

const outcomesData = [
  { name: 'Ghosted', value: 45, color: '#3B82F6' },
  { name: 'Number Exchanged', value: 25, color: '#9CA3AF' },
  { name: 'Unmatched', value: 20, color: '#6B7280' },
  { name: 'Date', value: 10, color: '#D1D5DB' },
];

export default function StatisticsCard() {
  return (
    <Card className="w-full max-w-md bg-white shadow-sm border border-gray-200">
      <CardContent className="p-6 space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900">Statistics</h2>
        
        {/* Pickup Line Success Rate */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Pickup Line Success Rate</h3>
          <div className="h-48 bg-gray-50 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pickupLineData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Outcomes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Outcomes</h3>
          <div className="flex items-center justify-between">
            <div className="h-32 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={outcomesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={55}
                    dataKey="value"
                    stroke="none"
                  >
                    {outcomesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3 flex-1 ml-6">
              {outcomesData.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-700 font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}