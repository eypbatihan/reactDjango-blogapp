import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import blok from "../assests/blok.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FiMessageSquare from "@mui/icons-material/Message";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Stack } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

export default function BlogCard() {
  const { cardsArray } = React.useContext(AuthContext);
  console.log(cardsArray);
  return (
    <div>
      {cardsArray.map((card) => (
        <div key={card.id}>
          <Card sx={{ maxWidth: 345, border: "1px solid" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={card.url}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.content}
              </Typography>
              <CardActions>
                <AccountCircle style={{ marginRight: "0.5rem" }} />
                <p>wizard@gmail.com </p>
              </CardActions>
            </CardContent>
            <CardActions>
              <Button size="small">
                <FavoriteIcon />
              </Button>
              <Button size="small">
                <FiMessageSquare />
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
}
