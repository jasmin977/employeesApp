const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const MY_SECRET = process.env.MY_SECRET || "bibobibo";

module.exports.login = async (req, res) => {
  const { name, password } = req.body;

  const admin = await Admin.findOne({ where: { name: name } });
  if (!admin) return res.status(400).json({ error: "user doesn't exist" });

  const match = await bycrypt.compare(password, admin.password);
  if (!match)
    return res
      .status(400)
      .json({ error: "Wrong name and password doesnt match" });

  //creat and assign a token

  const token = jwt.sign({ id: admin.id }, MY_SECRET);
  if (!token) return res.status(400).json({ error: "token not signed" });

  res
    .status(200)
    .cookie("token", token, { httpOnly: false })
    .json({ admin: admin.id, status: true });
  // res.header("auth-token", token).send(token);
  //when we loged in we send that token to the header
  //yraja3lek paylod fwestou user id eli 3tithoulou
};
