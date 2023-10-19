# Pray-Time

Prayer Time Reminder PWA built with Next.js, React, Supabase, and Local Notifications

### Plan:

1. **User Interface Design:**
    - Create a simple and intuitive UI with checkboxes for each prayer.
    - Implement a search bar for city selection.
    - Allow users to set preferred reminder times for each prayer.
    - Display the prayer times fetched from the API.
    - Implement a streak mechanism for gamification (future addition).
    - Design the UI to be responsive for various devices and screen sizes.
    - Design a logo for the app.
    - Design logos for Notifications based on prayer and the notification counter for each prayer.

2. **Push Notifications (Local Notifications):**
    - Implement local notifications for sending prayer reminders, increasing in frequency as the prayer time approaches.
    - Design a notification counter for each prayer to display the number of pending notifications.

3. **Backend Integration (Future Addition):**
    - Implement user authentication using Supabase (future addition).
    - Set up a backend with Supabase for storing user preferences, streaks, and other data (future addition).
    - Create documentation on how to add the PWA app to user's devices.

4. **Testing:**
    - Create test files for unit and integration tests to ensure the app functions correctly.

### Tech Stack:

1. **Frontend:**
    - **Next.js**: For building the PWA with server-side rendering capabilities.
    - **React**: For building interactive user interfaces.
    - **Local Notifications**: For sending push notifications to users' devices without relying on external services.

2. **Persistence:**
    - **Local Storage**: Use local storage to store user preferences and app state if the user is not logged in.

### Workflow:

1. **Frontend Development:**
    - Create the components and pages as outlined in the structure.
    - Implement local notifications for push notification functionality.
    - Implement API integration functions for fetching prayer timings.

2. **Local Notification Implementation:**
    - Implement local notifications for prayer reminders.
    - Handle notification logic based on user preferences and prayer times.

3. **Testing:**
    - Write unit and integration tests to validate the functionality of the app components and notification system.

4. **Deployment:**
    - Deploy the Next.js app to a hosting service like Vercel, Netlify, or AWS Amplify.
    - Configure any necessary environment variables for the app.

5. **Future Backend Implementation (Post-Initial Development, if budget allows):**
    - Implement user authentication using Supabase.
    - Set up a Supabase backend for storing user data and preferences.
    - Implement endpoints for retrieving prayer times and other necessary data.

6. **Documentation:**
    - Create a comprehensive guide on how users can add the PWA app to their devices.
    - Provide instructions on how to use the app, set preferences, and receive notifications.
    - Include troubleshooting steps for common issues users might encounter.

7. **Logo Design:**
    - Design a logo for the Pray-Time app.
    - Design separate logos for notifications based on prayer types and include a counter for pending notifications.

### API Source: [Prayer Times API](https://aladhan.com/prayer-times-api)

#### Other Potential Sources

- [Daily Prayer Time API](https://github.com/abdulrcs/Daily-Prayer-Time-API)
- [Services By Islam Network](https://islamic.network/services.html)
