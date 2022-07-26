const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("../routes/authRoutes");
const adminRoute = require("../routes/adminRoute");
const { verifyToken } = require("../middlewares/authMiddleware");

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
  app.use("/api/auth", authRoutes);
  app.use("/api/admin", verifyToken);
  app.use("/api/admin", adminRoute);
};
