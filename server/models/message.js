const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
      sender: {
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
              required: true,
          },
      },
    timestamp: {
      type: Date,
      default: Date.now,
    },
      content: {
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
