function formatDate(date) {
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}`;
}

function stringToMinutes(timeString) {
  const hours = parseInt(timeString.substring(0, 2));
  const minutes = parseInt(timeString.substring(3, 5));
  return hours * 60 + minutes;
}
function minutesToString(minutes) {
  minutes = minutes % 1440;
  const hours = ("0" + parseInt(minutes / 60)).slice(-2);
  const min = ("0" + (minutes % 60)).slice(-2);
  return hours + ":" + min;
}

function getPercentage(start, end) {
  const startMin = stringToMinutes(start);
  const endMin = stringToMinutes(end);
  return ((endMin - startMin) * 100) / 60;
}

export { formatDate, stringToMinutes, minutesToString, getPercentage };