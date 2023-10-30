import { useEffect } from "react";
import { useSelector } from "react-redux";
import { updatePrayTimesForDay } from "@/utils/adhanApi";
import { getUpdateRate } from "@/utils/cookieUtils";

const DailyPrayTimesUpdater = () => {
  const adhanData = useSelector((state) => state.adhanData);

  useEffect(() => {
    const updatePrayTimesIntvl = setInterval(
      () => {
        updatePrayTimesForDay(adhanData);
        // TODO - ADD Daily Reset things here
      },
      getUpdateRate() * 60 * 1000,
    );

    console.log("Daily Prayer Time Updater - Updated");

    // Clear the interval when the component unmounts
    // noinspection JSCheckFunctionSignatures
    return () => clearInterval(updatePrayTimesIntvl);
  }, [adhanData]);

  return null; // This component doesn't render anything to the DOM
};

export default DailyPrayTimesUpdater;
