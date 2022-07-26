const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("../routes/authRoutes");

module.exports = (app) => {
  // app.use(
  //     cors({
  //       origin: ["http://localhost:3000"],
  //       methods: ["GET", "POST"],
  //       credentials: true,
  //     })
  //   );
  app.use(cookieParser());
  app.use(express.json());
  app.use("/api/admin", authRoutes);
};
