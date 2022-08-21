const {
  minutesToString,
  stringToMinutes,
  incrementDay,
  getFirstDayOfMonth,
  formatDate,
} = require("./format-time");

function formatPointage(data) {
  const pointage = {};
  data.forEach((item) =>
    pointage[item.date]
      ? pointage[item.date].push(item)
      : (pointage[item.date] = [item])
  );
  return pointage;
}

function generateMonthTimesheet(data, month) {
  const pointage = {};
  let date = getFirstDayOfMonth(month);
  let dataPointer = 0;
  while (date.getMonth() !== month) {
    const stringDate = formatDate(date);
    if (dataPointer < data.length && stringDate === data[dataPointer].date) {
      pointage[stringDate]
        ? pointage[stringDate].push(data[dataPointer++])
        : (pointage[stringDate] = [data[dataPointer++]]);
    } else if (!pointage[stringDate]) {
      data[dataPointer] && date.getDay() === data[dataPointer].holiday
        ? (pointage[stringDate] = {
            start: "7:00",
            end: "8:00",
            status: "holiday",
          })
        : (pointage[stringDate] = {
            start: "7:00",
            end: "8:00",
            status: "absent",
          });
      date = incrementDay(date, 1);
    } else date = incrementDay(date, 1);
  }
  return pointage;
}

const getPointagePerUser = (results, month) => {
  let currentUser = null;
  let pointagePerEmployee = [];
  let i = 0;
  while (i < results.length) {
    currentUser = results[i].userId;
    const userPointage = [];
    while (i < results.length && results[i].userId === currentUser) {
      userPointage.push(results[i++]);
    }
    pointagePerEmployee.push({
      user: {
        userId: currentUser,
        firstname: results[i - 1].firstname,
        lastname: results[i - 1].lastname,
        phone_number: results[i - 1].phone_number,
        profile_IMG: results[i - 1].profile_IMG,
        holiday: results[i - 1].holiday,
        total: 0,
      },
      pointage: month
        ? generateMonthTimesheet(userPointage, month)
        : formatPointage(userPointage),
    });
  }
  return pointagePerEmployee;
};

const getTimesheet = (results, month) => {
  const usersList = [];
  const START_TIME_MIN = 7 * 60;
  const END_TIME_MIN = 24 * 60;
  const pointagePerEmployee = getPointagePerUser(results, month);

  // loop throw employees
  pointagePerEmployee.forEach((element) => {
    usersList.push({ ...element.user, timesheet: {} });

    // loop throw one day pointage
    Object.keys(element.pointage).forEach((day) => {
      if (element.pointage[day].status) {
        return (usersList[usersList.length - 1].timesheet[day] = {
          timesheet: [element.pointage[day]],
        });
      }

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
      let shouldEndTime = 0;
      const timesheet_per_day = { timesheet: [] };
      // loop throw pointage hours of a given day
      element.pointage[day].forEach((item) => {
        let employeeArrival = stringToMinutes(item.arrival);
        let employeeDeparture = stringToMinutes(item.departure);
        let shouldStartTime = stringToMinutes(item.start_time);
        shouldEndTime = stringToMinutes(item.end_time);

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
              Math.min(employeeArrival, endInterval, shouldEndTime),
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

      while (currentTime < shouldEndTime) {
        getIntervalStatus(
          thisHour,
          currentTime,
          Math.min(shouldEndTime, endInterval),
          "absent"
        );
        if (currentTime % 60 === 0) {
          timesheet_per_day.timesheet.push(thisHour);
          startInterval = endInterval;
          endInterval = startInterval + 60;
          thisHour = [];
        }
      }
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
