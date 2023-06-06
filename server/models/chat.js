const mongoose = require("mongoose");
const Message = require("./message");
const Contact = require("./contact");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    user: {
      type: Contact.schema,
      required: true,
    },
    lastMessage: {
      type: String,
      default: null,
    },
    messages: {
      type: Array,
      of: Message.schema,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
