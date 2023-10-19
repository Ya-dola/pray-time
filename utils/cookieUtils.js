import Cookies from "js-cookie";

const COOKIENUM = {
  API_RESULTS_DATE: "api_results_date",
  CITY: "city",
  COUNTRY: "country",
  METHOD: "3",
  UPDATE_RATE: "update_rate",
};

export const setCity = async (value) =>
  Cookies.set(COOKIENUM.CITY, value, { expires: 90 });
export const getCity = () => {
  const input = Cookies.get(COOKIENUM.CITY);
  return sanitizeString(input) || null;
};

export const setCountry = async (value) =>
  Cookies.set(COOKIENUM.COUNTRY, value, { expires: 90 });
export const getCountry = () => {
  const input = Cookies.get(COOKIENUM.COUNTRY);
  return sanitizeString(input) || null;
};

export const setMethod = async (value) =>
  Cookies.set(COOKIENUM.METHOD, value, { expires: 90 });
export const getMethod = () => {
  const input = Cookies.get(COOKIENUM.METHOD);
  return parseInt(sanitizeString(input)) || 3;
};

export const setApiResDate = async (value) =>
  Cookies.set(COOKIENUM.API_RESULTS_DATE, value, { expires: 90 });
export const getApiResDate = () => {
  const input = Cookies.get(COOKIENUM.API_RESULTS_DATE);
  return sanitizeDate(input) || "";
};

export const setUpdateRate = async (value) =>
  Cookies.set(COOKIENUM.UPDATE_RATE, value, { expires: 90 });
export const getUpdateRate = () => {
  const input = Cookies.get(COOKIENUM.UPDATE_RATE);
  return parseFloat(sanitizeString(input)) || 15;
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
