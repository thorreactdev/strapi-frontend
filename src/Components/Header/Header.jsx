import React, { useEffect, useState, useContext } from "react";
import "./Header.scss";
import { Box, Typography, List, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Link } from "react-router-dom";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";
import Search from "./Search/Search";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import Typography from '@mui/material/Typography';
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/api";
import MenuSharpIcon from '@mui/icons-material/MenuSharp';

const Header = () => {
  const Navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showSearchModal, setSearchModal] = useState(false);
  const {
    cartCount,
    showCart,
    setShowCart,
    isAuthenticated,
    jsonUserData,
    handleLogout,
    userInfo,
    wishlistCount
  } = useContext(Context);

  console.log(userInfo);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScroll = () => {
    const offSet = window.scrollY;
    if (offSet > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleConfirmLogout = () => {
    handleLogout();
    Navigate("/logout");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`main-header  ${scrolled ? "sticky-header" : ""}`}>
        <Box className="header-content">
          <List className="list-item">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography className="list-item-name" title="home">
                Home
              </Typography>
            </Link>
            <Typography className="list-item-name" title="About">
              About
            </Typography>
            <Typography className="list-item-name" title="categories">
              Categories
            </Typography>
          </List>
          <Box className="logo">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography title="logo Headstore" className="logo-text">
                HEADSTORE.
              </Typography>
            </Link>
          </Box>
          <Box className="header-icons">
            <SearchIcon
              titleAccess="search icon"
              className="single-icons"
              onClick={() => setSearchModal(true)}
            />
            <Link
              to="/wishlist"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <span className="cart-icon">
                <FavoriteBorderOutlinedIcon
                  titleAccess="wishlist"
                  className="single-icons"
                />
                <span className="cart-wishlist">{wishlistCount}</span>
              </span>
            </Link>

            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <LocalMallOutlinedIcon
                titleAccess="cart"
                className="single-icons"
              />
              <span>{cartCount}</span>
            </span>
            <span>
              {/* <MenuSharpIcon fontSize="large"/> */}
            </span>
            {isAuthenticated ? (
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}

                  className="login-detials"
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{
                        mt: -1,
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      {!userInfo?.img?.formats?.small?.url ? (
                        <Avatar
                          sx={{ width: 32, height: 32 }}
                          src="/broken-image.jpg"
                        />
                      ) : (
                        <img
                          src={`${baseURL}${userInfo?.img?.formats?.small?.url}`}
                          alt=""
                          width={35}
                          height={35}
                          style={{ borderRadius: "50%" }}
                        />
                      )}

                      <Typography sx={{ color: "#FFF" }}>
                        Welcome, {jsonUserData?.username}
                      </Typography>
                    </IconButton>
                  </Tooltip>
                </Box>
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
                      "&::before": {
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
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </MenuItem>
                  <Link to="/api/user/order" style={{ color : "#000" , textDecoration : "none"}}>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My Order
                  </MenuItem>
                  </Link>
                  
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleConfirmLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>
            ) : (
              <Box className="not-authenicated-div">
                <Link to="/register">
                  <Button variant="contained">Signup</Button>
                </Link>
                <Link to="/login">
                  <Button variant="contained">login</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </header>
      {showSearchModal && <Search setSearchModal={setSearchModal} />}
      {showCart && <Cart />}
    </>
  );
};

export default Header;
