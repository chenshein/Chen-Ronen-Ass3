const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");

const express = require("express");
const router = express.Router();

router.route("/").post(userController.createUser); // http://localhost:3001/api/users Register

router
  .route("/:username")
  .get(tokenController.AuthenticateToken, userController.getUser); // http://localhost:3001/api/users/:username Get User

// router.route("/Chats/:username").get(userController.getUser); // http://localhost:3001/api/Chats/:username

module.exports = router;
