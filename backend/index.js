const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const taskRouter = require("./routers/taskRouter");
const userRouter = require("./routers/userRouter");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // If you need cookies/authentication
  })
);
app.use(morgan("dev"));
dotenv.config();
const dbConnect = require("./config/dbConnect");

dbConnect();
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.get("/test", (req, res) => {
  res.send("Testing server");
});
app.get(`/`, (req, res) => {
  res.send("Hello world");
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port : http://localhost:${port}/`);
});
