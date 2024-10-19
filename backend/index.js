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
dotenv.config();
const dbConnect = require("./config/dbConnect");

// CORS configuration
const allowedOrigins = [
  "https://taskhub-task-management-app-xmidos25256gmailcoms-projects.vercel.app",
]; // Add your frontend URL here
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies to be sent
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204, // For legacy browser support
  })
);

app.use(morgan("dev"));

// Routes
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);

app.get(`/`, (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  dbConnect();
  console.log(`Server is running on port : http://localhost:${port}/`);
});
