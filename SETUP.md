# Dating Tracker - Enhanced Features Setup Guide

This guide explains how to set up the new enhanced features including improved date forms, calendar component, Google Calendar integration, and Google Sign-In.

## 🆕 New Features

### 1. Enhanced Date Form
- ✅ Better validation and error handling
- ✅ Time selection in addition to date
- ✅ Star rating system (1-5 stars)
- ✅ Enhanced outcome options with emojis
- ✅ Notes field for additional details
- ✅ Improved styling and user experience

### 2. Calendar Component
- ✅ Visual calendar display of date entries
- ✅ Color-coded dates based on outcomes
- ✅ Interactive date selection
- ✅ Date entry indicators and ratings
- ✅ Navigation between months

### 3. Google Calendar Integration
- ✅ Sync date entries to Google Calendar
- ✅ Automatic event creation with details
- ✅ Color-coded events based on outcomes
- ✅ Comprehensive event descriptions

### 4. Google Sign-In Authentication
- ✅ OAuth2 integration with Google
- ✅ Calendar permissions for sync
- ✅ User profile information
- ✅ Seamless login experience

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Google Cloud Console account
- Dating Tracker app already set up

### 1. Install Dependencies

The required dependencies are already included in package.json:
- `googleapis` - Google APIs client
- `next-auth` - Authentication
- `date-fns` - Date manipulation
- `react-calendar` - Calendar components

```bash
npm install
```

### 2. Google OAuth Setup

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Calendar API
4. Enable the Google+ API (for sign-in)

#### Step 2: Create OAuth Credentials
1. Go to "Credentials" in the Google Cloud Console
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production domain
5. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - Your production domain
6. Copy the Client ID

#### Step 3: Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Add your Google Client ID:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### 3. Running the Application

```bash
npm run dev
```

Visit `http://localhost:3000` and test the new features:

1. **Login Page** - Try Google Sign-In
2. **Calendar Page** - `/calendar` - View the calendar component
3. **Add Date Form** - Enhanced form with new features
4. **Google Calendar Sync** - Available after Google sign-in

## 📱 Feature Usage

### Enhanced Date Form
- Navigate to "Add Date" or use the calendar page
- Fill in all required fields (location, date, time, type, outcome)
- Optionally add a star rating and notes
- Form validates input and shows helpful error messages

### Calendar Component
- View dates on the interactive calendar
- Click on dates to see details
- Color coding shows outcome types:
  - 🟢 Green: Great dates
  - 🔵 Blue: Good dates  
  - 🟡 Yellow: Okay dates
  - ⚫ Gray: No spark dates
- Hearts (❤️) indicate dates with entries
- Stars (⭐) show rated dates

### Google Calendar Integration
- Sign in with Google (ensure calendar permissions are granted)
- Use the Google Calendar Sync component
- Sync creates events in your Google Calendar with:
  - Event title: "{Date Type} Date - {Location}"
  - Date and time from your entry
  - Color coding based on outcome
  - Detailed description with rating and notes

### Google Sign-In
- Click "Continue with Google" on the login page
- Grant permissions for profile and calendar access
- Automatically logged in with Google account

## 🔧 Customization

### Date Form Fields
Modify `src/components/AddDateForm.tsx` to:
- Add new date types in the Select component
- Change outcome options
- Customize validation rules

### Calendar Styling
Update `src/components/Calendar.tsx` to:
- Change color schemes
- Modify date indicators
- Adjust layout and sizing

### Google Calendar Events
Edit `src/lib/google-calendar.ts` to:
- Customize event titles and descriptions
- Change color mappings
- Modify sync behavior

## 🚀 Deployment Considerations

### Production Setup
1. Update Google OAuth settings with production domains
2. Ensure HTTPS for Google OAuth (required in production)
3. Set production environment variables
4. Test Google Calendar permissions in production

### Security Notes
- Never commit the `.env.local` file
- Keep Google Client ID public (it's meant to be)
- Ensure OAuth redirect URIs match exactly
- Test permissions thoroughly

## 🐛 Troubleshooting

### Google Sign-In Issues
- Check console for OAuth errors
- Verify Client ID is correct
- Ensure domains are whitelisted in Google Console
- Clear browser cache/cookies

### Calendar Sync Issues
- Verify calendar permissions were granted
- Check network connectivity
- Look for API quota limits in Google Console
- Ensure access token is valid

### Form Validation
- All required fields must be filled
- Date cannot be in the future
- Time must be in HH:MM format

## 📚 Further Development

### Potential Enhancements
- Real-time sync with Google Calendar
- Notification system for upcoming dates
- Export functionality for date history
- Advanced filtering and search
- Mobile app development
- Integration with other calendar services

### API Integration
- Replace localStorage with real backend API
- Implement proper user authentication
- Add data persistence and backup
- Create API endpoints for calendar sync

## 🤝 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Ensure Google OAuth is configured properly
4. Check network connectivity for API calls

The enhanced Dating Tracker now provides a comprehensive solution for tracking and managing your dating experiences with beautiful UI, calendar integration, and Google services connectivity!