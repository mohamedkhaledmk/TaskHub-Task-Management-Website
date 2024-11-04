const User = require("../models/userSchema");
const generateToken = require("../utils/generateToken");
const Task = require("../models/taskSchema");
const bcrypt = require("bcryptjs");

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Register failed :", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Authenticate a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user, password);

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Failed : ", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get users data
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user data
const getUser = async (req, res) => {
  const id = req.params.id || req.body._id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
// add user
const addUser = async (req, res) => {
  // Add users to a task (Only admin can add users)
  try {
    const { taskId } = req.params; // Task ID from URL
    const { users } = req.body; // Array of user IDs to add (from the request body)
    console.log(taskId, users, "ssss");
    // Find the task by its ID
    const task = await Task.findById(taskId);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the logged-in user is the admin of the task
    if (task.admin.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the admin can add users to this task" });
    }

    // Check if the users array exists and has valid user IDs
    if (!users || !Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: "Please provide valid user IDs" });
    }

    // Verify that the users being added exist in the database
    const validUsers = await User.find({ _id: { $in: users } });
    if (validUsers.length !== users.length) {
      return res
        .status(400)
        .json({ message: "One or more user IDs are invalid" });
    }
    // Add new users to the task (only if they are not already added)
    users.forEach((userId) => {
      if (!task.users.includes(userId)) {
        task.users.push(userId); // Add user if not already present
      }
    });

    // Save the updated task
    await task.save();

    res.status(200).json({ message: "Users added to task successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// remove user from task
const removeUser = async (req, res) => {
  // Remove users from a task (Only admin can remove users)
  try {
    const { taskId } = req.params; // Task ID from URL
    const { user } = req.body; // Array of user IDs to remove (from the request body)

    // Find the task by its ID
    const task = await Task.findById(taskId);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the logged-in user is the admin of the task
    if (task.admin.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the admin can remove users from this task" });
    }

    // Check if the user array exists and has valid user IDs
    if (!user || !Array.isArray(user) || user.length === 0) {
      return res.status(400).json({ message: "Please provide valid user IDs" });
    }

    // Verify that the users being removed exist in the database
    const validUsers = await User.find({ _id: { $in: user } });
    if (validUsers.length !== user.length) {
      return res
        .status(400)
        .json({ message: "One or more user IDs are invalid" });
    }

    // Remove users from the task
    user.forEach((userId) => {
      const index = task.users.indexOf(userId);
      if (index !== -1) {
        task.users.splice(index, 1); // Remove user if present
      }
    });

    // Save the updated task
    await task.save();

    res
      .status(200)
      .json({ message: "Users removed from task successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteUser = async (req, res) => {
  console.log("first");
  const { taskId } = req.params;
  console.log("sssss", taskId);
  const user = await User.findById(taskId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  await User.findByIdAndDelete(taskId);
  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  addUser,
  removeUser,
  deleteUser,
};
