const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", "config", ".env"),
});
const sequelize = require("./database");
const bcrypt = require("bcrypt");
const debug = require("debug")("initDB");

// uno model :'D
const Employee = require("../models/Employee");
const Admin = require("../models/Admin");
const Pointage = require("../models/Pointage");
const TODO = require("../models/TODO");
const CardTask = require("../models/CardTASK");
// fake data
const employees = require("../data/employees.json");
const todo = require("../data/todo.json");
const cards = require("../data/cards.json");
async function initDB() {
  debug("Creating database");

  Employee.hasMany(Pointage, {
    onDelete: "CASCADE",
  });
  Pointage.belongsTo(Employee);

  CardTask.hasMany(TODO);
  CardTask.hasMany(TODO, {
    onDelete: "CASCADE",
  });
  TODO.belongsTo(CardTask);

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
  await CardTask.bulkCreate(cards);
  await Employee.bulkCreate(employees);

  await TODO.bulkCreate(todo);

  // TODO: to be deleted
  await Pointage.bulkCreate(require("../data/tempPointage.json"));

  debug("dataBase is ready ✅");
}

initDB();
