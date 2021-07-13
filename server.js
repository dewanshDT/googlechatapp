const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" });
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to the database"));
const ChatMessage = require("./models/ChatMessage");
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server, {
  cors: ["http://localhost:5000", "https://googlechatapp.herokuapp.com"],
});

async function newMessage(msg) {
  const message = new ChatMessage(msg);
  await message.save();
}

async function sendMessages(socket) {
  try {
    const messages = await ChatMessage.find();
    messages && messages.forEach((message) => {
      socket.emit("message", message);
    });
  } catch (e) {
    console.log(e);
  }
}

io.on("connection", (socket) => {
  console.log("web socket connected");

  sendMessages(socket);

  // listen for message
  socket.on("chat-message", (msg) => {
    try {
      newMessage(msg);
      io.emit("message", msg);
    } catch (e) {
      console.error(e);
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    app.use(express.static("client/build"));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}

server.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT} in ${process.env.NODE_ENV}`));
