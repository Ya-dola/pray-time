import { ToastContainer, toast } from "react-toastify";

const PushNotifLayout = ({ children, title, message }) => {
  // Function to show both local push notification and toast message
  const showNotificationAndToast = () => {
    // Show local push notification
    if (Notification.permission === "granted") {
      const notificationOptions = {
        body: message,
      };
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, notificationOptions);
      });
    } else if (Notification.permission !== "denied") {
      // Request permission and show notification if granted
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotificationAndToast();
        }
      });
    }

    // Show toast message
    toast(
      <div>
        <h5>{title}</h5>
        <h6>{message}</h6>
      </div>,
      {
        closeOnClick: false,
      },
    );
  };

  return (
    <>
      <ToastContainer />
      {children(showNotificationAndToast)} {/* Pass the function as a prop */}
    </>
  );
};

export default PushNotifLayout;
