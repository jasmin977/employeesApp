const User = require("../models/Employee");

const route = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const Pointage = require("../models/Pointage");
const sequelize = require("../DB/database");
const {
  minutesToString,
  stringToMinutes,
  formatDate,
} = require("../utilities/format-time");
const getPointagePerUser = require("../utilities/normalise-pointage");

const schema = Joi.object({
  lastname: Joi.string().min(3).max(30).required(),
  firstname: Joi.string().min(3).max(30).required(),
  matricul: Joi.string().alphanum().length(10).required(),
  phone_number: Joi.number().required(),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
  date_of_birth: Joi.string().required(),
  employee_since: Joi.string().required(),
  holiday: Joi.number().required(),
  city: Joi.string().required(),
  profile_IMG: Joi.string().required(),
  gender: Joi.string().required(),
  password: Joi.string().required(),
});

const debug = require("debug")("routes:admin");

route.get("/", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    const employees = await User.findAll({});
    return res.json(employees);
  } else {
    const employee = await User.findByPk(id);
    if (!employee)
      return res
        .status(404)
        .json({ message: "employee not found", status: false });
    return res.json(employee);
  }
});

route.post("/", async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error("Something went wrong with bcrypt");

  const hash = await bcrypt.hash(value.password, salt);
  if (!hash) throw Error("Something went wrong hashing the password");

  const user = await User.create({
    ...value,
    password: hash,
  });

  if (!user) return res.json({ message: "insert went wrong" });

  res.json(user);
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "invalid id" });

  const employee = await User.findByPk(id);
  if (!employee)
    return res
      .status(404)
      .json({ message: "employee not found", status: false });

  const { error, value } = schema.validate(req.body);
  delete value.password;
  if (error) return res.status(400).json({ message: error.details[0].message });

  await employee.update(value);
  const updatedEmployee = await employee.save();

  res.json(updatedEmployee);
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "invalid id" });

  const count = await User.destroy({ where: { id: id } });

  if (!count)
    return res.status(500).json({ message: "error deleting employee" });
  return res.status(200).json({ message: "employee deleted succesfully" });
});

// @route GET /api/admi/timesheet
// @desc get timesheet for every employee
// @access Admin
route.get("/timesheet", async (req, res) => {
  const [results] =
    await sequelize.query(`select userId,arrival, departure, date, 
  firstname, lastname, phone_number, profile_IMG, start_time, end_time  
  from pointages as p, users as u 
  where date="2022-08-08" and userId = u.id order by userId`);

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

  res.send(usersList);
});

module.exports = route;
