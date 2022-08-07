const { verifyEmployee } = require("../middlewares/authMiddleware");
const User = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const Pointage = require("../models/Pointage");
const router = require("express").Router();

const schema = joi.object({
  matricul: joi.string().alphanum().length(10).required(),
  password: joi.string().required(),
});

router.get("/", verifyEmployee, async (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", verifyEmployee, async (req, res) => {
  // TODO: update user status from "absent" => "present"

  await req.user.update({
    status: "present",
  });
  const checkedIN = await req.user.save();

  // TODO: create "pointage" row if the user presence status have changed
  console.log(req.user.id);
  await Pointage.create({
    userId: req.user.id,
  });
  // TODO: refresh user counter

  res.json(checkedIN);
});

router.post("/login", async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { matricul, password } = value;

  const employee = await User.findOne({ where: { matricul } });
  if (!employee)
    return res.status(400).json({ error: "employee doesn't exist" });

  const match = await bcrypt.compare(password, employee.password);
  if (!match) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign({ id: employee.id }, process.env.MY_SECRET);
  if (!token) return res.status(500);

  res.status(200).json({ employee: employee.id, status: true, token });
  // res.header("auth-token", token).send(token);
  //when we loged in we send that token to the header
  //yraja3lek paylod fwestou user id eli 3tithoulou
});

module.exports = router;
