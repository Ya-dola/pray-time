import { useEffect } from "react";
import { initAdhanData, updatePrayTimesForDay } from "@/utils/adhanApi";

const DailyPrayTimes = () => {
  useEffect(() => {
    initAdhanData();

    const updatePrayTimesInt = setInterval(
      () => {
        updatePrayTimesForDay();
      },
      1.5 * 60 * 60 * 1000, // 1.5 hours in milliseconds
    );

    // Clear the interval when the component unmounts
    // noinspection JSCheckFunctionSignatures
    return () => clearInterval(updatePrayTimesInt);
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return null; // This component doesn't render anything to the DOM
};

export default DailyPrayTimes;
