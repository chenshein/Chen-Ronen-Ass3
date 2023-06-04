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

// chatSchema.pre("save", function (next) {
//   const doc = this;
//   // Check if the document is new (not updated)
//   if (doc.isNew) {
//     // Find the highest id value among existing documents and increment it by 1
//     doc.constructor
//       .findOne({}, {}, { sort: { _id: -1 } })
//       .then((lastUser) => {
//         doc._id = lastUser ? lastUser._id + 1 : 1;
//         next();
//       })
//       .catch((error) => {
//         next(error);
//       });
//   } else {
//     next();
//   }
// });

module.exports = mongoose.model("Chat", chatSchema);
