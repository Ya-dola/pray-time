// Listen for the 'push' event, triggered when a push notification is received
self.addEventListener("push", (event) => {
  // Extract the notification message from the push event data
  const options = {
    body: event.data.text(), // Set the body of the notification to the received message
  };

  // Wait until the notification is shown to the user
  event.waitUntil(
    // Show a notification with the title 'PrayTime' and the extracted options
    self.registration.showNotification("PrayTime", options),
  );
});
