const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully 💚💚");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
  }
};

module.exports = dbConnect;
