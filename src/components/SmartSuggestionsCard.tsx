"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const suggestions = [
  "Dinner @ Bombay House",
  "Walk in the park",
  "Board game cafe",
  "Hike the Y trail",
];

export default function SmartSuggestionsCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-xl font-bold">💡 Smart Suggestions</h2>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center justify-between border p-2 rounded-lg shadow-sm"
          >
            <span>{suggestion}</span>
            <div className="space-x-2">
              <Button size="sm" variant="outline">
                Dismiss
              </Button>
              <Button size="sm">Save</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}