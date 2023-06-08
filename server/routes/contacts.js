const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(tokenController.AuthenticateToken, userController.getAllContacts); // http://localhost:3001/api/users/Contacts Get Contacts

router
  .route("/:username")
  .post(tokenController.AuthenticateToken, userController.addContact); // http://localhost:3001/api/users/Contact Add Contact

router
  .route("/:username")
  .get(tokenController.AuthenticateToken, userController.getContact); // http://localhost:3001/api/users/Contact Get Contact

module.exports = router;
