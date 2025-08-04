"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const dateHistory = [
  { place: "Bombay House", date: "2025-07-12", type: "Dinner", outcome: "😍" },
  { place: "Park Walk", date: "2025-07-06", type: "Outdoor", outcome: "😊" },
  { place: "Movie Night", date: "2025-06-28", type: "Entertainment", outcome: "😐" },
];

export default function DateHistoryCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-2 overflow-y-auto max-h-64">
        <h2 className="text-xl font-bold">📅 Date History</h2>
        {dateHistory.map((item, i) => (
          <div
            key={i}
            className="border p-2 rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.place}</p>
              <p className="text-sm text-gray-500">
                {item.date} • {item.type}
              </p>
            </div>
            <span className="text-2xl">{item.outcome}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}