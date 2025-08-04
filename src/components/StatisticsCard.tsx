"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

// Note: For now, I'll create a simple version without the chart library
// You can install recharts later: npm install recharts

const data = [
  { name: "Dinner", value: 3 },
  { name: "Outdoor", value: 2 },
  { name: "Coffee", value: 1 },
];

export default function StatisticsCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-4">📊 What's Working?</h2>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span className="font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}