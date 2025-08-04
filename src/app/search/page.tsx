import React from "react";
import FilterSearchCard from "@/components/FilterSearchCard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function SearchPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Search & Filter</h2>
          <p className="text-gray-600">Find and filter your dating data with advanced search options</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <FilterSearchCard />
          
          {/* Placeholder for search results */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Search Results</h3>
            <p className="text-gray-500 text-center py-8">
              Use the filters above to search through your dating data
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}