const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    profilePicture: {
      type: String,
    },
    status: {
      type: String,
      default: "offline",
    },
    contacts: {
      type: Map,
      of: String,
      default: {},
    },
    messages: {
      type: Map,
      of: Array,
      default: {},
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", contactSchema);

module.exports = User;
