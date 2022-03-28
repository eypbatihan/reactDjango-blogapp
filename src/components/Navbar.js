import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import cw from "../assests/cw.svg";
import { AuthContext } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { purple } from "@mui/material/colors";
import { display } from "@mui/system";

export default function MenuAppBar() {
  const { currentUser, user, auth } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const logout = async () => {
    fetch("http://127.0.0.1:8000/users/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${currentUser}`,
      },
    })
      .then((response) => {
        localStorage.clear();
        auth();
        navigate("/login");
      })
      .catch((error) => {
        alert("POST Error !!!");
      });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(currentUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: "#046582" }}>
        <Toolbar>
          <Link href="/">
            <img style={{ width: "45px" }} src={cw} alt="cw image" />
          </Link>

          <Typography
            style={{
              fontFamily: "Girassol",
              fontSize: "25px",
              fontWeight: 800,
            }}
            variant="body1"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link href="/" underline="none" color={"#F5DEB3"}>
              {"────< BatıhaN >────"}
            </Link>
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {currentUser ? <MenuItem>{user}</MenuItem> : <AccountCircle />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {currentUser ? (
                <div onClick={handleClose}>
                  <MenuItem onClick={() => navigate("/profil")}>
                    Profile
                  </MenuItem>

                  <MenuItem onClick={() => navigate("/newblog")}>New</MenuItem>

                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </div>
              ) : (
                <div onClick={handleClose}>
                  <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>

                  <MenuItem onClick={() => navigate("/register")}>
                    Register
                  </MenuItem>
                </div>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <ToastContainer />
    </Box>
  );
}
