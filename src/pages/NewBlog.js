import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import blok from "../assests/blok.png";
import Typography from "@mui/material/Typography";
import { Stack, Paper } from "@mui/material";

import { getDatabase, ref, set, push } from "firebase/database";
import { database } from "../helpers/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { successNote, errorNote } from "../helpers/toastNotify";

const NewBlog = () => {
  const { user, user1, currentUser } = React.useContext(AuthContext);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const newBlog = async () => {
    const bodyData = {
      user: user1,
      title: title,
      content: content,
      category: category,
      image: image,
      status: "Published",
    };
    console.log(bodyData);
    await fetch("http://127.0.0.1:8000/blog/listcreate/", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${currentUser}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        successNote("Successfull");
        navigate("/");
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
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack
          marginTop={12}
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
            <h1> ─── New Blog ───</h1>
          </Typography>

          <Stack spacing={2} width={350}>
            <TextField
              id="outlined-title"
              label="Title *"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />

            <FormControl sx={{ m: 1, minWidth: 120, textAlign: "left" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                // // value={age}
                // onChange={handleChange}
                label="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>

                <MenuItem value={4}>Music</MenuItem>
                <MenuItem value={3}>Technology</MenuItem>
                <MenuItem value={2}>Food</MenuItem>
                <MenuItem value={1}>Travel</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-url"
              label="Image URL *"
              type="text"
              onChange={(e) => setImage(e.target.value)}
            />
            <TextField
              id="outlined-content"
              label="Content *"
              multiline
              minRows={10}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              sx={{
                minWidth: 350,
                ":hover": { bgcolor: "#D5D5D5", color: "#046582" },
              }}
              variant="contained"
              onClick={newBlog}
            >
              SUBMIT
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default NewBlog;
