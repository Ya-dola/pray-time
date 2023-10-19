import {
  getApiResDate,
  getCity,
  getCountry,
  getMethod,
  setApiResDate,
  setCity,
  setCountry,
  setMethod,
  setUpdateRate,
} from "@/utils/cookieUtils";
import { getFormattedDate, isTimeBetween } from "@/utils/timeUtils";

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

let data = null;

export const updateMethod = async (methodParam) => {
  setMethod(methodParam).then(() => fetchAdhanData());
};

export const updateLocation = async (cityParam, countryParam) => {
  setCity(cityParam).then(() =>
    setCountry(countryParam).then(() => fetchAdhanData()),
  );
};

const fetchAdhanData = async () => {
  await fetch(
    `${API_BASE_URL}/${getFormattedDate()}?city=${getCity()}` +
      `&country=${getCountry()}&method=${getMethod()}`,
  )
    .then((response) => response.json())
    .then((responseData) => {
      data = responseData.data;
      // console.log("Data Fetched:", data);

      setApiResDate(data?.date?.gregorian?.date);
      setUpdateRate(dailyUpdateRate());
    })
    .catch((error) => {
      console.error("Error fetching data from API:", error);
    });
};

export const updatePrayTimesForDay = () => {
  const lastThirdTime = getPrayerTiming(PRAYER_TIMINGS.LAST_THIRD);
  const fajrTime = getPrayerTiming(PRAYER_TIMINGS.FAJR);
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
const dailyUpdateRate = () => {
  const lastThirdTime = getPrayerTiming(PRAYER_TIMINGS.LAST_THIRD);
  const fajrTime = getPrayerTiming(PRAYER_TIMINGS.FAJR);

  const lastThirdMinutes = lastThirdTime.hr * 60 + lastThirdTime.min;
  const fajrMinutes = fajrTime.hr * 60 + fajrTime.min;

  // Calculate the difference in minutes between lastThird and fajr
  return Math.floor((fajrMinutes - lastThirdMinutes) * 0.3333);
};

export const getPrayerTiming = (timing) => {
  const prayerTime = data?.timings[timing]?.split(":") || ["-1", "-1"];
  return {
    hr: parseInt(prayerTime[0], 10),
    min: parseInt(prayerTime[1], 10),
  };
};

export const initAdhanData = (cityParam, countryParam) => {
  // if (getFormattedDate() !== getApiResDate()) {
  updateLocation(cityParam, countryParam);
  // }
};

export const getData = () => data;
