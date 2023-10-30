import { useEffect } from "react";
import { fetchAdhanData } from "@/utils/adhanApi";
import DailyPrayTimesUpdater from "@/components/DailyPrayTimesUpdater";

const DailyPrayTimes = () => {
  useEffect(() => {
    fetchAdhanData().then(() => {
      console.log("Fetched Adhan Data - Initial Load");
    });

    // TODO - If No cookies for city and country, open Settings Tab with a Callout
  }, []);

  return <DailyPrayTimesUpdater />;
};

export default DailyPrayTimes;
