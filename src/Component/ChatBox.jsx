import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { ChatState } from "../context/ChatProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getSender, getSenderFull } from "../config/ChatLogics";
import Profile from "./miscellenous/Profile";
import UpdateGroup from "./miscellenous/UpdateGroup";
import SingleChat from "./SingleChat";

const ChatBox = (props) => {
  const isWideScreen = useMediaQuery("(min-width:600px)");
  const { user, selectedChat, setSelectedChat } = ChatState();

  const handler = () => {
    setSelectedChat("");
  };
  return (
    <Box
      sx={{
        display: isWideScreen ? "flex" : selectedChat ? "flex" : "none",
        backgroundColor: "white",
        width: isWideScreen ? "68%" : "100%",
        borderRadius: "10px",
        border: "1px solid black",
      }}
    >
      <SingleChat
        fetchAgain={props.fetchAgain}
        setfetchAgain={props.setfetchAgain}
      />
      {/* {selectedChat ? (
        <>
          <div
            style={{
              height: "6vmax",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handler}
              sx={{
                display: !isWideScreen ? "flex" : "none",
                justifyContent: !isWideScreen ? "space-between" : "none",
              }}
            >
              <ArrowBackIcon />
            </Button>
            {!selectedChat.isGroupChat ? (
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontFamily: "Verdana",
                  color: "#4D4D4F",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {getSender(user, selectedChat.users)}
                <Profile user={getSenderFull(user, selectedChat.users)} />
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontFamily: "Verdana",
                  color: "#4D4D4F",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {selectedChat.chatName}
                <UpdateGroup />
              </Typography>
            )}
          </div>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            fontSize: "1.4rem",
            color: "#4D4D4F",
          }}
        >
          Please select a user to continue chatting
        </Box>
      )} */}
    </Box>
  );
};

export default ChatBox;

// import React from "react";

// function ChatBox() {
//   return <div>ChatBox</div>;
// }

// export default ChatBox;
// ChatBox;
