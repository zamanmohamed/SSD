const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = model("messages", MessageSchema);