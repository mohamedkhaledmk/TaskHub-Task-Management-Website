const express = require("express");
const taskRouter = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  deleteAllTasks,
  deleteCompletedTasks,
} = require("../controllers/taskController");

taskRouter.route("/").get(protect, getTasks).post(protect, createTask);
taskRouter
  .route("/:id")
  .get(getTask)
  .put(updateTask)
  .patch(updateTaskStatus)
  .delete(deleteTask);
taskRouter.route("/deleteAll").delete(deleteAllTasks);
taskRouter.route("/deleteCompleted").delete(deleteCompletedTasks);

module.exports = taskRouter;
