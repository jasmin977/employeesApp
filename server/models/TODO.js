const { DataTypes } = require("sequelize");
const sequelize = require("../DB/database");

const TODO = sequelize.define("todo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cardTaskId: {
    type: DataTypes.INTEGER,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAT: {
    type: "TIMESTAMP",
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  cardTaskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = TODO;
