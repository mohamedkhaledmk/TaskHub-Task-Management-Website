const Task = require("../models/taskSchema");

const getTasks = async (req, res) => {
  try {
    // Assuming req.user contains the authenticated user's ID
    const userId = req.user._id;

    // Find tasks where the user is either part of the 'users' array or the 'admin'
    const tasks = await Task.find({
      $or: [{ users: userId }, { admin: userId }],
    })
      .populate("users", "name email")
      .populate("admin", "name email");

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Get All Tasks Failed :", error.message);
  }
};
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, users } = req.body;
    let important = false;
    req.body.important ? (important = true) : null;
    const createdAt = Date.now();
    console.log({title,description,dueDate,users})
    // Create new task document
    const task = await Task.create({
      title,
      description,
      completed: false,
      dueDate,
      users,
      admin: req.user._id,
      createdAt,
      important,
      updatedAt: createdAt,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateTask = async (req, res) => {
  const updatedTask = req.body;
  console.log(updatedTask);
  try {
    updatedTask.updatedAt = Date.now();
    const newTask = await Task.findByIdAndUpdate(
      { _id: updatedTask._id || req.params.id },
      updatedTask,
      { new: true }
    );
    console.log(newTask);
    console.log("Task is updated Successfuly");
    res.status(200).json({ message: "Task is updated successfully", newTask });
  } catch (error) {
    console.error("Task Update Failed : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "Task is deleted successfully", deletedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: "task not found" });
      return;
    }
    res.status(200).json({ task });
  } catch (error) {
    console.error("Get Task Failed : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getAllTasks,
};
