const { login } = require("../controllers/authControllers");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/login", login);

module.exports = router;
