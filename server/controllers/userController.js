const userServices = require("../services/userServices");

const createUser = async (req, res) => {
  try {
    const { username, displayName, profilePicture } = await req.body;
    const user = await userServices.createUser(
      username,
      displayName,
      profilePicture
    );
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  const { username } = await req.params;
  const user = await userServices.getUser(username);
  res.json(user);
};

const getAllUsers = async (req, res) => {
  const users = await userServices.getAllUsers();
  res.json(users);
};

const deleteUser = async (req, res) => {
  const { username } = await req.params;
  const deletedUser = await userServices.deleteUser(username);
  res.json(deletedUser);
};

const updateUser = async (req, res) => {
  const { username, displayName, profilePicture } = await req.body;
  const user = await userServices.updateUser(
    username,
    displayName,
    profilePicture
  );
  res.json(user);
};

const addContact = async (req, res) => {
  const { username, contact } = await req.body;
  const user = await userServices.addContact(username, contact);
  res.json(user);
};

const getContact = async (req, res) => {
  const { username, contact } = await req.params;
  const user = await userServices.getContact(username, contact);
  res.json(user);
};

const removeContact = async (req, res) => {
  const { username, contact } = await req.params;
  const user = await userServices.removeContact(username, contact);
  res.json(user);
};

const addMessage = async (req, res) => {
  const { username, contact, message } = await req.body;
  const user = await userServices.addMessage(username, contact, message);
  res.json(user);
};

const removeMessage = async (req, res) => {
  const { username, contact, id } = await req.params;
  const user = await userServices.removeMessage(username, contact, id);
  res.json(user);
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  addContact,
  getContact,
  removeContact,
  addMessage,
  removeMessage,
};
