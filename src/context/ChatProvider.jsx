import { useNavigate } from "react-router-dom";

import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext(null);
const ChatProvider = (props) => {
  const [user, setUser] = useState();
  // const [newsocket, setNewsocket] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const navigator = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigator("/login");
    } else {
      setUser(userInfo);
    }
  }, [navigator]);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
