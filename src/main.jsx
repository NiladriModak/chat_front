import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ChatProvider from "./context/ChatProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProvider>
      <CssBaseline />
      <App />
    </ChatProvider>
  </BrowserRouter>
);
