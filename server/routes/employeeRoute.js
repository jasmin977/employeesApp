const { verifyEmployee } = require("../middlewares/authMiddleware");
const User = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const router = require("express").Router();

const schema = joi.object({
  matricul: joi.string().alphanum().length(10).required(),
  password: joi.string().required(),
});

router.post("/", verifyEmployee, async (req, res) => {
  // TODO: update user status from "absent" => "present"

  // console.log(req.user.dataValues.id);
  const { id } = req.user.dataValues;

  const employee = await User.findByPk(id);
  if (!employee)
    return res
      .status(404)
      .json({ message: "employee not found", status: false });

  await employee.update(
    {
      status: "present",
    },
    {
      where: { id },
    }
  );
  const checkedIN = await employee.save();

  res.json(checkedIN);
  // TODO: create "pointage" row if the user presence status have changed
  // TODO: refresh user counter

  res.send("Employee check-in 🙄");
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
