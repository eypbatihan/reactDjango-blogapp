import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import blok from "../assests/blok.png";
import Typography from "@mui/material/Typography";
import { Paper, Stack, Link } from "@mui/material";
import GoogleButton from "react-google-button";
import { successNote, errorNote } from "../helpers/toastNotify";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { auth } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let loginUser = async () => {
    const bodyData = {
      email: email,
      password: password,
    };
    await fetch("http://127.0.0.1:8000/users/auth/login/", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.key === undefined) {
          errorNote("Failed to Login !!!");
        } else {
          localStorage.setItem("user1", jsonResponse.user.id);
          localStorage.setItem("tokenKey", jsonResponse.key);
          localStorage.setItem("user", jsonResponse.user.username);
          successNote("Successfull");
          auth();
          navigate("/");
        }
      })
      .catch((error) => {
        errorNote("POST Error !!!");
      });
  };

  return (
    <Paper
      elevation={0}
      style={{
        background: `url(https://picsum.photos/800/800)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Stack
        marginTop={5}
        paddingBottom={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          marginTop={8}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          padding={4}
          width={400}
          bgcolor="white"
          borderRadius={3}
          boxShadow="10px 5px 5px #333332 "
        >
          <Avatar
            sx={{
              bgcolor: "#046582",
              width: 220,
              height: 220,
            }}
          >
            <img style={{ width: "220px" }} src={blok} alt="blok image" />
          </Avatar>
          <Typography
            component={"span"}
            variant="body1"
            style={{
              color: "#046582",
              fontFamily: "Girassol",
              fontWeight: 800,
            }}
          >
            <h1>─── Login ───</h1>
          </Typography>

          <Stack spacing={2} width={350}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              required
              id="outlined-email"
              label="Email"
              type="mail"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-password"
              label="Password"
              type="password"
              required
            />

            <Button
              sx={{
                bgcolor: "#046582",
                ":hover": { bgcolor: "#D5D5D5", color: "#046582" },
              }}
              variant="contained"
              onClick={loginUser}
            >
              LOGİN
            </Button>

            <GoogleButton
              style={{
                width: "100%",
              }}
              type="light"
              onClick={loginUser}
            />

            <Typography component={"span"} variant="body1">
              <p>
                I don't have an account.
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </Link>
              </p>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Login;
