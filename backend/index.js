const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const taskRouter = require("./routers/taskRouter");
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
dotenv.config();

const dbConnect = require("./config/dbConnect");

app.use("/api/tasks", taskRouter);

app.get(`/`, (req, res) => {
  res.send("Hello world");
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  dbConnect();
  console.log(`Server is running on port : http://localhost:${port}/`);
});