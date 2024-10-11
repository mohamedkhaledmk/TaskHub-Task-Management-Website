const express = require("express");
const taskRouter = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getAllTasks,
} = require("../controllers/taskController");
taskRouter.get('/allTasks',getAllTasks);
taskRouter.route("/").get(protect, getTasks).post(protect, createTask);
taskRouter.route("/:id").get(protect,getTask).put(protect,updateTask).delete(protect,deleteTask);

module.exports = taskRouter;
