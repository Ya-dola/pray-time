import { Button, Card, Inset, ScrollArea } from "@radix-ui/themes";
import { PRAYER_TIMINGS } from "@/utils/adhanApi";
import { showNotification } from "@/utils/notifications";
import PushToastLayout from "@/components/PushToastLayout";
import {
  getNotifyLastThird,
  getPrayedAsr,
  getPrayedDhuhr,
  getPrayedFajr,
  getPrayedIsha,
  getPrayedLastThird,
  getPrayedMaghrib,
  getShowLastThird,
  getShowSunrise,
  setPrayedAsr,
  setPrayedDhuhr,
  setPrayedFajr,
  setPrayedIsha,
  setPrayedLastThird,
  setPrayedMaghrib,
} from "@/utils/cookieUtils";
import TimerNotif from "@/components/TimerNotif/TimerNotif";
import PrayerCard from "@/components/PrayerCard/PrayerCard";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <Card size={{ initial: "2", sm: "3" }} className={styles.card}>
      <Inset>
        <ScrollArea
          type={"hover"}
          scrollbars={"vertical"}
          size={"2"}
          radius={"full"}
          className={styles.scrollArea}
        >
          <div className={styles.cardLayout}>
            {/*<PushToastLayout*/}
            {/*  title="Pray Toast Time"*/}
            {/*  message="Test Body Message"*/}
            {/*>*/}
            {/*  {(showToast) => (*/}
            {/*    <Button onClick={() => showToast()}>Trigger Toast</Button>*/}
            {/*  )}*/}
            {/*</PushToastLayout>*/}
            {/*<div>Hello</div>*/}
            {/*<Button*/}
            {/*  onClick={() =>*/}
            {/*    showNotification(*/}
            {/*      "Pray Notif Time",*/}
            {/*      "Are you sure you want to miss your prayer??",*/}
            {/*    )*/}
            {/*  }*/}
            {/*>*/}
            {/*  Trigger Notification*/}
            {/*</Button>*/}

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

            <PrayerCard
              prayerName={PRAYER_TIMINGS.FAJR}
              getPrayerPrayed={getPrayedFajr}
              setPrayerPrayed={setPrayedFajr}
            />
            {getShowSunrise() && (
              <PrayerCard
                prayerName={PRAYER_TIMINGS.SUNRISE}
                notifEnabled={false}
              />
            )}
            <PrayerCard
              prayerName={PRAYER_TIMINGS.DHUHR}
              getPrayerPrayed={getPrayedDhuhr}
              setPrayerPrayed={setPrayedDhuhr}
            />
            <PrayerCard
              prayerName={PRAYER_TIMINGS.ASR}
              getPrayerPrayed={getPrayedAsr}
              setPrayerPrayed={setPrayedAsr}
            />
            <PrayerCard
              prayerName={PRAYER_TIMINGS.MAGHRIB}
              getPrayerPrayed={getPrayedMaghrib}
              setPrayerPrayed={setPrayedMaghrib}
            />
            <PrayerCard
              prayerName={PRAYER_TIMINGS.ISHA}
              getPrayerPrayed={getPrayedIsha}
              setPrayerPrayed={setPrayedIsha}
            />
            {getShowLastThird() && (
              <PrayerCard
                prayerName={PRAYER_TIMINGS.LAST_THIRD}
                prayerLabel={"Last Third"}
                notifEnabled={getNotifyLastThird()} // Brackets coz value is passed
                getPrayerPrayed={getPrayedLastThird}
                setPrayerPrayed={setPrayedLastThird}
              />
            )}
          </div>
        </ScrollArea>
      </Inset>
    </Card>
  );
};
export default Home;
