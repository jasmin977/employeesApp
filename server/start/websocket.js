// socket api function
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/Employee");
const { updateUserStatus } = require("../utilities/employeeStatusUpdate");

const MY_SECRET = process.env.MY_SECRET;

let userDisconnectAction = [];
let onlineUsers = [];
let adminSocket;

const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};
const deleteUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getEmployeeData = async (id) => {
  return await User.findByPk(id);
};
module.exports = (io) => {
  io.on("connect", async (socket) => {
    try {
      const { token } = socket.handshake.query;
      const decodedToken = jwt.verify(token, MY_SECRET);
      if (decodedToken.isBibo) {
        console.log("admin connected");
        adminSocket = socket.id;
        socket.emit("TIMESHETT_LAST_UPDATE", adminSocket);
      } else {
        const employee = await User.findByPk(decodedToken.id);
        //employee connecté
        console.log("employee connected");
        const userAction = userDisconnectAction.find(
          (e) => e.id === employee.id
        );
        if (userAction) {
          clearTimeout(userAction.action);
        } else
          updateUserStatus(employee, "present").then(({ user, pointage }) => {
            socket.emit("USER_STATUS_UPDATE", { user, pointage });
          });
        //admin connecté
      }

      socket.on("disconnect", () => {
        console.log("disconnect ", socket.id);
        const timeOutId = setTimeout(() => {
          userDisconnectAction = userDisconnectAction.filter(
            (a) => a.id !== employee.id
          );
          updateUserStatus(employee, "absent").then(({ user }) => {
            console.log(`${user.id} is out`);
          });
        }, 1000 * 5);
        userDisconnectAction.push({ id: employee.id, action: timeOutId });
      });
    } catch (error) {
      console.log(error);
    }
  });
};
