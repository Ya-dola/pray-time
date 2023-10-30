import { Avatar, Card, Code, Flex, Heading } from "@radix-ui/themes";
import { getPrayerTiming } from "@/utils/adhanApi";
import { CheckCircledIcon, CircleBackslashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PrayerCard = ({ prayerName }) => {
  const adhanData = useSelector((state) => state.adhanData);

  const [prayerTimes, setPrayerTimes] = useState(null);

  useEffect(() => {
    setPrayerTimes(getPrayerTiming(prayerName, adhanData));
  }, [prayerName, adhanData]);

  if (!prayerTimes) return null;

  const iconsSize = 36;

  return (
    <Card asChild>
      <button>
        <Flex gap={"4"} align={"center"} justify={"center"}>
          <Avatar fallback={"ICON"} size={"6"} />
          <Heading as={"h3"} weight={"medium"}>
            {prayerName}
          </Heading>
          <Code weight={"medium"} size={"4"}>
            <>
              {prayerTimes.hr.toString().padStart(2, "0")}:
              {prayerTimes.min.toString().padStart(2, "0")}
            </>
          </Code>
          <CircleBackslashIcon
            color={"crimson"}
            width={iconsSize}
            height={iconsSize}
          />
          <CheckCircledIcon
            color={"teal"}
            width={iconsSize}
            height={iconsSize}
          />
        </Flex>
      </button>
    </Card>
  );
};

export default PrayerCard;
