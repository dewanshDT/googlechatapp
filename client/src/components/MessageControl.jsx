import React, { useState } from "react";

const MessageControl = ({ socket, user }) => {
  const [text, setText] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    const message = {userID: user.uid , userName: user.displayName, photoURL: user.photoURL, text: text}
    socket.emit("chat-message", message);
    setText("");
  }

  return (
    <form className="message-control" onSubmit={submitHandler}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="write your message"
      />
      <button className="btn">send</button>
    </form>
  );
};

export default MessageControl;
