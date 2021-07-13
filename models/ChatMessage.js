const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    userID: String,
    userName: String,
    photoURL: String,
    text: String
})

const ChatMessage = mongoose.model('ChatMessage', messageSchema);

module.exports = ChatMessage;