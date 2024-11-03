const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  addUser,
  removeUser,
  updateTask,
  deleteUser,
} = require("../controllers/userController");

const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/:taskId").post(protect, addUser).delete(protect, deleteUser);
module.exports = router;
