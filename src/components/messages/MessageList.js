import { useState, useEffect } from "react";
import { MessageLeft, MessageRight } from "./messageitem/MessageItem";

const MessageList = () => {
  const [intervalCount, setIntervalCount] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const msgs = JSON.parse(localStorage.getItem("messages"));
    setMessages(msgs);

    const timeout = setTimeout(() => {
      setIntervalCount((count) => count + 1);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [intervalCount]);

  if (!messages) {
    return <div style={{ textAlign: "center" }}>No messages</div>;
  }

  let user = sessionStorage.getItem("user");

  const messageList = messages.map((message, index) => {
    if (user !== message.sender) {
      return (
        <MessageLeft
          key={index}
          message={message.message}
          timestamp=""
          photoURL=""
          displayName={message.sender}
          avatarDisp={true}
        />
      );
    } else {
      return (
        <MessageRight
          key={index}
          message={message.message}
          timestamp=""
          avatarDisp={true}
        />
      );
    }
  });

  return <ul>{messageList}</ul>;
};

export default MessageList;
