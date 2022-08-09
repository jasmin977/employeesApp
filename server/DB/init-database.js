const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", "config", ".env"),
});
const sequelize = require("./database");
const bcrypt = require("bcrypt");
const debug = require("debug")("initDB");

// uno model :'D
const User = require("../models/Employee");
const Admin = require("../models/Admin");
const Pointage = require("../models/Pointage");
// fake data
const employees = require("../data/employees.json");
const { DataTypes } = require("sequelize");

async function initDB() {
  debug("Creating database");

  User.hasMany(Pointage, {
    onDelete: "CASCADE",
  });
  Pointage.belongsTo(User);

  await sequelize.sync({ force: true }); //delete it if its already exits

  debug("Creating our beloved admin");
  const password = "password";
  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error("Something went wrong with bcrypt");

  const hash = await bcrypt.hash(password, salt);
  if (!hash) throw Error("Something went wrong hashing the password");

  debug("uploading data");
  await Admin.create({
    name: "adminadmin",
    admin: true,
    email: "bayasmin0@gmail.com",
    password: hash, // the hashed password
  });

  for (let i = 0; i < employees.length; i++) {
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");
    const hash = await bcrypt.hash(employees[i].password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");
    employees[i].password = hash;
  }

  await User.bulkCreate(employees);
  debug("dataBase is ready ✅");
}

initDB();
