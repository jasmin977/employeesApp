const { login } = require("../controllers/authControllers");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/verify", verifyToken, (req, res) => {
  return res.json({ status: true });
});
router.post("/login", login);

module.exports = router;
