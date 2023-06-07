const userServices = require("../services/userServices");

/*
User CRUD
 */

const createUser = async (req, res) => {
  try {
    const { username, password, displayName, profilePic } = await req.body;
    try {
      //
      if (!username || !password || !displayName || !("profilePic" in req.body))
        return res.status(400).json({ message: "Missing fields" });

      //
      const user = await userServices.createUser(
        username,
        password,
        displayName,
        profilePic
      );

      if (!user) return res.status(409).json({ message: "Username exists" });

      let myUser = {
        username: user.username,
        displayName: user.displayName,
        profilePic: user.profilePic,
      };
      res.json(myUser);
    } catch (error) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // add to db
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const username = await res.user.username;
    const asker = await req.params.username;
    const user = await userServices.getUser(username);
    if (!user) return res.sendStatus(404);
    if (username !== asker)
      return res.status(401).json({ message: "Unauthorized" });
    const foramttedUser = {
      username: user.username,
      displayName: user.displayName,
      profilePic: user.profilePic,
    };
    res.json(foramttedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const deleteUser = async (req, res) => {
  const { username } = await req.params;
  const deletedUser = await userServices.deleteUser(username);
  res.json(deletedUser);
};

const updateUser = async (req, res) => {
  const { username, displayName, profilePic } = await req.body;
  const user = await userServices.updateUser(username, displayName, profilePic);
  res.json(user);
};

/*
Contact CRUD
 */

const addContact = async (req, res) => {
  try {
    const username = await res.user.username;
    const contactname = await req.params.username;
    // console.log("add", await req.params.username);
    const user = await userServices.getUser(username);
    if (!user) return res.status(404).json({ message: "Token is outdated" });
    const contact = await userServices.getUser(contactname);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    const success = await userServices.addContact(username, contactname);
    if (!success)
      return res.status(409).json({ message: "Contact already exists" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getContact = async (req, res) => {
  try {
    const username = await res.user.username;
    const contactname = await req.params.username;
    const user = await userServices.getContact(username, contactname);
    if (!user) return res.status(404).json({ message: "Contact not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllContacts = async (req, res) => {
  const username = await res.user.username;
  if (!username) return res.status(404).json({ message: "Token is outdated" });
  const contacts = await userServices.getAllContacts(username);
  if (!contacts) return res.status(404).json({ message: "No contacts found" });
  // console.log(contacts);
  res.json(contacts);
};

const removeContact = async (req, res) => {
  const { username, contact } = await req.params;
  const user = await userServices.removeContact(username, contact);
  res.json(user);
};

/*
Message CRUD
 */
const getMessages = async (req, res) => {
  const username = await res.user.username;
  // console.log("messages of:", username);
  const user = await userServices.getUser(username);
  if (!user) return res.sendStatus(404);
  res.json(user.messages);
};
const addChat = async (req, res) => {
  const username = await res.user.username;
  // console.log("adding message to:", username);
  const { contact } = await req.body;
  const user = await userServices.addChat(username, contact, message);
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
  deleteUser,
  updateUser,
  addContact,
  getContact,
  getAllContacts,
  removeContact,
  getMessages,
  addChat,
  removeMessage,
};
