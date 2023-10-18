import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import DailyPrayTimes from "@/components/DailyPrayTimes";

const MyApp = ({ Component, pageProps }) => {
  if (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  ) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope,
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }

  return (
    <>
      <Component {...pageProps} />
      <DailyPrayTimes />
    </>
  );
};

export default MyApp;
