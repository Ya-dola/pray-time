export const getFormattedDate = () => {
  // Get the current date in DD-MM-YYYY format
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Replace slashes with dashes
  return currentDate.replace(/\//g, "-");
};

export const isTimeBetween = (
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
