import { Button, Card, Flex } from "@radix-ui/themes";
import PushToastLayout from "@/components/PushToastLayout";
import TimerNotif from "@/components/TimerNotif/TimerNotif";
import PrayerCard from "@/components/PrayerCard/PrayerCard";
import { showNotification } from "@/utils/notifications";
import { PRAYER_TIMINGS } from "@/utils/adhanApi";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <Card size={"3"} className={styles.card}>
      <div className={styles.cardLayout}>
        <PushToastLayout title="Pray Toast Time" message="Test Body Message">
          {(showToast) => (
            <Button onClick={() => showToast()}>Trigger Toast</Button>
          )}
        </PushToastLayout>
        <div>Hello</div>
        <Button
          onClick={() =>
            showNotification(
              "Pray Notif Time",
              "Are you sure you want to miss your prayer??",
            )
          }
        >
          Trigger Notification
        </Button>

        <TimerNotif
          title={"Timer Notification"}
          message={"Timer Test Message In TIME"}
          hours={12}
          minutes={53}
        />
        <TimerNotif
          title={"Timer Notification 2"}
          message={"Timer Test Message without facts"}
          hours={16}
          minutes={4}
        />

        <PrayerCard prayerName={PRAYER_TIMINGS.FAJR} />
        <PrayerCard prayerName={PRAYER_TIMINGS.DHUHR} />
        <PrayerCard prayerName={PRAYER_TIMINGS.ASR} />
        <PrayerCard prayerName={PRAYER_TIMINGS.MAGHRIB} />
        <PrayerCard prayerName={PRAYER_TIMINGS.ISHA} />
      </div>
    </Card>
  );
};
export default Home;
