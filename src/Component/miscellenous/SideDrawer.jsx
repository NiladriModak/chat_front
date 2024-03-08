import {
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  MenuList,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./SideDrawer.css";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Profile from "./Profile";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import { toast } from "react-toastify";
import axios from "../../axioss";
import Loading from "../Loading";
import UserListItem from "./UserListItem";
import { getSender } from "../../config/ChatLogics";
import NotificationBadge, { Effect } from "react-notification-badge";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatloading, setChatloading] = useState(false);
  const [noti, setNoti] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(null);

  const [openSide, setOpenSide] = useState(false);
  const isWideScreen = useMediaQuery("(min-width:600px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tooltipOpen, settooltipOpen] = useState(false);
  const open = Boolean(anchorEl);
  const navigator = useNavigate();

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    // if (open === true) settooltipOpen(false);
    // else settooltipOpen(true);
    setOpenSide(open);
  };
  const handleClickNotificationOpen = (event) => {
    console.log("eseche");
    setNotificationOpen(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationOpen(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
    navigator("/login");
  };

  const searchHandler = async () => {
    setLoading(true);
    try {
      // console.log("no=", user.token);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/allUsers?search=${search}`,
        config
      );
      setSearchResult(data.users);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const accessChats = async (userId, e) => {
    try {
      // e.preventDefault(); // Prevent default action if event is provided
      setChatloading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chats", { userId }, config);

      if (
        !chats.some((c) =>
          Array.isArray(data.fullChat)
            ? c._id === data.fullChat[0]._id
            : c._id === data.fullChat._id
        )
      ) {
        setChats((prevChats) => [data.fullChat, ...prevChats]);
        setSelectedChat(data.fullChat);
      } else {
        toast.warning("Chat already exists");
      }

      setChatloading(false);
      setOpenSide(false);
    } catch (error) {
      toast.error(error.message);
      setChatloading(false);
    }
  };

  const list = () => {
    // console.log("user");
    return (
      <Box
        sx={{ width: 300 }}
        role="presentation"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Typography
          sx={{
            width: "100%",
            fontSize: "1.0rem",
            fontFamily: "Roboto",
            fontWeight: "5px",
            textAlign: "center",
            marginBottom: "6px",
          }}
        >
          Search users
        </Typography>
        <div>
          <input
            placeholder="Serach"
            style={{ fontSize: "1.1rem", width: "70%", padding: "6px" }}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => e.stopPropagation()}
          />
          <Button onClick={searchHandler} variant="contained">
            Go
          </Button>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <List>
            {searchResult.map((user, index) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={(event) => accessChats(user._id, event)}
              />
            ))}
          </List>
        )}
      </Box>
    );
  };

  // console.log(user);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          padding: "8px",
          justifyContent: "space-between",
          backgroundColor: "#4D9F72",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Tooltip
          // open={tooltipOpen}
          sx={{ width: "100%" }}
          title="Search User"
          placement="bottom"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="SearchBar"
            style={{ border: "1px solid white" }}
          >
            <Typography
              className="TextField"
              onClick={toggleDrawer("left", true)}
              sx={{
                display: isWideScreen ? "flex" : "none",
                cursor: "pointer",
                padding: isWideScreen ? "7px 7px" : "0 0",
                color: "white",
              }}
            >
              Search user
            </Typography>
            <Button
              onClick={toggleDrawer("left", true)}
              variant="outlined"
              sx={{
                border: "none",
                // display: isWideScreen ? "flex" : "none",
              }}
            >
              <SearchSharpIcon />
            </Button>
            <SwipeableDrawer
              className="SwipeableDrawer"
              open={openSide}
              onClose={toggleDrawer("left", false)}
              onOpen={toggleDrawer("left", true)}
            >
              {list()}
            </SwipeableDrawer>
          </div>
        </Tooltip>
        <Typography
          variant="h4"
          sx={{
            fontSize: isWideScreen ? "2rem" : "1rem",
            color: "white",
          }}
        >
          EConnect
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "4vmax",
          }}
        >
          <Button id="basic-button" onClick={handleClickNotificationOpen}>
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            />
            <NotificationsIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={notificationOpen}
            open={Boolean(notificationOpen)}
            onClose={handleNotificationClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuList>
              {!notification.length && "No Notification"}
              {notification.map((notif) => (
                <MenuItem
                  sx={{ border: "1px solid black", margin: "1px" }}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n != notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Chat from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ margin: "0 16px" }}
          >
            <Avatar
              sx={{
                width: isWideScreen ? "3vmax" : "6vmax",
              }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuList>
              <Profile user={user.user}>
                <MenuItem>Profile</MenuItem>
              </Profile>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      {chatloading && <CircularProgress />}
    </div>
  );
};

export default SideDrawer;
