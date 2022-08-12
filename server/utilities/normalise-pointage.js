const getPointagePerUser = (results) => {
  let currentUser = null;
  const pointagePerEmployee = [];
  results.forEach((item) => {
    if (item.userId !== currentUser) {
      currentUser = item.userId;
      pointagePerEmployee.push({
        user: {
          userId: currentUser,
          firstname: item.firstname,
          lastname: item.lastname,
          phone_number: item.phone_number,
          profile_IMG: item.profile_IMG,
        },
        pointage: [],
      });
    }
    pointagePerEmployee[pointagePerEmployee.length - 1].pointage.push(item);
  });
  return pointagePerEmployee;
};

module.exports = getPointagePerUser;
