"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FilterSearchCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-xl font-bold">🔍 Filter & Search</h2>
        <Input placeholder="Search by place or keyword..." />
        <div className="flex space-x-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dinner">Dinner</SelectItem>
              <SelectItem value="Outdoor">Outdoor</SelectItem>
              <SelectItem value="Coffee">Coffee</SelectItem>
              <SelectItem value="Movie">Movie</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="😍">😍 Great</SelectItem>
              <SelectItem value="😊">😊 Good</SelectItem>
              <SelectItem value="😐">😐 Okay</SelectItem>
              <SelectItem value="😕">😕 Bad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}