# Pray-Time
Prayer Time Reminder PWA built with NextJS, React, Supabase and Firebase Cloud Messaging

### Plan:

1. **User Interface Design:**
   - Create a simple and intuitive UI with checkboxes for each prayer.
   - Implement a search bar for city selection.
   - Allow users to set preferred reminder times for each prayer.
   - Display the prayer times fetched from the API.
   - Implement a streak mechanism for gamification (future addition).
   - Design the UI to be responsive for various devices and screen sizes.

2. **Push Notifications (FCM):**
   - Integrate Firebase Cloud Messaging (FCM) for sending push notifications.
   - Implement push notifications for prayer reminders, increasing in frequency as the prayer time approaches.

3. **Backend Integration (Future Addition):**
   - Implement user authentication using Supabase (future addition).
   - Set up a backend with Supabase for storing user preferences, streaks, and other data (future addition).

### Structure:

1. **Components:**
   - `CheckboxComponent`: For rendering prayer checkboxes.
   - `SearchBarComponent`: For city selection.
   - `SettingsComponent`: For setting preferred reminder times.
   - `StreakComponent`: For displaying streak information (future addition).
   - `NotificationComponent`: For handling push notifications.

2. **Pages:**
   - `Index.js`: Main page displaying prayer checkboxes, search bar, and streak information (future addition).
   - `Settings.js`: Page for user settings and preferences (future addition).
   - `Login.js` and `Signup.js` (future addition): Pages for user authentication.

### Tech Stack:

1. **Frontend:**
   - **Next.js**: For building the PWA with server-side rendering capabilities.
   - **React**: For building interactive user interfaces.
   - **Firebase Cloud Messaging (FCM)**: For sending push notifications to users.

2. **Push Notifications:**
   - **Firebase Cloud Messaging (FCM)**: For sending push notifications to users.

3. **Future Backend (Post-Initial Development, if budget allows):**
   - **Supabase**: For implementing user authentication and storing user data (future addition).

### Workflow:

1. **Frontend Development:**
   - Create the components and pages as outlined in the structure.
   - Implement FCM integration for push notifications.
   - Implement API integration functions for fetching prayer timings.

2. **Push Notification Implementation:**
   - Implement push notifications using Firebase Cloud Messaging.
   - Handle notification logic based on user preferences and prayer times.

3. **Testing:**
   - Test the PWA thoroughly to ensure all features work as expected.
   - Test push notifications on various devices and platforms.

4. **Deployment:**
   - Deploy the Next.js app to a hosting service like Vercel, Netlify, or AWS Amplify.
   - Configure any necessary environment variables for Firebase.

5. **Future Backend Implementation (Post-Initial Development, if budget allows):**
   - Implement user authentication using Supabase.
   - Set up a Supabase backend for storing user data and preferences.
