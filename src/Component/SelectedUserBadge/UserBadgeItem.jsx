import { Box } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
function UserBadgeItem(props) {
  return (
    <Box
      sx={{
        paddingX: "2px",
        paddingY: "1px",
        border: "1px solid black",
        borderRadius: "6px",
        fontSize: "15px",
        cursor: "pointer",
        height: "fitContent",
        textAlign: "center",
        backgroundColor: "#AC25D1",
        color: "white",
      }}
    >
      {props.user.name}
      <CloseIcon onClick={props.handleFunction} sx={{ width: "15px" }} />
    </Box>
  );
}

export default UserBadgeItem;
