const User = require("../models/user");

/*
Token Creation and Verification
 */
const Tokens = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  if (user.password !== password) {
    return null;
  }
  return user;
};

/*
User CRUD
 */

const createUser = async (username, password, displayName, profilePicture) => {
  const user = await User.create({
    username,
    password,
    displayName,
    profilePicture,
  });
  if (!user) {
    return null;
  }
  return user.save();
};

const getUser = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

const deleteUser = async (username) => {
  const deletedUser = await User.deleteOne({ username });
  return deletedUser;
};

const updateUser = async (username, displayName, profilePicture) => {
  const user = await User.findOne({ username });
  user.displayName = displayName;
  user.profilePicture = profilePicture;
  return await user.save();
};

/*
Contact CRUD
 */

const addContact = async (username, contact) => {
  const user = await User.findOne({ username });
  const con = await User.findOne({ username: contact });
  if (!con) {
    return null;
  }
  if (user.contacts.get(contact)) {
    return null;
  }
  user.contacts.set(contact, con);
  return user.save();
};

const getContact = async (username, contactname) => {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  const contact = await User.findOne({ username: contactname });
  return await user.contacts.get(contact);
};

const getAllContacts = async (username) => {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  return user.contacts;
};

const removeContact = async (username, contact) => {
  const user = await User.findOne({ username });
  user.contacts.delete(contact.username);
  return user.save();
};

/*
Message CRUD
 */
const addChat = async (username, contact, message) => {
  const user = await User.findOne({ username });
  user.messages.get(contact.username).push(message);
  return user.save();
};

const removeMessage = async (username, contact, id) => {
  const user = await User.findOne({ username });
  user.messages.get(contact.username).splice(id, 1);
  return user.save();
};

const getAllMessages = async (username, contact) => {
  const user = await User.findOne({ username });
  return user.messages.get(contact.username);
};

module.exports = {
  Tokens,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  addContact,
  getContact,
  getAllContacts,
  removeContact,
  addChat,
  removeMessage,
  getAllMessages,
};
