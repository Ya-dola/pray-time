// Show Local Notification
// noinspection JSIgnoredPromiseFromCall

const showNotification = (title, message, imageUrl) => {
  const notificationOptions = {
    body: message || "Default Notification Message",
    icon: imageUrl || "/default.png",
  };

  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(
        title || "Default Title",
        notificationOptions,
      );
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showNotification(title, message, imageUrl);
      }
    });
  }
};

export { showNotification };
