// TimerNotif.js
import { useEffect } from "react";
import { showNotification } from "@/utils/notifications";

const TimerNotif = ({ title, message, img, hours, minutes }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (now.getHours() === hours && now.getMinutes() === minutes) {
        showNotification(title, message, img);
      }
    }, 60000); // Check every minute (60000 milliseconds)

    return () => {
      // noinspection JSCheckFunctionSignatures
      clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, [title, message, img, hours, minutes]);

  // This component doesn't render anything, it just triggers notifications
  return null;
};

export default TimerNotif;
