import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@mui/material";
import SideDrawer from "../Component/miscellenous/SideDrawer";
import MyChats from "../Component/MyChats";
import ChatBox from "../Component/ChatBox";

function ChatPage() {
  const { user } = ChatState();
  const [fetchAgain, setfetchAgain] = useState(false);
  return (
    <div>
      {user && <SideDrawer />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "98%",
          height: "91.5vh",
          padding: "10px",
        }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        )}
      </Box>
    </div>
  );
}

export default ChatPage;
