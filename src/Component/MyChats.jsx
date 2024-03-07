import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "../axioss";
import { toast } from "react-toastify"; // Import toast if not already imported
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getSender } from "../config/ChatLogics";
import GroupChatDialog from "./miscellenous/GroupChatDialog";

const MyChats = (props) => {
  const isWideScreen = useMediaQuery("(min-width:600px)");
  const { user, setChats, chats, selectedChat, setSelectedChat } = ChatState(); // Removed unused variables
  const [loggedUser, setLoggedUser] = useState();

  const handleClick = (id) => {
    setSelectedChat(id);
  };

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chats", config);
      //console.log("mychat ", data);
      setChats(data.newResult);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    // console.log("mychat problem");
    fetchChats();
  }, [props.fetchAgain]); // Added user as a dependency for useEffect
  // console.log("mychatbox", selectedChat);
  return (
    <Box
      sx={{
        display: isWideScreen ? "flex" : !selectedChat ? "flex" : "none",
        width: isWideScreen ? "31%" : "100%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          padding: "3px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "28px",
        }}
      >
        <h4 style={{ color: "white" }}>My Chats</h4>
        <GroupChatDialog>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              display: "flex",
              border: "1px solid black",
              borderRadius: "3px",
            }}
          >
            New Group Chat
          </Button>
        </GroupChatDialog>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "3px",
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          borderRadius: "5px",
          border: "1px solid black",
          overflowY: "auto",
        }}
      >
        <Stack>
          {chats &&
            chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => {
                  setSelectedChat(chat);
                }}
                sx={{
                  cursor: "pointer",
                  backgroundColor: selectedChat === chat ? "blue" : "lightgrey",
                  color: selectedChat === chat ? "white" : "black",
                  padding: "3px",
                  margin: "3px",
                  borderRadius: "5px",
                  border: "1px solid black",
                  textAlign: "center",
                }}
              >
                <Typography>
                  {chat.isGroupChat === false
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Typography>
              </Box>
            ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default MyChats;
