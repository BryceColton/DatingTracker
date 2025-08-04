import React from "react";
import SmartSuggestionsCard from "@/components/SmartSuggestionsCard";
import DateHistoryCard from "@/components/DateHistoryCard";
import StatisticsCard from "@/components/StatisticsCard";
import AIInsightsCard from "@/components/AIInsightsCard";
import FilterSearchCard from "@/components/FilterSearchCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Dating Tracker Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <SmartSuggestionsCard />
        <DateHistoryCard />
        <StatisticsCard />
        <AIInsightsCard />
        <FilterSearchCard />
      </div>
    </div>
  );
}