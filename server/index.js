const express = require("express");
const app = express();
const port = 3001;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/express-mongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

const cors = require("cors");
const bodyParser = require("body-parser");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
