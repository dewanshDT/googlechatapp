import React, { useEffect, useState } from "react";
import socketClient from "socket.io-client";
import Messages from "./Messages";
import MessageControl from "./MessageControl";
const SERVER = "";

const Dashboard = ({ user, logout }) => {
  const [messages, setMessages] = useState([]);
  
  const socket = socketClient(SERVER);
  useEffect(() => {
    socket.on("message", (msg) => {
      logMessage(msg);
    });
  }, []);

  function logMessage(message) {
    setMessages(preveiousMessages => [...preveiousMessages, message]);
  }

  function clickHandler() {
    logout();
  }

  return (
    <div className="dashboard">
      <div className="head">
        {user.photoURL && <img src={user.photoURL} />}
        {user.displayName && <h1>{user.displayName}</h1>}
        <button className="btn" onClick={clickHandler}>
          logout
        </button>
      </div>
      <Messages messages={messages} user={user} />
      <MessageControl socket={socket} user={user} />
    </div>
  );
};

export default Dashboard;
