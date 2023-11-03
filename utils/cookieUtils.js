import Cookies from "js-cookie";
import { NOTIF_FREQS } from "@/utils/timeUtils";

const COOKIENUM = {
  API_RESULTS_DATE: "api_results_date",
  CITY: "city",
  COUNTRY_CODE: "country_code",
  METHOD: "method",
  NOTIF_FREQ: "notif_freq",
  NOTIFY_LAST_THIRD: "notify_last_third",
  SHOW_LAST_THIRD: "show_last_third",
  SHOW_SUNRISE: "show_sunrise",
  UPDATE_RATE: "update_rate",
  PRAYED_FAJR: "prayed_fajr",
  PRAYED_DHUHR: "prayed_dhuhr",
  PRAYED_ASR: "prayed_asr",
  PRAYED_MAGHRIB: "prayed_maghrib",
  PRAYED_ISHA: "prayed_isha",
  PRAYED_LAST_THIRD: "prayed_last_third",
};

const expiryTime = 90;

export const setApiResultsDate = async (value) =>
  Cookies.set(COOKIENUM.API_RESULTS_DATE, sanitizeDate(value), {
    expires: expiryTime,
  });
export const getApiResultsDate = () => {
  const input = Cookies.get(COOKIENUM.API_RESULTS_DATE);
  return sanitizeDate(input) || "";
};

export const setCity = async (value) =>
  Cookies.set(COOKIENUM.CITY, sanitizeString(value), {
    expires: expiryTime,
  });
export const getCity = () => {
  const input = Cookies.get(COOKIENUM.CITY);
  return sanitizeString(input) || null;
};

export const setCountryCode = async (value) =>
  Cookies.set(COOKIENUM.COUNTRY_CODE, sanitizeString(value), {
    expires: expiryTime,
  });
export const getCountryCode = () => {
  const input = Cookies.get(COOKIENUM.COUNTRY_CODE);
  return sanitizeString(input) || null;
};

export const setMethod = async (value) =>
  Cookies.set(COOKIENUM.METHOD, value, { expires: expiryTime });
export const getMethod = () => {
  const input = Cookies.get(COOKIENUM.METHOD);
  return parseInt(sanitizeString(input)) || 3;
};

export const setNotifFreq = (value) => {
  Cookies.set(COOKIENUM.NOTIF_FREQ, sanitizeString(value), {
    expires: expiryTime,
  });
};
export const getNotifFreq = () => {
  const input = Cookies.get(COOKIENUM.NOTIF_FREQ);
  return sanitizeString(input) || NOTIF_FREQS.THREE;
};

export const setNotifyLastThird = (value) => {
  Cookies.set(COOKIENUM.NOTIFY_LAST_THIRD, value, { expires: expiryTime });
};
export const getNotifyLastThird = () => {
  const input = Cookies.get(COOKIENUM.NOTIFY_LAST_THIRD);
  return sanitizeString(input) === "true";
};

export const setShowLastThird = (value) => {
  Cookies.set(COOKIENUM.SHOW_LAST_THIRD, value, { expires: expiryTime });
  Cookies.set(COOKIENUM.NOTIFY_LAST_THIRD, value, { expires: expiryTime });
};
export const getShowLastThird = () => {
  const input = Cookies.get(COOKIENUM.SHOW_LAST_THIRD);
  return sanitizeString(input) === "true";
};

export const setShowSunrise = (value) => {
  Cookies.set(COOKIENUM.SHOW_SUNRISE, value, { expires: expiryTime });
};
export const getShowSunrise = () => {
  const input = Cookies.get(COOKIENUM.SHOW_SUNRISE);
  return sanitizeString(input) === "true";
};

export const setUpdateRate = async (value) =>
  Cookies.set(COOKIENUM.UPDATE_RATE, value, { expires: expiryTime });
export const getUpdateRate = () => {
  const input = Cookies.get(COOKIENUM.UPDATE_RATE);
  return parseFloat(sanitizeString(input)) || 15;
};

export const setPrayedFajr = (value) => {
  Cookies.set(COOKIENUM.PRAYED_FAJR, value, { expires: expiryTime });
};
export const getPrayedFajr = () => {
  const input = Cookies.get(COOKIENUM.PRAYED_FAJR);
  return sanitizeString(input) === "true";
};

export const setPrayedDhuhr = (value) => {
  Cookies.set(COOKIENUM.PRAYED_DHUHR, value, { expires: expiryTime });
};
export const getPrayedDhuhr = () => {
  const input = Cookies.get(COOKIENUM.PRAYED_DHUHR);
  return sanitizeString(input) === "true";
};

export const setPrayedAsr = (value) => {
  Cookies.set(COOKIENUM.PRAYED_ASR, value, { expires: expiryTime });
};
export const getPrayedAsr = () => {
  const input = Cookies.get(COOKIENUM.PRAYED_ASR);
  return sanitizeString(input) === "true";
};

export const setPrayedMaghrib = (value) => {
  Cookies.set(COOKIENUM.PRAYED_MAGHRIB, value, { expires: expiryTime });
};
export const getPrayedMaghrib = () => {
  const input = Cookies.get(COOKIENUM.PRAYED_MAGHRIB);
  return sanitizeString(input) === "true";
};

export const setPrayedIsha = (value) => {
  Cookies.set(COOKIENUM.PRAYED_ISHA, value, { expires: expiryTime });
};
export const getPrayedIsha = () => {
  const input = Cookies.get(COOKIENUM.PRAYED_ISHA);
  return sanitizeString(input) === "true";
};

export const setPrayedLastThird = (value) => {
  Cookies.set(COOKIENUM.PRAYED_LAST_THIRD, value, { expires: expiryTime });
};
export const getPrayedLastThird = () => {
  const input = Cookies.get(COOKIENUM.PRAYED_LAST_THIRD);
  return sanitizeString(input) === "true";
};

const sanitizeString = (input) => {
  if (input === null || input === undefined) return "";
  // Remove special characters and sanitize the input string
  return input.replace(/[^a-zA-Z0-9 ]/g, "").trim();
};

const sanitizeDate = (input) => {
  if (input === null || input === undefined) return "";
  // Remove special characters and sanitize the input string
  return input.replace(/[^a-zA-Z0-9- ]/g, "").trim();
};
