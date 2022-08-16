const { DataTypes } = require("sequelize");
const sequelize = require("../DB/database");

const CardTask = sequelize.define("cardTask", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "untitled card",
  },
  createdAT: {
    type: "TIMESTAMP",
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = CardTask;
