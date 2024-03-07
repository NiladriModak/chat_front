import Visibility from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  List,
  TextField,
} from "@mui/material";
import axios from "../../axioss";
import React, { useState } from "react";
import Loading from "../Loading";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../SelectedUserBadge/UserBadgeItem";
import { toast } from "react-toastify";
import UserListItem from "./UserListItem";

function UpdateGroup(props) {
  const [open, setOpen] = useState(false);
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleRemove = async (removeUser) => {
    if (
      selectedChat.groupAdmin._id !== user.user._id &&
      user.user._id !== removeUser._id
    ) {
      toast.warning("Only admins can remove participants");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chats/removeFromGroup",
        {
          chatId: selectedChat._id,
          userId: removeUser._id,
        },
        config
      );
      removeUser._id === user.user._id
        ? setSelectedChat()
        : setSelectedChat(data.updateChat);
      props.setfetchAgain(!props.fetchAgain);
      // props.fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "api/chats/renameGroup",
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );
      setSelectedChat(data.updatedChat);
      props.setfetchAgain(!props.fetchAgain);
      setOpen(false);
      setRenameLoading(false);
    } catch (error) {
      toast.error(error.message);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleGroup = async (userToSelect) => {
    // console.log("came to handle add user");
    if (selectedChat.users.find((u) => u._id === userToSelect._id)) {
      toast.warning("User alreay there");
      return;
    }
    if (selectedChat.groupAdmin._id !== user.user._id) {
      toast.warning("Only admins can add users");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chats/addToGroup",
        {
          chatId: selectedChat._id,
          userId: userToSelect._id,
        },
        config
      );
      // console.log("update grp data", data);
      setSelectedChat(data.updateChat);
      props.setfetchAgain(!props.fetchAgain);
      toast.success(`${userToSelect.name} added successfully`);
      setLoading(false);
    } catch (error) {
      toast.error("Error");
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/allUsers?search=${query}`, config);
      setSearchResult(data.users);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClick}>
        <Visibility />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedChat.chatName}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            {selectedChat.users &&
              selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
          </Box>
          <FormControl
            sx={{
              margin: "3px",
              display: "flex",
              flexDirection: "row",
              marginTop: "6px",
            }}
          >
            <TextField
              sx={{ width: "75%" }}
              value={groupChatName}
              onChange={(e) => {
                setGroupChatName(e.target.value);
              }}
              placeholder="Enter new group name"
            />
            <Button
              onClick={handleRename}
              variant="contained"
              sx={{ margin: "4px", width: "20%" }}
            >
              Update
            </Button>
          </FormControl>
          <FormControl
            sx={{
              // width: "100%",
              margin: "3px",
              display: "flex",
              flexDirection: "row",
              marginTop: "6px",
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              placeholder="Add Users To Group"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </FormControl>
          {loading ? (
            <Loading />
          ) : (
            <List>
              {searchResult &&
                searchResult
                  .slice(0, 4)
                  .map((user, index) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            sx={{
              backgroundColor: "Red",
              color: "white",
              ":hover": {
                backgroundColor: "DarkRed",
              },
            }}
            onClick={() => handleRemove(user.user)}
          >
            Leave Group
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateGroup;
