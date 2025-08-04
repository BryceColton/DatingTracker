import { google } from 'googleapis';

// Google Calendar configuration
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const CALENDAR_ID = 'primary'; // Use primary calendar or create a dedicated one

interface DateEntry {
  id: string;
  location: string;
  date: string;
  time: string;
  type: string;
  outcome: string;
  rating: number;
  notes: string;
}

interface GoogleCalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location?: string;
  colorId?: string;
}

class GoogleCalendarService {
  private calendar: any;
  private auth: any;

  constructor() {
    // Initialize the Google Calendar API
    this.auth = null;
    this.calendar = null;
  }

  // Initialize authentication (to be called after user signs in with Google)
  async initialize(accessToken: string) {
    try {
      // Create OAuth2 client with the access token
      this.auth = new google.auth.OAuth2();
      this.auth.setCredentials({
        access_token: accessToken,
      });

      // Initialize Calendar API
      this.calendar = google.calendar({ version: 'v3', auth: this.auth });
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Calendar:', error);
      return false;
    }
  }

  // Convert date entry to Google Calendar event
  private dateEntryToCalendarEvent(entry: DateEntry): GoogleCalendarEvent {
    const dateTime = new Date(`${entry.date}T${entry.time}`);
    const endDateTime = new Date(dateTime.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours duration

    // Choose color based on outcome
    const getColorId = (outcome: string): string => {
      switch (outcome) {
        case 'Great': return '10'; // Green
        case 'Good': return '7';   // Blue
        case 'Okay': return '5';   // Yellow
        case 'No spark': return '8'; // Gray
        default: return '1';       // Default
      }
    };

    const summary = `${entry.type} Date - ${entry.location}`;
    const description = `
Date Type: ${entry.type}
Location: ${entry.location}
Outcome: ${entry.outcome}
Rating: ${entry.rating}/5 stars
${entry.notes ? `Notes: ${entry.notes}` : ''}

Created by Dating Tracker App
    `.trim();

    return {
      summary,
      description,
      start: {
        dateTime: dateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      location: entry.location,
      colorId: getColorId(entry.outcome),
    };
  }

  // Create a new calendar event from a date entry
  async createEvent(entry: DateEntry): Promise<string | null> {
    if (!this.calendar) {
      console.error('Google Calendar not initialized');
      return null;
    }

    try {
      const event = this.dateEntryToCalendarEvent(entry);
      
      const response = await this.calendar.events.insert({
        calendarId: CALENDAR_ID,
        resource: event,
      });

      return response.data.id;
    } catch (error) {
      console.error('Failed to create calendar event:', error);
      return null;
    }
  }

  // Update an existing calendar event
  async updateEvent(eventId: string, entry: DateEntry): Promise<boolean> {
    if (!this.calendar) {
      console.error('Google Calendar not initialized');
      return false;
    }

    try {
      const event = this.dateEntryToCalendarEvent(entry);
      
      await this.calendar.events.update({
        calendarId: CALENDAR_ID,
        eventId: eventId,
        resource: event,
      });

      return true;
    } catch (error) {
      console.error('Failed to update calendar event:', error);
      return false;
    }
  }

  // Delete a calendar event
  async deleteEvent(eventId: string): Promise<boolean> {
    if (!this.calendar) {
      console.error('Google Calendar not initialized');
      return false;
    }

    try {
      await this.calendar.events.delete({
        calendarId: CALENDAR_ID,
        eventId: eventId,
      });

      return true;
    } catch (error) {
      console.error('Failed to delete calendar event:', error);
      return false;
    }
  }

  // Get events from Google Calendar
  async getEvents(startDate?: Date, endDate?: Date): Promise<any[]> {
    if (!this.calendar) {
      console.error('Google Calendar not initialized');
      return [];
    }

    try {
      const timeMin = startDate ? startDate.toISOString() : new Date().toISOString();
      const timeMax = endDate ? endDate.toISOString() : undefined;

      const response = await this.calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin,
        timeMax,
        maxResults: 50,
        singleEvents: true,
        orderBy: 'startTime',
        q: 'Dating Tracker', // Filter events created by our app
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Failed to get calendar events:', error);
      return [];
    }
  }

  // Sync date entries with Google Calendar
  async syncDateEntries(entries: DateEntry[]): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const entry of entries) {
      try {
        // Check if entry already has a calendar event ID
        const existingEventId = localStorage.getItem(`calendar-event-${entry.id}`);
        
        if (existingEventId) {
          // Update existing event
          const updated = await this.updateEvent(existingEventId, entry);
          if (updated) {
            success++;
          } else {
            failed++;
          }
        } else {
          // Create new event
          const eventId = await this.createEvent(entry);
          if (eventId) {
            // Store the event ID for future updates
            localStorage.setItem(`calendar-event-${entry.id}`, eventId);
            success++;
          } else {
            failed++;
          }
        }
      } catch (error) {
        console.error(`Failed to sync entry ${entry.id}:`, error);
        failed++;
      }
    }

    return { success, failed };
  }

  // Check if user has granted calendar permissions
  async hasCalendarPermission(): Promise<boolean> {
    if (!this.calendar) {
      return false;
    }

    try {
      // Try to make a simple API call to check permissions
      await this.calendar.calendarList.list();
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const googleCalendarService = new GoogleCalendarService();

// Export types
export type { DateEntry, GoogleCalendarEvent };