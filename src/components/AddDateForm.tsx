"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function AddDateForm() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [outcome, setOutcome] = useState('');

  const handleSave = () => {
    const newDateEntry = { location, date, type, outcome };
    console.log('Saving:', newDateEntry);
    // Logic to submit data to backend or store locally
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-bold text-pink-600">Add Date</h2>

        <div>
          <Label>Location</Label>
          <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter location" />
        </div>

        <div>
          <Label>Date</Label>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <div>
          <Label>Type</Label>
          <Select onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Coffee">Coffee</SelectItem>
              <SelectItem value="Dinner">Dinner</SelectItem>
              <SelectItem value="Walk">Walk</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Outcome</Label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="outcome"
                value="Went well"
                checked={outcome === 'Went well'}
                onChange={e => setOutcome(e.target.value)}
              />
              Went well
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="outcome"
                value="No spark"
                checked={outcome === 'No spark'}
                onChange={e => setOutcome(e.target.value)}
              />
              No spark
            </label>
          </div>
        </div>

        <Button className="w-full" onClick={handleSave}>Save</Button>
      </CardContent>
    </Card>
  );
}