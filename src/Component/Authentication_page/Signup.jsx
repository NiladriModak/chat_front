import React, { useState } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import Login from "./Login";
import { toast } from "react-toastify";
import axios from "../../axioss";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

function Signup() {
  const [alignment, setAlignment] = useState("signup");
  // const [pic, setPic] = useState();
  // const [picloading, setPicLoading] = useState(false);
  // const postImage = (pics) => {
  //   setPicLoading(true);
  //   if (pics === undefined) {
  //     console.log("select img");
  //     return;
  //   }
  //   console.log(pics);
  //   if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //     const data = new FormData();
  //     data.append("file", pics);
  //     data.append("upload-preset", "chat-app");
  //     data.append("cloud_name", "dsd8hp9wx");
  //     fetch("https://api.cloudinary.com/v1_1/chat-app/image/upload", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setPic(data.url.toString());
  //         console.log(data.url.toString());
  //         setPicLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setPicLoading(false);
  //       });
  //   } else {
  //     // toast.warning("Picture not uploaded");
  //     console.log("object");
  //     setPicLoading(false);
  //   }
  // };
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const navigator = useNavigate();
  //submit handler
  const submitHandler = async () => {
    setLoading(true);
    if (password !== confirmpassword) {
      toast.warning("The confirm password does not matches");
      setLoading(false);
      return;
    }
    if (!name || !email || !password || !confirmpassword) {
      toast.warning("Please enter all required details");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        "/api/register",
        { name, email, password },
        config
      );
      // console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("registration successful");
      navigator("/chats");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      {alignment === "login" ? (
        <Login />
      ) : (
        <Container
          sx={{
            width: "40vmax",
            height: "fit-Content",
            padding: "1vmax",
            border: "1px solid grey",
            backgroundColor: "white",
          }}
        >
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
                  label="Name"
                  placeholder="Please enter text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
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
                <TextField
                  required
                  id="outlined-required"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={(e) => {
                    setConfirmpassword(e.target.value);
                  }}
                />
              </div>
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "4px",
                  padding: "4px",
                  width: "100%",
                }}
              >
                <TextField
                  accept="image/*"
                  onChange={(e) => postImage(e.target.files[0])}
                  type="file"
                />
              </div> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "4px",
                  padding: "4px",
                  width: "100%",
                }}
              >
                <Button
                  // type="submit"
                  onClick={submitHandler}
                  variant="contained"
                >
                  Sign Up
                </Button>
              </div>
            </Stack>
          </Box>
        </Container>
      )}
    </>
  );
}

export default Signup;
