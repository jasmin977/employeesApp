const { verifyEmployee } = require("../middlewares/authMiddleware");
const User = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const Pointage = require("../models/Pointage");
const router = require("express").Router();
const debug = require("debug")("routes:admin");

const schema = joi.object({
  matricul: joi.string().alphanum().length(10).required(),
  password: joi.string().required(),
});

let employesState = [];
const CHECK_TIMEOUT = 1000 * 60;
const CHECK_INTERVAL = 1000;

setInterval(() => {
  // decrement employee counter and delete employee with null or negative counters
  for (let idx = 0; idx < employesState.length; idx++) {
    const item = employesState[idx];
    employesState[idx].counter -= CHECK_INTERVAL;
    // handle if Employee have a negative counter (delete them from the cache, switch their status back to absent
    // and update the pointage departure)
    if (employesState[idx].counter <= 0) {
      employesState = employesState.filter((_, i) => i !== idx);
      User.update(
        { status: "absent" },
        {
          where: {
            id: item.userId,
          },
        }
      );

      const time = new Date();
      const timeString = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

      Pointage.update(
        { departure: timeString },
        {
          where: {
            userId: item.userId,
            departure: null,
          },
        }
      );
    }
  }
  // debug(employesState);
}, CHECK_INTERVAL);

router.get("/", verifyEmployee, async (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", verifyEmployee, async (req, res) => {
  const userId = employesState.findIndex((item) => item.userId === req.user.id);
  if (userId === -1) {
    await req.user.update({
      status: "present",
    });
    await req.user.save();

    // TODO: create "pointage" row if the user presence status have changed
    await Pointage.create({
      userId: req.user.id,
    });
    employesState.push({ userId: req.user.id, counter: CHECK_TIMEOUT });
  } else {
    // TODO: refresh user counter
    employesState[userId].counter = CHECK_TIMEOUT;
  }

  res.json({ message: "you are checked in 😉" });
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
});

module.exports = router;
