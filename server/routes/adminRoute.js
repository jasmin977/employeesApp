const User = require("../models/Employee");
const { formatPerMonth } = require("../utilities/format-time");
const route = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const sequelize = require("../DB/database");

const getTimesheet = require("../utilities/normalise-pointage");

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

// @route GET /api/admin/timesheet
// @desc get timesheet for every employee
// @access Admin
route.get("/timesheet", async (req, res) => {
  const { id } = req.query;
  const month = formatPerMonth(new Date());
  let results = null;
  if (id)
    [results] = await sequelize.query(
      `select userId,arrival, departure, date, 
  firstname, lastname, phone_number, profile_IMG, start_time, end_time  
  from pointages as p, users as u 
  where date like ? and userId = u.id and userId = ?  order by date `,
      {
        replacements: [month, id],
      }
    );
  else
    [results] = await sequelize.query(`select userId,arrival, departure, date, 
  firstname, lastname, phone_number, profile_IMG, start_time, end_time  
  from pointages as p, users as u 
  where date="2022-08-08" and userId = u.id order by userId`);

  const usersList = getTimesheet(results);

  res.send(usersList);
});

module.exports = route;
