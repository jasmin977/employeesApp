const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoutes = require("../routes/authRoutes");
const adminRoute = require("../routes/adminRoute");
const employeeRoute = require("../routes/employeeRoute");
const todoRoutes = require("../routes/todoRoute");
const { verifyToken } = require("../middlewares/authMiddleware");
const { errorHandler } = require("../middlewares/errorHandler");
const bodyParser = require("body-parser");

module.exports = (app, io) => {
  app.use((req, res, next) => {
    req.io = io;
    next();
  });
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

  app.use(cookieParser());
  app.use(express.json());
  app.use(morgan("tiny"));

  // auth middleware
  app.use("/api/admin", verifyToken);

  // routes
  app.use("/api/auth", authRoutes);
  app.use("/api/admin", adminRoute);
  app.use("/api/task", todoRoutes);
  app.use("/api/employee", employeeRoute);

  app.use(errorHandler);
};
