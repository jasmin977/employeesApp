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
function minutesToString(minutes, formate) {
  minutes = minutes % 1440;
  const hours = parseInt(minutes / 60);
  const min = minutes % 60;
  if (formate === "standard") {
    let msg = "";
    msg += hours ? hours + "h" : "";
    msg += min ? min + (hours ? "" : "min") : "";
    return msg;
  } else return ("0" + hours).slice(-2) + ":" + ("0" + min).slice(-2);
}

function getPercentage(start, end) {
  const startMin = stringToMinutes(start);
  const endMin = stringToMinutes(end);
  return ((endMin - startMin) * 100) / 60;
}

export { formatDate, stringToMinutes, minutesToString, getPercentage };
