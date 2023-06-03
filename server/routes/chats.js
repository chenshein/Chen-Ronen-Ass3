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


router
    .route("/:id")
    .get(tokenController.AuthenticateToken, chatController.getChatsByID); // http://localhost:3001/api/chats/{id}

router
    .route("/:id")
    .delete(tokenController.AuthenticateToken, chatController.deleteChatByID); // http://localhost:3001/api/chats/{id} delete
router
    .route("/:id/Messages")
    .post(tokenController.AuthenticateToken, chatController.addMsg); // http://localhost:3001/api/chats/{id}/Messages create new msg


module.exports = router;
