import React from "react";
import DateHistoryCard from "@/components/DateHistoryCard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Date History</h2>
          <p className="text-gray-600">Review your past dates and their outcomes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DateHistoryCard />
          {/* You can add more history cards or a list view here */}
        </div>
      </div>
    </ProtectedRoute>
  );
}