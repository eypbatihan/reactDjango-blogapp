import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FiMessageSquare from "@mui/icons-material/Message";
import AccountCircle from "@mui/icons-material/AccountCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

import { createContext, useEffect, useState } from "react";
const Dashboard = () => {
  const { currentUser, user, user1, auth } = React.useContext(AuthContext);
  const [cardsArray, setCardsArray] = useState([]);
  const [nextPage, setNextPage] = useState([]);
  const [previousPage, setPreviousPage] = useState([]);

  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getCardsArray();
    setIsLoading();
  }, []);
  let getCardsArray = async () => {
    let response = await fetch("http://127.0.0.1:8000/blog/listcreate/");
    let data = await response.json();
    setCardsArray(data.results);
    setNextPage(data.next);
    setPreviousPage(data.previous);
  };

  let getNextPage = async () => {
    let response = await fetch(`${nextPage}`);
    let data = await response.json();
    setCardsArray(data.results);
    setPreviousPage(data.previous);
    setNextPage(data.next);
    setIsLoading();
  };
  let getPreviousPage = async () => {
    let response = await fetch(`${previousPage}`);
    let data = await response.json();
    setCardsArray(data.results);
    setNextPage(data.next);
    setPreviousPage(data.previous);
    setIsLoading();
  };
  return (
    <div
      style={{
        margin: "5rem",
        color: "#046586",
      }}
    >
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Typography
            component={"span"}
            variant="body1"
            style={{
              color: "#046582",
              fontFamily: "Girassol",
              fontSize: "1.5 rem",
            }}
          >
            <h1>─── Dashboard ───</h1>
          </Typography>
          <Grid container spacing={2}>
            {cardsArray.map((card) => (
              <Grid item key={card.id} xs={10} md={6} lg={4} xl={2}>
                <Card
                  sx={{
                    Width: 345,
                    Height: 425,
                    borderBottom: "1px solid gray",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onClick={(e) => {
                    navigate(`/details/${card.id}`);
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="post image"
                    height="150px"
                    image={card.image}
                  />
                  <CardContent
                    style={{
                      background: "#D9D9D9",
                      height: "10rem",
                      overflow: "hidden",
                    }}
                  >
                    <CardActions
                      style={{
                        width: "25rem",
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
                        {card.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {moment(card.date).startOf("hour").fromNow()} Posted
                      </Typography>
                    </CardActions>
                    <Typography variant="body2" color="text.secondary">
                      {card.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <AccountCircle style={{ marginRight: "0.5rem" }} />
                    <p>{card.user} </p>
                  </CardActions>
                  <CardActions>
                    <Button size="small">
                      <FavoriteIcon /> {card.like_count}
                    </Button>
                    <Button size="small">
                      <FiMessageSquare /> {card.comment_count}
                    </Button>
                    <Button size="small">
                      <RemoveRedEyeIcon /> {card.postview_count}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>{" "}
          <div>
            {previousPage ? (
              <Button
                sx={{
                  margin: 1,
                  bgcolor: "#046582",
                  ":hover": { bgcolor: "#D5D5D5", color: "#046582" },
                }}
                variant="contained"
                onClick={getPreviousPage}
              >
                <SkipPreviousIcon />
                PREV
              </Button>
            ) : null}
            {nextPage ? (
              <Button
                sx={{
                  margin: 1,
                  bgcolor: "#046582",
                  ":hover": { bgcolor: "#D5D5D5", color: "#046582" },
                }}
                variant="contained"
                onClick={getNextPage}
              >
                NEXT
                <SkipNextIcon />
              </Button>
            ) : null}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
