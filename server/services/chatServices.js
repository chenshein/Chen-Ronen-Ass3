const Chat = require("../models/chat");
const userServices = require("../services/userServices");
const User = require("../models/user");

const getChats = async (username) => {
  const user = await userServices.getUser(username);
  if(!user) {
    console.log("User not found");
    return ;
  }
  console.log("user2", user);
  const chats = user.chats;
  if (!chats) {
    console.log("Chats not found");
  }
  // return the values of the map
  const chatsArray = Array.from(chats.values());
  return chatsArray;
};

const addChat = async (curUsername, contactUsername) => {
  try {
    const curUser = await User.findOne({ username: curUsername });
    const contact = await User.findOne({ username: contactUsername });

    if (!contact) {
      return { message: "Contact not found" };
    }

    // Check if the chat already exists
    const existingChat = curUser.chats.find(
      (chat) => chat.user.username === contactUsername
    );
    if (existingChat) {
      return { message: "Chat already exists" };
    }

    // Create the new chat
    const newChat = {
      user: contact,
      lastMessage: null,
    };

    curUser.chats.push(newChat);
    await curUser.save();

    return { message: "Chat added successfully" };
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};


const getChatsByID = async (username, chatId) => {
  try {
    const user = await userServices.getUser(username);
    if (!user) {
      console.log("User not found");
      return;
    }
    const chat = user.chats.find(chats => chats._id = chatId)

    const usersArray = [
        {
          username: user.username,
          displayName:user.displayName,
          profilePic: user.profilePicture
        },
      {
          username: chat.user.username,
          displayName:chat.user.displayName,
          profilePic: chat.user.profilePicture
      }
    ]

    const messagesArray= [
      chat.user.message
    ]
    return {id: chatId, users: usersArray, messages: messagesArray}


  } catch (error){
    console.log(error);
    return { message: error };
  }
}


const deleteChatByID = async (username) => {

}

const addMsg = async (username, chatId, msg) => {
  try {
    const user = await userServices.getUser(username);
    if (!user) {
      console.log("User not found");
      return;
    }
    const chat = user.chats.find(chats => chats._id = chatId)
    if(!chat) return null; //wrong id

  const data = {
    sender: {username: user.username , displayName:user.displayName, profilePic: user.profilePicture},
    timestamp: Date.now , message: msg, read: false
  }
    await chat.messages.push(data)
   await chat.messages.save();
    return chat.messages;


  }catch (error){
    console.log(error);
    return { message: error };
  }
}

module.exports = {
  getChats,
  addChat,
  getChatsByID,
  deleteChatByID,
  addMsg,
};
