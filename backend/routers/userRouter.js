const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  addUser,
  removeUser,
} = require("../controllers/userController");

const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(getUsers);
router
  .route("/:taskId")
  .get(getUser)
  .post(protect, addUser)
  .delete(protect, removeUser);
module.exports = router;
