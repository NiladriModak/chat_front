import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
} from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";
import { Avatar } from "@mui/material";

function ScrollableChat(props) {
  const { user } = ChatState();
  const messages = props.messages;

  return (
    <div style={{ maxHeight: "calc(100vh - 200px)" }}>
      {/* Use the maxHeight property to limit the height and enable scrolling */}
      {messages && messages.length > 0 && (
        <ScrollableFeed>
          {messages.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user.user._id) ||
                isLastMessage(messages, m, i, user.user._id)) && (
                <Avatar alt="Remy Sharp" src={m.sender.pic} />
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user.user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  padding: "5px 15px",
                  borderRadius: "20px",
                  maxWidth: "75%",
                  margin: "3px",
                  marginLeft: isSameSenderMargin(messages, m, i, user.user._id),
                  fontSize: "0.9rem",
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
        </ScrollableFeed>
      )}
    </div>
  );
}

export default ScrollableChat;
