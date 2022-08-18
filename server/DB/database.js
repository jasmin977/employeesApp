const debug = require("debug")("connectDB"); // DEBUG=connectDB
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "wselt",
  "root",
  "password",
  // process.env.DB_NAME,
  // process.env.DB_USERNAME,
  // process.env.DB_PSW,
  {
    dialect: "mysql", // the db ure connected to
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    define: {
      timestamps: false,
    },
  }
);

sequelize.authenticate().then((err) => {
  if (err) debug("error connecting to database", error);
  else debug("connection successful");
});

module.exports = sequelize;
