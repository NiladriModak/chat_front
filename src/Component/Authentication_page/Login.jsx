import React, { useEffect, useState } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import Signup from "./Signup";
import axios from "../../axioss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [alignment, setAlignment] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();
  const submitHandler = async () => {
    setLoading(true);

    if (!email || !password) {
      toast.warning("Please enter all required details");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      };
      const { data } = await axios.post(
        "/api/login",
        { email, password },
        config
      );
      // console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("login successful");
      navigator("/chats");
      setLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigator("/chats");
    }
  }, [navigator]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        // backgroundColor: "yellow",
      }}
    >
      {alignment === "signup" ? (
        <Signup />
      ) : (
        <Container
          sx={{
            width: "40vmax",
            height: "fit-Content",
            padding: "1vmax",
            border: "1px solid grey",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <h1>ECONNECT</h1>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              margin: "40px 0 15px 0",
              border: "1px solid green",
            }}
          >
            <ToggleButtonGroup
              sx={{ width: "100%", border: "1px solid blue" }}
              color="primary"
              value={alignment}
              exclusive
              aria-label="Platform"
              onChange={handleChange}
            >
              <ToggleButton sx={{ width: "50%" }} value="login">
                Login
              </ToggleButton>
              <ToggleButton sx={{ width: "50%" }} value="signup">
                Sign up
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "40px 0 15px 0",
              border: "1px solid green",
              padding: "1vmax 0",
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              sx={{ width: "90%", font: "1.1rem Roboto" }}
              spacing={2}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "4px",
                  padding: "4px",
                  width: "100%",
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  placeholder="Please enter text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "4px",
                  padding: "4px",
                  width: "100%",
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Password"
                  type="password"
                  placeholder="Please enter text"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "4px",
                  padding: "4px",
                  width: "100%",
                }}
              >
                <Button onClick={submitHandler} variant="contained">
                  Login
                </Button>
              </div>
              <div>Forget Password</div>
            </Stack>
          </Box>
        </Container>
      )}
    </div>
  );
}

export default Login;
