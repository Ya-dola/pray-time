import { useEffect } from "react";
import { fetchAdhanData, updateLocation } from "@/utils/adhanApi";
import { useDispatch } from "react-redux";
import DailyPrayTimesUpdater from "@/components/DailyPrayTimesUpdater";
import { getCity, getCountry } from "@/utils/cookieUtils";

const DailyPrayTimes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // fetchAdhanData().then(() => {
    //   console.log("Fetched Adhan Data");
    // });

    // TODO - Change to be set from Location Bar
    updateLocation(getCity() || "Colombo", getCountry() || "LK").then(() => {
      console.log("Updated Location of Adhan Data");
    });
  }, []);

  return <DailyPrayTimesUpdater />;
};

export default DailyPrayTimes;
