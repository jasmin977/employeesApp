const { DataTypes } = require("sequelize");
const sequelize = require("../DB/database");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  matricul: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  start_time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  end_time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date_of_birth: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  employee_since: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  holiday: {
    type: DataTypes.INTEGER, // 0=>sunday 1=>monday
    allowNull: false,
    defaultValue: 0,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  profile_IMG: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "defaulIMG",
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "femme",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["present", "absent"],
    default: "absent",
  },
});

module.exports = User;
