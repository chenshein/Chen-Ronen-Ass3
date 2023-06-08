    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;
    const Message = require("./message");
    const Contact = require("./contact");
    const Chat = require("./chat");

    const userSchema = new Schema(
        {
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
            profilePic: {
                type: String,
                // required: true,
                default: null,
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
        },
        {timestamps: true}
    );

    const User = mongoose.model("User", userSchema);

    module.exports = User;
