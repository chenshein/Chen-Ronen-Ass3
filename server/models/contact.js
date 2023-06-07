const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Message = require("./message");

const contactSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "offline",
    },
    lastMessage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
