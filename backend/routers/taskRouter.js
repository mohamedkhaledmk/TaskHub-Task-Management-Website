const express = require("express");
const taskRouter = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

taskRouter.route("/").get(protect, getTasks).post(protect, createTask);
taskRouter.route("/:id").get(getTask).put(updateTask);

taskRouter.route("/:userId").delete(protect, deleteTask);
module.exports = taskRouter;
