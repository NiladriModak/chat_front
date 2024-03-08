import React, { useEffect, useRef, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  TextField,
  Typography,
  useMediaQuery,
  Box,
  FormControl,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Profile from "./miscellenous/Profile";
import UpdateGroup from "./miscellenous/UpdateGroup";
import { getSender, getSenderFull } from "../config/ChatLogics";
import Loading from "./Loading";
import { toast } from "react-toastify";
import axios from "../axioss";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
function SingleChat(props) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessages, setNewMessages] = useState("");

  const isWideScreen = useMediaQuery("(min-width:600px)");
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const ENDPOINT = "https://chatapp-backend-2mf4.onrender.com";
  var socket = useRef(null),
    selectedChatCompare;
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("setup", user.user);
    socket.current.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;

    if (selectedChat) {
      localStorage.setItem("compare", selectedChat._id);
    } else {
      localStorage.removeItem("compare");
    }
  }, [selectedChat]);

  useEffect(() => {
    if (socket.current != null) {
      socket.current.on("message recieved", (newMessageRecieved) => {
        const comp = localStorage.getItem("compare");
        if (comp !== newMessageRecieved.chat._id) {
          if (
            !notification.some(
              (item) => item.chat.chatName === newMessageRecieved.chat.chatName
            )
          ) {
            setNotification([newMessageRecieved, ...notification]);
            setfetchAgain(!fetchAgain);
          }
        } else if (comp) {
          setMessages([...messages, newMessageRecieved]);
        }
      });
    }
  });

  const handler = () => {
    setSelectedChat("");
  };

  const fetchMessages = async () => {
    try {
      if (!selectedChat) return;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      await setMessages(data);

      setLoading(false);
      socket.current.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    try {
      if (newMessages) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          "/api/message/",
          {
            content: newMessages,
            chatId: selectedChat._id,
          },
          config
        );
        socket.current.emit("new message", data);
        setMessages([...messages, data]);
        setNewMessages("");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const typingHandle = (e) => {
    setNewMessages(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <>
      {selectedChat ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "9px",
          }}
        >
          <div
            style={{
              height: "6vmax",
              width: "100%",
              display: "flex",
              //   flexDirection: "column",
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
            {/* <span>{console.log(selectedChat)}</span> */}
            {!selectedChat.isGroupChat ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "spaceBetween",
                }}
              >
                <Typography
                  sx={{
                    fontSize: isWideScreen ? "1.5rem" : "0.9rem",
                    fontFamily: "Verdana",
                    color: "#4D4D4F",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {getSender(user, selectedChat.users)}
                </Typography>
                <Profile user={getSenderFull(user, selectedChat.users)} />
              </div>
            ) : (
              <Typography
                sx={{
                  fontSize: isWideScreen ? "1.5rem" : "0.9rem",
                  fontFamily: "Verdana",
                  color: "#4D4D4F",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {selectedChat.chatName}
                <UpdateGroup
                  fetchAgain={props.fetchAgain}
                  setfetchAgain={props.setfetchAgain}
                  fetchMessages={fetchMessages}
                />
              </Typography>
            )}
          </div>
          <Box
            sx={{
              backgroundColor: "#E1DFE1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "3px",
              width: "100%",
              height: "100%",
              borderRadius: "4px",
              overflowY: "hidden",
            }}
          >
            {loading ? (
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loading />
              </h1>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Message"
                value={newMessages}
                required
                onChange={typingHandle}
                onKeyDown={handleKeyDown}
              />
              <IconButton type="button" sx={{ p: "10px" }}>
                <SentimentSatisfiedAltIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
                onClick={sendMessage}
              >
                <SendIcon />
              </IconButton>
            </Paper>
          </Box>
        </div>
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
      )}
    </>
  );
}

export default SingleChat;
