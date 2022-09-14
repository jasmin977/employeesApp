// socket api function
const jwt = require("jsonwebtoken");
const User = require("../models/Employee");
const { updateUserStatus } = require("../utilities/employeeStatusUpdate");

const MY_SECRET = process.env.MY_SECRET;

let userDisconnectAction = [];

module.exports = (io) => {
  io.on("connect", async (socket) => {
    try {
      const { token } = socket.handshake.query;
      const decodedToken = jwt.verify(token, MY_SECRET);
      const employee = await User.findByPk(decodedToken.id);
      const userAction = userDisconnectAction.find((e) => e.id === employee.id);
      if (userAction) {
        clearTimeout(userAction.action);
      } else
        updateUserStatus(employee, "present").then(({ user, pointage }) => {
          socket.emit("USER_STATUS_UPDATE", { user, pointage });
        });
      // if (!employee) {
      //   socket.disconnect(true);
      //   console.log("disconnect");
      // }

      console.log("Connected", socket.id);
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
