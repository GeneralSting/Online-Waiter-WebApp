export const getCurrentTime = () => {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    formatMatcher: "basic",
    timeZone: "Europe/Zagreb",
  };
  return now.toLocaleString("en-GB", options);
};

export const getLocaleCurrentTime = (timeZone, timeZoneLocale) => {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    formatMatcher: "basic",
    timeZone: timeZone,
  };
  return now.toLocaleString(timeZoneLocale, options);
}