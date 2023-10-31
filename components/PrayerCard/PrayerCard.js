import { Avatar, Card, Code, Flex, Heading } from "@radix-ui/themes";
import { getPrayerTiming } from "@/utils/adhanApi";
import { CheckCircledIcon, CircleBackslashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

  const iconsSize = 36;

  const handleClick = () => {
    if (!notifEnabled) return;

    setLocalPrayerPrayed(!localPrayerPrayed);
    setPrayerPrayed(!localPrayerPrayed);
    // TODO - Add Logic to Handle Stopping Notification for this Prayer
  };

  const prayerStatus = () => {
    if (localPrayerPrayed)
      return (
        <CheckCircledIcon color={"teal"} width={iconsSize} height={iconsSize} />
      );
    else
      return (
        <CircleBackslashIcon
          color={"crimson"}
          width={iconsSize}
          height={iconsSize}
        />
      );
  };

  return (
    <Card asChild>
      <button onClick={handleClick}>
        <Flex gap={"4"} align={"center"} justify={"center"}>
          <Avatar fallback={"ICON"} size={"6"} />
          <Heading as={"h3"} weight={"medium"}>
            {prayerLabel}
          </Heading>
          <Code weight={"medium"} size={"4"}>
            <>
              {prayerTimes.hr.toString().padStart(2, "0")}:
              {prayerTimes.min.toString().padStart(2, "0")}
            </>
          </Code>
          {notifEnabled && prayerStatus()}
        </Flex>
      </button>
    </Card>
  );
};

export default PrayerCard;
