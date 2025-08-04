"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function NewMatchForm() {
  const [app, setApp] = useState('Tinder');
  const [firstMessage, setFirstMessage] = useState('Hey! You look like trouble...👀');
  const [type, setType] = useState('Flirty');
  const [replied, setReplied] = useState('Yes');
  const [replyTime, setReplyTime] = useState('15 min');
  const [outcome, setOutcome] = useState('Number Exchanged');

  const handleSave = () => {
    const newMatchEntry = { app, firstMessage, type, replied, replyTime, outcome };
    console.log('Saving:', newMatchEntry);
    // Logic to submit data to backend or store locally
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-sm border border-gray-200">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">New Match</h2>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">App</Label>
          <Select value={app} onValueChange={setApp}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tinder">Tinder</SelectItem>
              <SelectItem value="Bumble">Bumble</SelectItem>
              <SelectItem value="Hinge">Hinge</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">First Message</Label>
          <Input 
            value={firstMessage} 
            onChange={e => setFirstMessage(e.target.value)} 
            placeholder="Enter your first message"
            className="w-full bg-gray-50 border-gray-300"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Type Type</Label>
          <div className="flex flex-wrap gap-2">
            {['Flirty', 'Funny', 'Compliment', 'Question'].map((typeOption) => (
              <button
                key={typeOption}
                onClick={() => setType(typeOption)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  type === typeOption
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                {typeOption}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Replied?</Label>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="radio"
                  id="replied-yes"
                  name="replied"
                  value="Yes"
                  checked={replied === 'Yes'}
                  onChange={e => setReplied(e.target.value)}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
              </div>
              <label htmlFor="replied-yes" className="text-sm text-gray-700 cursor-pointer">Yes</label>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="radio"
                  id="replied-no"
                  name="replied"
                  value="Reply"
                  checked={replied === 'Reply'}
                  onChange={e => setReplied(e.target.value)}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
              </div>
              <label htmlFor="replied-no" className="text-sm text-gray-700 cursor-pointer">Reply</label>
            </div>
            <Input 
              value={replyTime} 
              onChange={e => setReplyTime(e.target.value)} 
              className="w-20 text-center bg-gray-50 border-gray-300 text-sm"
              placeholder="Time"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Outcome</Label>
          <div className="space-y-3">
            {['Ghosted', 'Number Exchanged', 'Unmatched', 'Date'].map((outcomeOption) => (
              <div key={outcomeOption} className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="radio"
                    id={`outcome-${outcomeOption.toLowerCase().replace(' ', '-')}`}
                    name="outcome"
                    value={outcomeOption}
                    checked={outcome === outcomeOption}
                    onChange={e => setOutcome(e.target.value)}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                </div>
                <label 
                  htmlFor={`outcome-${outcomeOption.toLowerCase().replace(' ', '-')}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {outcomeOption}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleSave}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium text-base shadow-sm transition-colors"
        >
          Save
        </Button>
      </CardContent>
    </Card>
  );
}