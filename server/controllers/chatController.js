const chatServices = require("../services/chatServices");
const tokenController = require("../controllers/tokenController");

const getChats = async (req, res) => {
  const username = await res.user.username;
  const chats = await chatServices.getChats(username);
  res.json(chats);
};

const addChat = async (req, res) => {
  const username = await res.user.username;
  if (!username) {
    res.json({ message: "Invalid token" });
  }
  const contact = await req.body.username;
  console.log("contact", contact);
  const chat = await chatServices.addChat(username, contact);
  res.json(chat);
};

module.exports = {
  getChats,
  addChat,
};
