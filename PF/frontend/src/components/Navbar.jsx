import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import { ReactComponent as MainLogo } from "../images/TFC_main.svg";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = ["studios", "classes", "subscriptions"];

function Navbar({ isNotHomePage }) {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");

  const navigate = useNavigate();

  const isAuth = !!accessToken; // boolean value

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    cookie.remove("accessToken");
    navigate("/")
    window.location.reload();

  }

  return (
    <AppBar style={{ backgroundColor: "#d62828" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MainLogo style={{ width: "15%" }}></MainLogo>
          {isNotHomePage && (
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <NavLink
                to={`/`}
                style={{ color: "white", textDecoration: "none" }}
              >
                Home
              </NavLink>
            </Button>
          )}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink
                  to={`/${page}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {page}
                </NavLink>
              </Button>
            ))}
          </Box>
          {/* Renders this part only if it's not on the login page. */}
          {/* I removed !!!isNotHomePage because we want login/signup button to show up everywhere */}
          {!!!isAuth && (
            <Button
              sx={{ my: 2, color: "white", display: "block", right: "40px" }}
            >
              <NavLink
                to={`/login`}
                style={{ color: "white", textDecoration: "none" }}
              >
                Login / Sign Up
              </NavLink>
            </Button>
          )}
          {isAuth && (
            <>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >

                  <AccountCircleIcon sx={{ color: "white", width: 32, height: 32 }}>M</AccountCircleIcon>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => {
                  navigate('/myaccount');
                }}>
                  My account
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={() => handleLogoutClick()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
