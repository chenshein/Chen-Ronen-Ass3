const tokenController = require("../controllers/tokenController");

const express = require("express");
const router = express.Router();

router.route("/Tokens").post(tokenController.Tokens); // http://localhost:3001/api/login

module.exports = router;
