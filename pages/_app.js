import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import DailyPrayTimes from "@/components/DailyPrayTimes";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const MyApp = ({ Component, pageProps }) => {
  // Service Worker Connection
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
    <Provider store={store}>
      <ThemeProvider attribute={"class"} enableSystem={false}>
        <Theme
          accentColor={"plum"}
          radius={"large"}
          grayColor={"mauve"}
          scaling={"110%"}
        >
          <DailyPrayTimes />
          <Component {...pageProps} />
        </Theme>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
