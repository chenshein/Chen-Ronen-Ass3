const Message = require("../models/message");

const createMessage = async (sender, message) => {
  const newMessage = await new Message({
    sender,
    message,
  });
  return await newMessage.save();
};

const getAllMessages = async () => {
  const messages = await Message.find();
  return messages;
};

const deleteMessage = async (id) => {
  const messageToDelete = await Message.findById(id);
  return await messageToDelete.delete();
};
