import PushNotifLayout from "@/components/PushNotifLayout";
import { showNotification } from "@/utils/notifications";
import { useEffect } from "react";

const Home = () => {
  // Set the desired notification time (24-hour format)
  const notificationHour = 14; // 12 PM
  const notificationMinute = 58; // 00 minutes (adjust as needed)

  // Function to check if the current time matches the notification time
  const checkNotificationTime = () => {
    const now = new Date();
    if (
      now.getHours() === notificationHour &&
      now.getMinutes() === notificationMinute
    ) {
      // Trigger the notification when the current time matches the notification time
      showNotification("Daily Reminder", "It's time for your daily task!");
    }
  };

  useEffect(() => {
    // Check the notification time every minute (you can adjust the interval as needed)
    const intervalId = setInterval(checkNotificationTime, 60000);
    return () => {
      // noinspection JSCheckFunctionSignatures
      // Clear the interval on component unmount
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      <PushNotifLayout title="Pray Notif Time" message="Test Body Message">
        {(showToast) => (
          <>
            <button onClick={() => showToast()}>Trigger Toast</button>
          </>
        )}
      </PushNotifLayout>
      <div>Hello</div>
      <button
        onClick={() =>
          showNotification(
            "Pray Notif Time",
            "Are you sure you want to miss your prayer??",
          )
        }
      >
        Trigger Notification
      </button>
    </div>
  );
};

export default Home;
