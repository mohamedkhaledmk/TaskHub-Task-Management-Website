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

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, users } = req.body;
    createdAt = new Date();
    // Create new task document
    const task = await Task.create({
      title,
      description,
      completed: false,
      dueDate,
      users,
      admin: req.user._id,
      createdAt,
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

const updateTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

const getTask = async (req, res) => {};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
