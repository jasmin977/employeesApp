const path = require("path");
const express = require("express");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
const debug = require("debug")("startup");

const app = express();
require("./start/startup")(app);
require("./DB/database");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  debug(`server is running on ${PORT}`);
});
