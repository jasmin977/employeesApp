export const timeDifference = (current, previous) => {
  var minute = 60 * 1000;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var year = day * 365;

  var timePassed = current - previous;

  if (timePassed < minute) {
    return Math.round(timePassed / 1000) + " seconds ago";
  } else if (timePassed < hour) {
    return Math.round(timePassed / minute) + " minutes ago";
  } else if (timePassed < day) {
    return Math.round(timePassed / hour) + " hours ago";
  } else if (timePassed < month) {
    return Math.round(timePassed / day) + " days ago";
  } else if (timePassed < year) {
    return Math.round(timePassed / month) + " months ago";
  } else {
    return "approximately " + Math.round(timePassed / year) + " years ago";
  }
};
