import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Card, Code, Heading, Text } from "@radix-ui/themes";
import { CheckCircledIcon, CircleBackslashIcon } from "@radix-ui/react-icons";
import { getPrayerTiming } from "@/utils/adhanApi";
import styles from "./PrayerCard.module.css";

const PrayerCard = ({
  prayerName,
  prayerLabel = prayerName,
  notifEnabled = true,
  getPrayerPrayed,
  setPrayerPrayed,
}) => {
  const adhanData = useSelector((state) => state.adhanData);

  const [prayerTimes, setPrayerTimes] = useState(null);
  const [localPrayerPrayed, setLocalPrayerPrayed] = useState(false);

  useEffect(() => {
    setPrayerTimes(getPrayerTiming(prayerName, adhanData));
    setLocalPrayerPrayed(getPrayerPrayed);
  }, [prayerName, adhanData, getPrayerPrayed]);

  if (!prayerTimes) return null;

  const handleClick = () => {
    if (!notifEnabled) return;

    setLocalPrayerPrayed(!localPrayerPrayed);
    setPrayerPrayed(!localPrayerPrayed);
    // TODO - Add Logic to Handle Stopping Notification for this Prayer
  };

  const prayerStatus = () => {
    if (localPrayerPrayed)
      return <CheckCircledIcon color={"teal"} className={styles.toggleIcon} />;
    else
      return (
        <CircleBackslashIcon color={"crimson"} className={styles.toggleIcon} />
      );
  };

  return (
    <div>
      <Card asChild>
        <button onClick={handleClick}>
          <div className={styles.card}>
            <div className={styles.detailsSection}>
              <div className={styles.icon}>
                <Avatar fallback={"ICON"} size={{ initial: "5", sm: "6" }} />
              </div>
              <div className={styles.wording}>
                <Heading
                  as={"h3"}
                  weight={"medium"}
                  trim={"end"}
                  className={styles.wordingHeading}
                >
                  {prayerLabel}
                </Heading>
                <div>
                  <Code weight={"medium"} size={{ initial: "3", sm: "4" }}>
                    <>
                      {prayerTimes.hr.toString().padStart(2, "0")}:
                      {prayerTimes.min.toString().padStart(2, "0")}
                    </>
                  </Code>
                </div>
              </div>
            </div>
            <div>
              {notifEnabled && (
                <div className={styles.toggleSection}>
                  <Text as={"p"} size={"2"} weight={"regular"}>
                    Prayed
                  </Text>
                  {prayerStatus()}
                </div>
              )}
            </div>
          </div>
        </button>
      </Card>
    </div>
  );
};

export default PrayerCard;
