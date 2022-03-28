import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { CardHeader, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FiMessageSquare from "@mui/icons-material/Message";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getDatabase, remove, ref } from "firebase/database";
import moment from "moment";
import { AuthContext } from "../contexts/AuthContext";
import { successNote, errorNote } from "../helpers/toastNotify";
import { flexbox } from "@mui/system";
import TextField from "@mui/material/TextField";

const Details = () => {
  const { currentUser, user, user1 } = React.useContext(AuthContext);
  const [cardsArray, setCardsArray] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [content, setContent] = useState();

  const { cardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCardsArray();
    setIsLoading();
    postView();
  }, []);

  let getCardsArray = async () => {
    let response = await fetch(`http://127.0.0.1:8000/blog/detail/${cardId}`);
    let data = await response.json();
    setCardsArray(data);
  };

  let like = async () => {
    const bodyData = { user: user1 };
    fetch(`http://127.0.0.1:8000/blog/detail/${cardId}/like`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${currentUser}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        getCardsArray();
      })
      .catch((error) => {
        alert("POST Error !!!");
      });
  };

  let postView = async () => {
    const bodyData = { user: user1 };
    fetch(`http://127.0.0.1:8000/blog/detail/${cardId}/postview`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${currentUser}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        getCardsArray();
      })
      .catch((error) => {
        alert("POST Error !!!");
      });
  };
  let postdelete = async () => {
    await fetch(`http://127.0.0.1:8000/blog/detail/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${currentUser}`,
      },
    })
      .then(() => {
        navigate("/");
        successNote("Successfull Deleted");
      })
      .catch((error) => {
        alert("POST Error !!!");
      });
  };

  let newComment = async () => {
    const bodyData = {
      user: user1,
      content: content,
    };
    fetch(`http://127.0.0.1:8000/blog/detail/${cardId}/comment`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${currentUser}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setContent("");
        getCardsArray();
      })
      .catch((error) => {
        alert("POST Error !!!");
      });
  };
  console.log(cardsArray);
  return (
    <div>
      <Stack
        key={cardsArray.id}
        marginTop={4}
        direction="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Stack
          marginTop={5}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          padding={4}
          width={800}
          bgcolor="white"
          borderRadius={3}
        >
          <Typography
            component={"span"}
            variant="body1"
            style={{
              color: "#046582",
              fontFamily: "Girassol",
              fontWeight: 800,
            }}
          >
            <h1> ─── Details ───</h1>
          </Typography>
          <CardContent
            sx={{
              width: 500,
              Height: 425,
              borderBottom: "1px solid gray",
              cursor: "pointer",
            }}
          >
            <CardMedia
              component="img"
              alt="post image"
              height="300px"
              image={cardsArray.image}
            />
            <CardContent
              style={{
                background: "#D9D9D9",
                height: "125px",
                overflow: "hidden",
              }}
            >
              <CardActions
                style={{
                  width: "450px",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 1,
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontFamily="Girassol"
                  color="#046582"
                >
                  {cardsArray.title}
                </Typography>
                <Typography
                  component={"div"}
                  variant="body1"
                  color="text.secondary"
                >
                  {moment(cardsArray.date).startOf("hour").fromNow()} Posted
                </Typography>
              </CardActions>
              <Stack
                sx={{
                  height: 80,
                  overflow: "auto",
                }}
              >
                <Typography
                  component={"div"}
                  variant="body2"
                  color="text.secondary"
                >
                  {cardsArray.content}
                </Typography>
              </Stack>
            </CardContent>

            <CardActions>
              <AccountCircle style={{ marginRight: "0.5rem" }} />
              <p>{cardsArray.user} </p>
            </CardActions>
            <CardActions>
              <Button size="small" type="submit" onClick={like}>
                <FavoriteIcon /> {cardsArray.like_count}
              </Button>
              <Button size="small">
                <FiMessageSquare /> {cardsArray.comment_count}
              </Button>
              <Button size="small">
                <RemoveRedEyeIcon /> {cardsArray.postview_count}
              </Button>
            </CardActions>
            {user ? (
              <Stack>
                <TextField
                  id="outlined-content"
                  label="Comment *"
                  multiline
                  minRows={2}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Button variant="contained" onClick={newComment}>
                  SEND
                </Button>
              </Stack>
            ) : null}
          </CardContent>
          {cardsArray.comments
            ? cardsArray.comments.map((comment) => {
                return (
                  <Card
                    id={comment.id}
                    style={{
                      width: 500,
                      display: "flex",
                      justifyContent: "left",
                      textAlign: "left",
                      paddingLeft: 1,
                      background: "#EDD8B0",
                    }}
                  >
                    <CardContent>
                      <CardActions
                        style={{
                          width: 480,
                          display: "flex",
                          justifyContent: "space-between",
                          paddingLeft: 1,
                        }}
                      >
                        <Typography
                          style={{
                            marginRight: "0.5rem",
                          }}
                        >
                          <small>by</small> <strong>{comment.user}</strong>
                        </Typography>
                        <Typography sx={{ fontWeight: "light", m: 1 }}>
                          <small>
                            {moment(comment.time_stamp)
                              .startOf("hour")
                              .fromNow()}{" "}
                            Posted
                          </small>
                        </Typography>
                      </CardActions>
                      <Stack
                        sx={{
                          height: 60,
                          overflow: "auto",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {comment.content}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })
            : null}

          {cardsArray.user === user ? (
            <Stack
              marginTop={2}
              marginBottom={2}
              display="flex"
              justifyContent="center"
              spacing={20}
              direction="row"
            >
              <Button
                variant="contained"
                onClick={(e) => navigate(`/update/${cardsArray.id}`)}
              >
                UPDATE
              </Button>
              <Button
                variant="contained"
                style={{ background: "red" }}
                onClick={postdelete}
              >
                DELETE
              </Button>
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </div>
  );
};

export default Details;
