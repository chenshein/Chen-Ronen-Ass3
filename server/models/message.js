const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: {
      type: User,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
