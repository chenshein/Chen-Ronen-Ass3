const userController = require("../controllers/userController");

const express = require("express");
const router = express.Router();

router.route("/").get(userController.getAllUsers); // http://localhost:3001/user

router.route("/").post(userController.createUser); // http://localhost:3001/user

router.route("/:username").get(userController.getUser); // http://localhost:3001/user/username

router.route("/:username").delete(userController.deleteUser); // http://localhost:3001/user/username

router.route("/:username").put(userController.updateUser); // http://localhost:3001/user/username

router.route("/contact").post(userController.addContact); // http://localhost:3001/user/contact

router.route("/contact/:username").get(userController.getContact); // http://localhost:3001/user/contact/username

router.route("/contact/:username").delete(userController.removeContact); // http://localhost:3001/user/contact/username

router.route("/message").post(userController.addMessage); // http://localhost:3001/user/message

router.route("/message/:username/:id").delete(userController.removeMessage); // http://localhost:3001/user/message/username/id

module.exports = router;
