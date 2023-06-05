const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Message = require("./message");

const contactSchema = new Schema(
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
    },
    displayName: {
      type: String,
      required: true,
    },
      profilePic: {
      type: String,
      default: "https://i.imgur.com/6VBx3io.png",
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

contactSchema.pre("save", function (next) {
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

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
