const { minutesToString, stringToMinutes } = require("./format-time");

const getPointagePerUser = (results) => {
  let currentUser = null;
  const pointagePerEmployee = [];
  results.forEach((item) => {
    if (item.userId !== currentUser) {
      currentUser = item.userId;
      pointagePerEmployee.push({
        user: {
          userId: currentUser,
          firstname: item.firstname,
          lastname: item.lastname,
          phone_number: item.phone_number,
          profile_IMG: item.profile_IMG,
        },
        pointage: [],
      });
    }
    pointagePerEmployee[pointagePerEmployee.length - 1].pointage.push(item);
  });
  return pointagePerEmployee;
};

const getTimesheet = (results) => {
  const usersList = [];
  const START_TIME_MIN = 7 * 60;
  const END_TIME_MIN = 24 * 60;
  const pointagePerEmployee = getPointagePerUser(results);

  pointagePerEmployee.forEach((element) => {
    let startInterval = START_TIME_MIN;
    let endInterval = startInterval + 60;
    let currentTime = startInterval;
    let prevStatus = null;
    let thisHour = [];

    const getIntervalStatus = (thisHour, start, end, status) => {
      const COLOR_STATUS = {
        no_status: "gray",
        present: "green",
        absent: "red",
        late: "orange",
      };
      if (Object.keys(COLOR_STATUS).indexOf(status) === -1)
        throw Error("invalid status");
      if (start < end) {
        thisHour.push({
          start: minutesToString(start),
          end: minutesToString(end),
          status: status,
          color: COLOR_STATUS[status],
        });
        prevStatus = status;
        currentTime = end;
      }
    };

    let isNewPoitage = false;
    const isFirstPointage = true;
    usersList.push({ ...element.user, timesheet: [] });
    element.pointage.forEach((item) => {
      let employeeArrival = stringToMinutes(item.arrival);
      let employeeDeparture = stringToMinutes(item.departure);
      let shouldStartTime = stringToMinutes(item.start_time);

      // loop throw hours
      while (employeeDeparture !== currentTime) {
        if (
          isFirstPointage &&
          prevStatus !== "present" &&
          prevStatus !== "absent"
        ) {
          getIntervalStatus(
            thisHour,
            currentTime,
            Math.min(employeeArrival, endInterval, shouldStartTime),
            "no_status"
          );
          getIntervalStatus(
            thisHour,
            currentTime,
            Math.min(employeeArrival, endInterval),
            "late"
          );
        }

        if (isNewPoitage) {
          getIntervalStatus(
            thisHour,
            currentTime,
            Math.min(employeeArrival, endInterval),
            "absent"
          );
          isNewPoitage = currentTime !== employeeArrival;
        } else {
          getIntervalStatus(
            thisHour,
            currentTime,
            Math.min(employeeDeparture, endInterval),
            "present"
          );
          isNewPoitage = currentTime === employeeDeparture;
        }
        if (currentTime % 60 === 0) {
          usersList[usersList.length - 1].timesheet.push(thisHour);
          startInterval = endInterval;
          endInterval = startInterval + 60;
          thisHour = [];
        }
      }
    });
    getIntervalStatus(thisHour, currentTime, endInterval, "no_status");
    usersList[usersList.length - 1].timesheet.push(thisHour);
    while (currentTime !== END_TIME_MIN) {
      thisHour = [];
      startInterval = endInterval;
      endInterval = startInterval + 60;
      getIntervalStatus(thisHour, currentTime, endInterval, "no_status");
      usersList[usersList.length - 1].timesheet.push(thisHour);
    }
  });
  return usersList;
};

module.exports = getTimesheet;
