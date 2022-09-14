const Pointage = require("../models/Pointage");

async function updateUserStatus(user, status) {
  await user.update({
    status,
  });
  await user.save();
  let pointage = null;
  if (status === "present") {
    pointage = await Pointage.create({
      userId: user.id,
    });
  } else {
    const time = new Date();
    const timeString = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    pointage = await Pointage.update(
      { departure: timeString },
      {
        where: {
          userId: user.id,
          departure: null,
        },
      }
    );
  }
  return { user, pointage };
}

module.exports = {
  updateUserStatus,
};
