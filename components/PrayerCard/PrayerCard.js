import { Avatar, Card, Code, Flex, Heading, Text } from "@radix-ui/themes";
import { getPrayerTiming } from "@/utils/adhanApi";
import { CheckCircledIcon, CircleBackslashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const PrayerCard = ({ prayerName }) => {
  const [prayerTimes, setPrayerTimes] = useState(null);

  // Mount is for Hydration Checks for theme to work properly
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPrayerTimes(getPrayerTiming(prayerName));

    setMounted(true);
  }, [prayerName]);

  if (!mounted) return null;

  const iconsSize = "36";

  return (
    <Card asChild>
      <button>
        <Flex gap={"4"} align={"center"} justify={"center"}>
          <Avatar fallback={"ICON"} size={"5"} />
          <Heading as={"h3"} weight={"medium"}>
            {prayerName}
          </Heading>
          <Code weight={"medium"} size={"4"}>
            <>
              {prayerTimes.hr}:{prayerTimes.min}
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
