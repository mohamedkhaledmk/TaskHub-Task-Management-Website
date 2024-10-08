const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(getUsers);

module.exports = router;
