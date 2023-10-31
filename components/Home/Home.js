import { Button, Card, Flex, Inset, ScrollArea } from "@radix-ui/themes";
import PushToastLayout from "@/components/PushToastLayout";
import TimerNotif from "@/components/TimerNotif/TimerNotif";
import PrayerCard from "@/components/PrayerCard/PrayerCard";
import { showNotification } from "@/utils/notifications";
import { PRAYER_TIMINGS } from "@/utils/adhanApi";
import styles from "./Home.module.css";
import {
  getNotifyLastThird,
  getShowLastThird,
  getShowSunrise,
} from "@/utils/cookieUtils";

const Home = () => {
  return (
    <Card size={"3"} className={styles.card}>
      <Inset>
        <ScrollArea
          type={"hover"}
          scrollbars={"vertical"}
          size={"2"}
          radius={"full"}
          className={styles.scrollArea}
        >
          <div className={styles.cardLayout}>
            <PushToastLayout
              title="Pray Toast Time"
              message="Test Body Message"
            >
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
            {getShowSunrise() && (
              <PrayerCard
                prayerName={PRAYER_TIMINGS.SUNRISE}
                notifEnabled={false}
              />
            )}
            <PrayerCard prayerName={PRAYER_TIMINGS.DHUHR} />
            <PrayerCard prayerName={PRAYER_TIMINGS.ASR} />
            <PrayerCard prayerName={PRAYER_TIMINGS.MAGHRIB} />
            <PrayerCard prayerName={PRAYER_TIMINGS.ISHA} />
            {getShowLastThird() && (
              <PrayerCard
                prayerName={PRAYER_TIMINGS.LAST_THIRD}
                prayerLabel={"Last Third"}
                notifEnabled={getNotifyLastThird()}
              />
            )}
          </div>
        </ScrollArea>
      </Inset>
    </Card>
  );
};
export default Home;
