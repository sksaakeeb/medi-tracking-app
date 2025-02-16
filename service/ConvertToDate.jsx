import moment from "moment";

export const FormatDate = (timestamp) => {
  return new Date(timestamp).setHours(0, 0, 0, 0);
};

export const formatDateText = (date) => {
  return moment(date).format("ll");
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeString;
};

export const getDatesRange = (startDate, endDate) => {
  const start = moment(new Date(startDate), "DD/MM/YYYY");
  const end = moment(new Date(endDate), "DD/MM/YYYY");
  const dates = [];

  while (start.isSameOrBefore(end)) {
    dates.push(start.format("DD/MM/YYYY"));
    start.add(1, "days");
  }
  return dates;
};
