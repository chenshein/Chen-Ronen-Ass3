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
app.use(express.static("public"));
// app.use('/SignUp', express.static('public'));
app.use("/chat", express.static("public"));

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
app.use(bodyParser.json({ limit: "1mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "1mb",
    extended: true,
    parameterLimit: 1000,
  })
);
app.use(bodyParser.text({ limit: "1mb" }));

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
  socket.on("disconnect", async () => {
    // console.log("A user disconnected!");
    for (let [key, value] of user_socket_map.entries()) {
      if (value === socket.id) {
        user_socket_map.delete(key);
        const user = await User.findOne({ username: key });
        user.status = "offline";
        user.save();
        const chats = await Chat.find({ "users.username": key });

        chats.forEach((chat) => {
          chat.users.forEach((c) => {
            console.log(c.username);
            if (c.username !== key) {
              const receiver_socket_id = user_socket_map.get(c.username);
              if (receiver_socket_id) {
                socket.to(receiver_socket_id).emit("user_logged_out", user);
              }
            }
          });
        });
        break;
      }
    }
  });
  socket.on("login", async (username) => {
    user_socket_map.set(username, socket.id);
    const user = await User.findOne({ username: username });
    user.status = "online";
    user.save();

    const chats = await Chat.find({ "users.username": username });
    const connectedUsers = [];

    chats.forEach((chat) => {
      chat.users.forEach((c) => {
        if (c.username !== username) {
          const receiver_socket_id = user_socket_map.get(c.username);
          if (receiver_socket_id) {
            socket.to(receiver_socket_id).emit("user_logged_in", user);
            connectedUsers.push(c.username);
          }
        }
      });
    });
    console.log("user logged in", connectedUsers);
    socket.to(socket.id).emit("receive_online_users", connectedUsers);
  });
  socket.on("logout", async (username) => {
    user_socket_map.delete(username);
    const user = await User.findOne({ username: username });
    user.status = "offline";
    user.save();
    const chats = await Chat.find({ "users.username": username });

    chats.forEach((chat) => {
      chat.users.forEach((c) => {
        console.log(c.username);
        if (c.username !== username) {
          const receiver_socket_id = user_socket_map.get(c.username);
          if (receiver_socket_id) {
            socket.to(receiver_socket_id).emit("user_logged_out", user);
          }
        }
      });
    });
  });
  socket.on("send_message", (data) => {
    const receiver_socket_id = user_socket_map.get(data.contactName);
    if (!receiver_socket_id) {
      return;
    }
    // console.log(
    //   `Sending message to ${data.contactName}, ${user_socket_map.get(
    //     data.contactName
    //   )})}`
    // );
    socket.to(receiver_socket_id).emit("receive_message", data.message);
    // console.log(`Message sent to ${receiver_socket_id}!`);
  });
  socket.on("get_online_users", async (sender) => {
    const connectedUsers = [];
    for (let [key, value] of user_socket_map.entries()) {
      if (key !== sender) {
        connectedUsers.push(key);
      }
    }
    // remove duplicates
    const uniqueUsers = [...new Set(connectedUsers)];
    // remove all the users that are not in a chat with the sender
    const chats = await Chat.find({ "users.username": sender });
    const usersInChats = [];
    chats.forEach((chat) => {
      chat.users.forEach((c) => {
        if (c.username !== sender) {
          usersInChats.push(c.username);
        }
      });
    });
    for (let i = uniqueUsers.length - 1; i >= 0; i--) {
      if (!usersInChats.includes(connectedUsers[i])) {
        uniqueUsers.splice(i, 1);
      }
    }
    const sender_socket_id = user_socket_map.get(sender);
    socket.emit("receive_online_users", uniqueUsers);
  });
  socket.on("user_added", async (data) => {
    const receiver_socket_id = await user_socket_map.get(data);
    console.log(data, receiver_socket_id);
    if (!receiver_socket_id) {
      return;
    }
    console.log(`asking ${data} to reload contacts`);
    socket.to(receiver_socket_id).emit("reload_contacts");
  });
  socket.on("user_removed", async (data) => {
    const receiver_socket_id = await user_socket_map.get(data.contact);
    if (!receiver_socket_id) {
      return;
    }
    console.log(`asking ${data} to reload contacts`);
    socket.to(receiver_socket_id).emit("remove_contact", data.user);
  });
});

try {
  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}
