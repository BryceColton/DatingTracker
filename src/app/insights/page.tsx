import React from "react";
import AIInsightsCard from "@/components/AIInsightsCard";
import SmartSuggestionsCard from "@/components/SmartSuggestionsCard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function InsightsPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Insights</h2>
          <p className="text-gray-600">Get personalized insights and suggestions to improve your dating game</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <AIInsightsCard />
          </div>
          <div className="space-y-6">
            <SmartSuggestionsCard />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}