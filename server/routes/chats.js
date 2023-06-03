const chatController = require("../controllers/chatController");
const tokenController = require("../controllers/tokenController");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(tokenController.AuthenticateToken, chatController.getChats); // http://localhost:3001/api/chats Get Messages

router
  .route("/")
  .post(tokenController.AuthenticateToken, chatController.addChat); // http://localhost:3001/api/chats Add Message

module.exports = router;
