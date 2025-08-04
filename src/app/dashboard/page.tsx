import React from "react";
import NewMatchForm from "@/components/NewMatchForm";
import StatisticsCard from "@/components/StatisticsCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-center">
          <div className="flex justify-center lg:justify-end">
            <NewMatchForm />
          </div>
          <div className="flex justify-center lg:justify-start">
            <StatisticsCard />
          </div>
        </div>
      </div>
    </div>
  );
}