import { sanitizeString } from "@/utils/utilities";

const API_BASE_URL = "http://api.aladhan.com/v1/timingsByCity";

// ENUM for Prayer Timings
const PRAYER_TIMINGS = {
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

let city = sanitizeString(localStorage.getItem("city")) || "Colombo",
  country = sanitizeString(localStorage.getItem("country")) || "LK",
  method = 3,
  data = null;

const updateCalcMethod = (methodParam) => {
  method = methodParam;
  fetchAdhanData();
};

const updateLocation = (cityParam, countryParam) => {
  city = sanitizeString(cityParam);
  country = sanitizeString(countryParam);

  localStorage.setItem("city", city);
  localStorage.setItem("country", country);

  fetchAdhanData();
};

const getFormattedDate = () => {
  // Get the current date in DD-MM-YYYY format
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Replace slashes with dashes
  return currentDate.replace(/\//g, "-");
};

const fetchAdhanData = () => {
  fetch(
    `${API_BASE_URL}/${getFormattedDate()}?city=${city}&country=${country}&method=${method}`,
  )
    .then((response) => response.json())
    .then((responseData) => {
      data = responseData;
      console.log("Data Updated", data);
    })
    .catch((error) => {
      console.error("Error fetching data from API:", error);
    });
};

const updatePrayTimesForDay = () => {
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
    if (getFormattedDate() !== getAdhanApiDate()) fetchAdhanData();
  }
};

const isTimeBetween = (
  currentHour,
  currentMinute,
  startHour,
  startMinute,
  endHour,
  endMinute,
) => {
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const startTimeInMinutes = startHour * 60 + startMinute;
  const endTimeInMinutes = endHour * 60 + endMinute;

  // Check if current time is between start and end time
  return (
    currentTimeInMinutes >= startTimeInMinutes &&
    currentTimeInMinutes <= endTimeInMinutes
  );
};

const getPrayerTiming = (timing) => {
  const prayerTime = data?.timings[timing]?.split(":") || ["-1", "-1"];
  return {
    hr: parseInt(prayerTime[0], 10),
    min: parseInt(prayerTime[1], 10),
  };
};

const getAdhanApiDate = () => data?.date?.gregorian?.date || "";

const initAdhanData = () => {
  if (getFormattedDate() !== getAdhanApiDate()) fetchAdhanData();
};

const getData = () => data;

export {
  getData,
  initAdhanData,
  updateCalcMethod,
  updateLocation,
  updatePrayTimesForDay,
  getPrayerTiming,
  PRAYER_TIMINGS,
};
