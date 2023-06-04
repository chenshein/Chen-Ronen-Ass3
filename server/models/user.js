const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Message = require("./message");
const Contact = require("./contact");
const Chat = require("./chat");

const userSchema = new Schema(
  {
    _id: {
      type: Number,
      required: true,
      unique: true,
      default: 1, // Initial value for the first user
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "offline",
    },
    contacts: {
      type: Map,
      of: Contact.schema,
      default: {},
    },
    chats: {
      type: Array,
      of: Chat.schema,
      default: [],
    },
    messages: {
      type: Map,
      of: Message.schema,
      default: {},
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const doc = this;
  // Check if the document is new (not updated)
  if (doc.isNew) {
    // Find the highest id value among existing documents and increment it by 1
    doc.constructor
      .findOne({}, {}, { sort: { _id: -1 } })
      .then((lastUser) => {
        doc._id = lastUser ? lastUser._id + 1 : 1;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
