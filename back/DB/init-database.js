require("dotenv").config();
const sequelize = require("./database");
const bcrypt = require("bcrypt");
const debug = require("debug")("initDB");

// uno model :'D
const Employee = require("../models/Employee");
const Admin = require("../models/Admin");

// fake data
const employees = require("../data/employees.json");

async function initDB() {
  console.log("Creating database");
  await sequelize.sync({ force: true });//delete it if its already exits

  console.log("Creating our beloved admin");
  const password = "password";
  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error("Something went wrong with bcrypt");

  const hash = await bcrypt.hash(password, salt);
  if (!hash) throw Error("Something went wrong hashing the password");

  console.log("uploading data");
  await Admin.create({
    name: "adminadmin",
    admin: true,
    email: "bayasmin0@gmail.com",
    password: hash, // the hashed password
  });
  await Employee.bulkCreate(employees);
  console.log("dataBase is ready ✅");
}

initDB();
