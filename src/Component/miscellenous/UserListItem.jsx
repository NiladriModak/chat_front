import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

function UserListItem(props) {
  // console.log(props.user);
  return (
    <Box onClick={props.handleFunction}>
      <ListItem
        sx={{ bgcolor: "#E8E8E8", m: "4px", borderRadius: "6px" }}
        key={props.user._id}
      >
        <ListItemButton
          // onClick={props.handleFunction()}
          sx={{ overflowWrap: "anywhere" }}
        >
          <ListItemIcon>
            <img
              style={{
                width: "4vmax",
                borderRadius: "100%",
                marginRight: "6px",
              }}
              src={props.user.pic}
            />
          </ListItemIcon>

          <ListItemText
            primary={props.user.name}
            secondary={props.user.email}
          />
        </ListItemButton>
      </ListItem>
    </Box>
  );
}

export default UserListItem;
