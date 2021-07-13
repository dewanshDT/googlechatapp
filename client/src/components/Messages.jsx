import React, { useEffect, useRef } from "react";

const Messages = ({ messages, user }) => {
  const messageBox = useRef();

  useEffect(() => {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }, [messages]);

  return (
    <div className="message-box" ref={messageBox}>
      {messages.map((message, index) => {
        return (
          <p
            key={index}
            className={`message ${message.userID === user.uid ? "sent" : ""}`}
          >
            {message.userID === user.uid ? "" : <span>{message.userName}: </span>}
            {message.text}
          </p>
        );
      })}
    </div>
  );
};

export default Messages;
