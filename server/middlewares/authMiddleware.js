const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const MY_SECRET = process.env.MY_SECRET;

//Middelware function
//that gonna be added to routes
//that wanna be protected

module.exports.verifyToken = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (token) {
      const decodedToken = jwt.verify(token, MY_SECRET);
      if (!decodedToken) {
        res.status(401).json({ status: false });
      } else {
        const admin = await Admin.findOne({ where: { id: decodedToken.id } });
        if (!admin) return res.json({ status: false });
        req.user = admin;
        next(); //to contenue to the next middelware
      }
    } else {
      res.status(401).json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ status: false });
  }
};