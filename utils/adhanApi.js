import {
  getApiResDate,
  getCity,
  getCountryCode,
  getMethod,
  setApiResDate,
  setCity,
  setCountryCode,
  setMethod,
  setUpdateRate,
} from "@/utils/cookieUtils";
import { getFormattedDate, isTimeBetween } from "@/utils/timeUtils";
import { setAdhanData } from "@/redux/adhanDataSlice";
import { store } from "@/redux/store";

const API_BASE_URL = "http://api.aladhan.com/v1/timingsByCity";

// ENUM for Prayer Timings
export const PRAYER_TIMINGS = {
  FAJR: "Fajr",
  SUNRISE: "Sunrise",
  DHUHR: "Dhuhr",
  ASR: "Asr",
  SUNSET: "Sunset",
  MAGHRIB: "Maghrib",
  ISHA: "Isha",
  IMSAK: "Imsak",
  MIDNIGHT: "Midnight",
  FIRST_THIRD: "Firstthird",
  LAST_THIRD: "Lastthird",
};

export const updateMethod = async (methodParam) => {
  setMethod(methodParam).then(() => fetchAdhanData());
};

export const updateLocation = async (cityParam, countryParam) => {
  setCity(cityParam).then(() =>
    setCountryCode(countryParam).then(() => fetchAdhanData()),
  );
};

export const fetchAdhanData = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${getFormattedDate()}?city=${getCity()}` +
        `&country=${getCountryCode()}&method=${getMethod()}`,
    );

    if (response.ok) {
      const responseData = await response.json();

      // Update API response date and update rate
      await setApiResDate(responseData.data?.date?.gregorian?.date);
      await setUpdateRate(dailyUpdateRate(responseData.data));

      // Dispatch action to update data in Redux store
      store.dispatch(setAdhanData(responseData.data));
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }
};

export const updatePrayTimesForDay = (data) => {
  const lastThirdTime = getPrayerTiming(PRAYER_TIMINGS.LAST_THIRD, data);
  const fajrTime = getPrayerTiming(PRAYER_TIMINGS.FAJR, data);
  const now = new Date();

  if (
    isTimeBetween(
      now.getHours(),
      now.getMinutes(),
      lastThirdTime.hr,
      lastThirdTime.min,
      fajrTime.hr,
      fajrTime.min,
    )
  ) {
    if (getFormattedDate() !== getApiResDate()) fetchAdhanData();
  }
};

// Returns the 1/3rd of the Difference between lastThird and fajr times
const dailyUpdateRate = (data) => {
  const lastThirdTime = getPrayerTiming(PRAYER_TIMINGS.LAST_THIRD, data);
  const fajrTime = getPrayerTiming(PRAYER_TIMINGS.FAJR, data);

  const lastThirdMinutes = lastThirdTime.hr * 60 + lastThirdTime.min;
  const fajrMinutes = fajrTime.hr * 60 + fajrTime.min;

  // Calculate the difference in minutes between lastThird and fajr
  return Math.floor((fajrMinutes - lastThirdMinutes) * 0.3333);
};

export const getPrayerTiming = (timing, data) => {
  const prayerTime = data?.timings[timing]?.split(":") || ["-1", "-1"];
  return {
    hr: parseInt(prayerTime[0], 10),
    min: parseInt(prayerTime[1], 10),
  };
};
