import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  List,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "../../axioss";
import { toast } from "react-toastify";
import UserListItem from "./UserListItem";
import Loading from "../Loading";
import UserBadgeItem from "../SelectedUserBadge/UserBadgeItem";

function GroupChatDialog({ children }) {
  const [onOpen, setOnOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleClose = () => {
    setOnOpen(false);
  };

  const handleGroup = (userToSelect) => {
    if (selectedUsers.includes(userToSelect)) {
      toast.warning("user already selected");
      return;
    }
    setSelectedUsers([...selectedUsers, userToSelect]);
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
      setSearchResults(data.users);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
  };

  const handleSubmit = async () => {
    try {
      if (!selectedUsers || !groupChatName) {
        toast.warning("Enter all feilds to create  group chat");
        return;
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chats/createGroup",
        {
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
          groupName: groupChatName,
        },
        config
      );

      setChats([data.fullGroupChat[0], ...chats]);
      toast.success("Group created");
      setOnOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <span
        onClick={() => {
          setOnOpen(true);
        }}
      >
        {children}
      </span>
      <Dialog open={onOpen} onClose={handleClose}>
        <DialogTitle
          sx={{
            fontSize: "35px",
            fontFamily: "Roboto",
            justifyContent: "center",
          }}
        >
          Create new group
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl sx={{ margin: "8px" }}>
            <TextField
              label="Group Name"
              onChange={(e) => {
                setGroupChatName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl sx={{ margin: "8px" }}>
            <TextField
              label="Add Users Eg:nilu,antu,.."
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </FormControl>
          <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </Box>
          {loading ? (
            <Loading />
          ) : (
            <List>
              {searchResults &&
                searchResults
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
          <Button variant="contained" onClick={handleSubmit}>
            Create Chat
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GroupChatDialog;
