import React from "react";
import AddDateForm from "@/components/AddDateForm";

export default function AddDatePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Date</h2>
        <p className="text-gray-600">Track your dating experiences and outcomes</p>
      </div>
      
      <div className="flex justify-center">
        <AddDateForm />
      </div>
    </div>
  );
}