const express = require("express");
const app = express();
const port = 3001;
const Chat = require("./models/chat");



const cors = require("cors");
app.use(cors());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
app.use(express.static('public'));
// app.use('/SignUp', express.static('public'));
app.use('/chat', express.static('public'));


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  },
});

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

const usersRouter = require("./routes/api");
app.use("/api", usersRouter);

const userRouter = require("./routes/user");
app.use("/api/users", userRouter);

const contactRouter = require("./routes/contacts");
app.use("/api/contacts", contactRouter);

const chatsRouter = require("./routes/chats");
const User = require("./models/user");
app.use("/api/chats", chatsRouter);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection to database successful!");
});

const user_socket_map = new Map();

io.on("connection", (socket) => {
  console.log("A user connected!", socket.id);
  socket.on("disconnect", () => {
    // console.log("A user disconnected!");
    for (let [key, value] of user_socket_map.entries()) {
      if (value === socket.id) {
        user_socket_map.delete(key);
        break;
      }
    }
  });
  socket.on("login", async (username) => {
    user_socket_map.set(username, socket.id);
    const user = await User.findOne({ username: username });
    user.status = "online";
    user.save();
    console.log("user logged in", user_socket_map);
    socket.broadcast.emit("user_logged_in", user);
    // find all users in the database that have active socket connections
    const connectedUsers = [];
    for (let [key, value] of user_socket_map.entries()) {
      if (key !== username) {
        connectedUsers.push(key);
      }
    }
    socket.emit("receive_online_users", connectedUsers);
  });
  socket.on("logout", async (username) => {
    user_socket_map.delete(username);
    const user = await User.findOne({ username: username });
    user.status = "offline";
    user.save();
    console.log("user logged out", user_socket_map);
    socket.broadcast.emit("user_logged_out", user);
  });
  socket.on("send_message", (data) => {
    const receiver_socket_id = user_socket_map.get(data.contactName);
    if (!receiver_socket_id) {
      return;
    }
    console.log(
      `Sending message to ${data.contactName}, ${user_socket_map.get(
        data.contactName
      )})}`
    );
    socket.to(receiver_socket_id).emit("receive_message", data.message);
    console.log(`Message sent to ${receiver_socket_id}!`);
  });
  socket.on("get_online_users", (sender) => {
    const connectedUsers = [];
    for (let [key, value] of user_socket_map.entries()) {
      if (key !== sender) {
        connectedUsers.push(key);
      }
    }
    socket.emit("receive_online_users", connectedUsers);
  });
});

try {
  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}
