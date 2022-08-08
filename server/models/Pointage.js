const { DataTypes } = require("sequelize");
const sequelize = require("../DB/database");

const Pointage = sequelize.define("pointage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  arrival: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  departure: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Pointage;
