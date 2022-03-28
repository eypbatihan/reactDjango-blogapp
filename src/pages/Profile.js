import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import blok from "../assests/blok.png";
import { Paper, Stack } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

export default function ActionAreaCard() {
  const { user, user1 } = React.useContext(AuthContext);

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
        paddingBottom={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          sx={{
            maxWidth: 545,
            marginTop: "6rem",
            borderRadius: 3,
            boxShadow: "10px 5px 5px #333332 ",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="440"
              image={blok}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <p>Display Name</p>
                <h5>{user ? user : "name not founded"}</h5>
              </Typography>
              <Typography
                component={"div"}
                variant="body1"
                color="text.secondary"
              >
                <h4>Email</h4>
                {user}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </Paper>
  );
}
