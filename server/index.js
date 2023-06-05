const express = require("express");
const app = express();
const port = 3001;

//TODO: return id instead of _id
const customEnv = require("custom-env");
customEnv.env(process.env.NODE_ENV, "./config");

const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 5000,
  })
);
app.use(bodyParser.text({ limit: "5mb" }));

const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cors = require("cors");
app.use(cors());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

const usersRouter = require("./routes/api");
app.use("/api", usersRouter);

const userRouter = require("./routes/user");
app.use("/api/users", userRouter);

const contactRouter = require("./routes/contacts");
app.use("/api/contacts", contactRouter);

const chatsRouter = require("./routes/chats");
app.use("/api/chats", chatsRouter);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection to database successful!");
});

try {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}
