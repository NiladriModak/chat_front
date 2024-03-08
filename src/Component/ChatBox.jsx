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
    </Box>
  );
};

export default ChatBox;
