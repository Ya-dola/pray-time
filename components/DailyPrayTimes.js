import { useEffect } from "react";
import { initAdhanData, updatePrayTimesForDay } from "@/utils/adhanApi";
import { getCity, getCountry, getUpdateRate } from "@/utils/cookieUtils";

const DailyPrayTimes = () => {
  useEffect(() => {
    // TODO - Change to be set from Location Bar
    initAdhanData(getCity() || "Colombo", getCountry() || "LK");

    const updatePrayTimesIntvl = setInterval(
      () => {
        updatePrayTimesForDay();
      },
      getUpdateRate() * 60 * 1000,
    );

    // Clear the interval when the component unmounts
    // noinspection JSCheckFunctionSignatures
    return () => clearInterval(updatePrayTimesIntvl);
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return null; // This component doesn't render anything to the DOM
};

export default DailyPrayTimes;
