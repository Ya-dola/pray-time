import PushToastLayout from "@/components/PushToastLayout";
import TimerNotif from "@/components/TimerNotif";
import ThemeButton from "@/components/ThemeButton";
import Layout from "@/components/Layout/Layout";
import { showNotification } from "@/utils/notifications";
import PrayerCard from "@/components/PrayerCard/PrayerCard";
import { PRAYER_TIMINGS } from "@/utils/adhanApi";
import { Flex } from "@radix-ui/themes";
import LocationBar from "@/components/LocationBar";

const metadata = { title: "Home", description: "Home Page" };

const Home = () => {
  return (
    <Layout metadata={metadata}>
      <Flex gap={"4"} direction={"column"} wrap={"nowrap"}>
        <PushToastLayout title="Pray Toast Time" message="Test Body Message">
          {(showToast) => (
            <>
              <button onClick={() => showToast()}>Trigger Toast</button>
            </>
          )}
        </PushToastLayout>
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
        <TimerNotif
          title={"Timer Notification"}
          message={"Timer Test Message In TIME"}
          hours={12}
          minutes={53}
        />
        <TimerNotif
          title={"Timer Notification 2"}
          message={"Timer Test Message without facts"}
          hours={18}
          minutes={18}
        />
        <ThemeButton />

        <LocationBar />

        <PrayerCard prayerName={PRAYER_TIMINGS.FAJR} />
        <PrayerCard prayerName={PRAYER_TIMINGS.DHUHR} />
        <PrayerCard prayerName={PRAYER_TIMINGS.ASR} />
        <PrayerCard prayerName={PRAYER_TIMINGS.MAGHRIB} />
        <PrayerCard prayerName={PRAYER_TIMINGS.ISHA} />
      </Flex>
    </Layout>
  );
};

export default Home;
