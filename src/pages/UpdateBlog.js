import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack, Paper, CardMedia } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { successNote, errorNote } from "../helpers/toastNotify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import blok from "../assests/blok.png";
import { AuthContext } from "../contexts/AuthContext";

const UpdateBlog = () => {
  const { user, user1, currentUser } = React.useContext(AuthContext);
  const [card, setCard] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { cardId } = useParams();
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getCardsArray();
  }, []);

  let getCardsArray = async () => {
    let response = await fetch(`http://127.0.0.1:8000/blog/detail/${cardId}`);
    let data = await response.json();
    setCard(data);
    setTitle(data.title);
    setCategory(data.category);
    setImage(data.image);
    setContent(data.content);
  };

  const updateBlog = async () => {
    const bodyData = {
      user: user1,
      title: title,
      content: content,
      category: category,
      image: image,
      status: "Published",
    };
    console.log(bodyData);
    await fetch(`http://127.0.0.1:8000/blog/detail/${cardId}`, {
      method: "PUT",
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
            <h1> ─── Update ───</h1>
          </Typography>

          <Stack spacing={2} width={350}>
            <TextField
              id="outlined-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <FormControl sx={{ m: 1, minWidth: 120, textAlign: "left" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
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
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <TextField
              id="outlined-content"
              multiline
              minRows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Stack
              marginTop={2}
              marginBottom={2}
              display="flex"
              justifyContent="center"
              spacing={20}
              direction="row"
            >
              <Button variant="contained" onClick={updateBlog}>
                UPDATE
              </Button>
              <Button
                variant="contained"
                style={{ background: "red" }}
                onClick={(e) => navigate(`/details/${card.id}`)}
              >
                CANCEL
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default UpdateBlog;
