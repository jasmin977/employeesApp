const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const MY_SECRET = process.env.MY_SECRET || "bibobibo";

//Middelware function
//that gonna be added to routes
//that wanna be protected
module.exports.verifyToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decodedToken = jwt.verify(token, MY_SECRET);
    console.log(decodedToken);
    if (!decodedToken) {
      res.status(401).json({ status: false });
    } else {
      const admin = await Admin.findOne({ where: { id: decodedToken.id } });
      if (admin) res.json({ status: true, admin: admin.email });
      else res.json({ status: false });
    }
    next(); //to contenue to the next middelware
  } else {
    res.status(401).json({ status: false });
    next();
  }
};
