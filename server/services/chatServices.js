const Chat = require("../models/chat");
const userServices = require("../services/userServices");

const getChats = async (username) => {
  const user = await userServices.getUser(username);
  const chats = user.chats;
  if (!chats) {
    console.log("Chats not found");
  }
  // return the values of the map
  const chatsArray = Array.from(chats.values());
  return chatsArray;
};

const addChat = async (username, contact) => {
  console.log("contact", contact);
  const user = await userServices.getUser(username);
  const contactUser = await userServices.getUser(contact);
  if (!contactUser) {
    return { message: "Contact not found" };
  }
  if (user.chats.has(contactUser.username)) {
    return { message: "Chat already exists" };
  }
  user.chats.set(contactUser.username, { user: contactUser });
  return user.save();
};

module.exports = {
  getChats,
  addChat,
};
