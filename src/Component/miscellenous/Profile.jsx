import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
const Profile = ({ user, children }) => {
  //console.log("profile ", user);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {children ? (
        <span onClick={handleClick}>{children}</span>
      ) : (
        // <IconButton
        //   d={{ base: "flex" }}
        //   icon={<VisibilityIcon />}
        //   onClick={handleClick}
        // />
        <Button onClick={handleClick} sx={{ display: "flex" }}>
          <VisibilityIcon />
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{ fontSize: "2rem", display: "flex", justifyContent: "center" }}
        >
          {user.name}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <img
            style={{ width: "20vw", borderRadius: "100%" }}
            src={user.pic}
            alt={user.name}
          />
          <Typography sx={{ fontSize: "1.1rem" }}>{user.email}</Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
