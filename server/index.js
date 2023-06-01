const express = require("express");
const app = express();
const port = 12345;

const customEnv = require("custom-env");
customEnv.env(process.env.NODE_ENV, "./config");

const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usersRouter = require("./routes/user");
app.use("/user", usersRouter);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(process.env.PORT);

try {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}
