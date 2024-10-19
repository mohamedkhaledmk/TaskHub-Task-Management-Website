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

dbConnect();
// CORS configuration with preflight handling
const allowedOrigins = [
  "https://taskhub-task-management-app-xmidos25256gmailcoms-projects.vercel.app", // Your frontend URL
  "https://taskhub-task-management-app.vercel.app",
  "http://localhost:5173", // Local development (if needed)
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and credentials
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  })
);

// Explicitly handle preflight OPTIONS requests
app.options("*", cors());

// Middleware
app.use(morgan("dev"));

// Routes
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);

// Test route
app.get(`/`, (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port : http://localhost:${port}/`);
});
