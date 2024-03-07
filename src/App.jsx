import React from "react";
import Login from "./Component/Authentication_page/Login";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ChatPage from "./pages/ChatPage";
import whatsappImage from "./whatsapp.jpg";
function App() {
  return (
    <div style={{ backgroundImage: `url(${whatsappImage})` }}>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
