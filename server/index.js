const path = require("path");

require("express-async-errors");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });

const debug = require("debug")("startup");
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");

const app = express();
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

require("./start/startup")(app, io);
require("./DB/database");
require("./start/websocket")(io);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  debug(`server is running on ${PORT}`);
});
