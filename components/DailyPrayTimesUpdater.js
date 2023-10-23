import { useEffect } from "react";
import { updatePrayTimesForDay } from "@/utils/adhanApi";
import { getUpdateRate } from "@/utils/cookieUtils";
import { useSelector } from "react-redux";

const DailyPrayTimesUpdater = () => {
  const adhanData = useSelector((state) => state.adhanData);

  useEffect(() => {
    const updatePrayTimesIntvl = setInterval(
      () => {
        updatePrayTimesForDay(adhanData);
      },
      getUpdateRate() * 60 * 1000,
    );

    // Clear the interval when the component unmounts
    // noinspection JSCheckFunctionSignatures
    return () => clearInterval(updatePrayTimesIntvl);
  }, [adhanData]);

  return null; // This component doesn't render anything to the DOM
};

export default DailyPrayTimesUpdater;
