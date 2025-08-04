"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function AIInsightsCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">🧠 AI Insights</h2>
        <p className="text-gray-700">
          Looks like your <span className="font-medium">coffee dates</span> go well more
          often than others! Consider trying more of those ☕
        </p>
      </CardContent>
    </Card>
  );
}