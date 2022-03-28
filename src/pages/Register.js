import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import blok from "../assests/blok.png";
import Typography from "@mui/material/Typography";
import { Paper, Stack, Link } from "@mui/material";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { successNote, errorNote } from "../helpers/toastNotify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { currentUser, user, auth } = React.useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [username, setUsername] = useState();
  const [first_name, setFirst_name] = useState();
  const [last_name, setLast_name] = useState();
  const navigate = useNavigate();

  const registertUser = async () => {
    const bodyData = {
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      password2: password2,
    };
    await fetch("http://127.0.0.1:8000/users/register/", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.token === undefined) {
          errorNote("Failed to register !!!");
        } else {
          localStorage.setItem("user1", jsonResponse.id);
          localStorage.setItem("tokenKey", jsonResponse.token);
          localStorage.setItem("user", jsonResponse.username);
          auth();
          navigate("/");
          successNote("Successfull");
        }
      })
      .catch(() => {
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
            <h1>─── Register ───</h1>
          </Typography>

          <Stack spacing={2} width={350}>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              required
              id="outlined-username"
              label="Username"
              type="text"
            />
            <TextField
              onChange={(e) => setFirst_name(e.target.value)}
              required
              id="outlined-firstname"
              label="Firstname"
              type="text"
            />
            <TextField
              onChange={(e) => setLast_name(e.target.value)}
              required
              id="outlined-Lastname"
              label="Lastname"
              type="text"
            />
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
            <TextField
              onChange={(e) => setPassword2(e.target.value)}
              id="outlined-password2"
              label="Password confirm "
              type="password"
              required
            />

            <Button
              sx={{
                bgcolor: "#046582",
                ":hover": { bgcolor: "#D5D5D5", color: "#046582" },
              }}
              variant="contained"
              onClick={registertUser}
            >
              REGİSTER
            </Button>
            <Typography component={"span"} variant="body1">
              <p>
                I have an account{" "}
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  LOGİN
                </Link>
              </p>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Register;
