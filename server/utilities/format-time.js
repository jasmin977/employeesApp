function formatNumber(number, fix = 2) {
  return ("0".repeat(fix) + number).slice(-fix);
}

function formatDate(date, month) {
  if (month) return `${date.getFullYear()}-${formatNumber(month)}-%`;
  else
    return `${date.getFullYear()}-${formatNumber(
      date.getMonth() + 1
    )}-${formatNumber(date.getDate())}`;
}

function getFirstDayOfMonth(month) {
  const year = new Date().getFullYear();
  return new Date(`${year}-${formatNumber(month)}-01`);
}

function incrementDay(date, num_of_days = 1) {
  return new Date(date.setDate(date.getDate() + num_of_days));
}

function stringToMinutes(timeString) {
  const hours = parseInt(timeString.substring(0, 2));
  const minutes = parseInt(timeString.substring(3, 5));
  return hours * 60 + minutes;
}

function minutesToString(minutes) {
  minutes = minutes % 1440;
  const hours = formatNumber(parseInt(minutes / 60));
  const min = formatNumber(minutes % 60);
  return hours + ":" + min;
}

module.exports = {
  formatDate,
  stringToMinutes,
  minutesToString,
  getFirstDayOfMonth,
  incrementDay,
};
