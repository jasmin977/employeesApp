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
          total: 0,
        },
        pointage: {},
      });
    }
    pointagePerEmployee[pointagePerEmployee.length - 1].pointage[item.date]
      ? pointagePerEmployee[pointagePerEmployee.length - 1].pointage[
          item.date
        ].push(item)
      : (pointagePerEmployee[pointagePerEmployee.length - 1].pointage[
          item.date
        ] = [item]);
  });
  return pointagePerEmployee;
};

const getTimesheet = (results) => {
  const usersList = [];
  const START_TIME_MIN = 7 * 60;
  const END_TIME_MIN = 24 * 60;
  const pointagePerEmployee = getPointagePerUser(results);

  // loop throw employees
  pointagePerEmployee.forEach((element) => {
    usersList.push({ ...element.user, timesheet: {} });

    // loop throw one day pointage
    Object.keys(element.pointage).forEach((day) => {
      const getIntervalStatus = (
        thisHour,
        start,
        end,
        status,
        timesheet_per_day
      ) => {
        if (start < end) {
          thisHour.push({
            start: minutesToString(start),
            end: minutesToString(end),
            status: status,
          });
          prevStatus = status;
          currentTime = end;
          if (status === "present") timesheet_per_day.total += end - start;
        }
      };
      let isNewPoitage = false;
      const isFirstPointage = true;
      let startInterval = START_TIME_MIN;
      let endInterval = startInterval + 60;
      let currentTime = startInterval;
      let prevStatus = null;
      let thisHour = [];
      const timesheet_per_day = { timesheet: [] };
      // loop throw pointage hours of a given day
      element.pointage[day].forEach((item) => {
        let employeeArrival = stringToMinutes(item.arrival);
        let employeeDeparture = stringToMinutes(item.departure);
        let shouldStartTime = stringToMinutes(item.start_time);
        let shouldEndTime = stringToMinutes(item.end_time);

        // loop throw hours
        while (employeeDeparture !== currentTime) {
          if (
            isFirstPointage &&
            prevStatus !== "present" &&
            prevStatus !== "absent"
          ) {
            const deltaTime = employeeArrival - shouldStartTime;
            timesheet_per_day.arrival =
              deltaTime === 0
                ? { status: "On Time", time: deltaTime }
                : deltaTime > 0
                ? { status: "late", time: deltaTime }
                : { status: "early", time: Math.abs(deltaTime) };
            getIntervalStatus(
              thisHour,
              currentTime,
              Math.min(employeeArrival, endInterval, shouldStartTime),
              "no_status"
            );
            getIntervalStatus(
              thisHour,
              currentTime,
              Math.min(endInterval, shouldStartTime),
              "extra"
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
              currentTime > shouldEndTime ? "extra" : "present",
              timesheet_per_day
            );
            isNewPoitage = currentTime === employeeDeparture;
          }
          if (currentTime % 60 === 0) {
            timesheet_per_day.timesheet.push(thisHour);
            startInterval = endInterval;
            endInterval = startInterval + 60;
            thisHour = [];
          }
        }
      });
      getIntervalStatus(thisHour, currentTime, endInterval, "no_status");
      timesheet_per_day.timesheet.push(thisHour);
      while (currentTime !== END_TIME_MIN) {
        thisHour = [];
        startInterval = endInterval;
        endInterval = startInterval + 60;
        getIntervalStatus(thisHour, currentTime, endInterval, "no_status");
        timesheet_per_day.timesheet.push(thisHour);
      }
      timesheet_per_day.total = minutesToString(timesheet_per_day.total);
      usersList[usersList.length - 1].timesheet[day] = timesheet_per_day;
    });
  });
  return usersList;
};

module.exports = getTimesheet;
