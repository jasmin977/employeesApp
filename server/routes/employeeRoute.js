const { verifyEmployee } = require("../middlewares/authMiddleware");
const User = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const Pointage = require("../models/Pointage");
const router = require("express").Router();
const debug = require("debug")("routes:admin");
const { formatDate } = require("../utilities/format-time");
const sequelize = require("../DB/database");
const { updateUserStatus } = require("../utilities/employeeStatusUpdate");

const schema = joi.object({
  matricul: joi.string().alphanum().length(10).required(),
  password: joi.string().required(),
});

let employesState = [];
const CHECK_TIMEOUT = 1000 * 60;
const CHECK_INTERVAL = 1000;

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

  res.status(200).json({
    employee: employee.id,
    status: true,
    token,
    employeeInfo: employee,
  });
});
router.get("/", verifyEmployee, async (req, res) => {
  res.status(200).json(req.user);
});

router.get("/clocking", verifyEmployee, async (req, res) => {
  const [results] = await sequelize.query(
    ` select id,arrival,departure,date
        from pointages
        where date like ? and userId = ? order by arrival `,
    {
      replacements: [formatDate(new Date()), req.user.id],
    }
  );
  res.status(200).json(results);
});

/*
 * @route POST /api/employee
 * @desc employee manuel cloking (via button)
 * @access employee
 */

router.post("/", verifyEmployee, async (req, res) => {
  const { user, pointage } = await updateUserStatus(req.user, "present");
  res.status(200).json({ user, pointage });
});

module.exports = router;
