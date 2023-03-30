import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";

import { Profile } from "../reusable";
import Logo from "../../assets/img/logo.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
export const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchor, setAnchor] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const showProfile = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClose = () => {
    setAnchor(null);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const openProfile = Boolean(anchor);
  const pid = openProfile ? "profile" : undefined;
  return (
    <div className="header">
      <div
        role="button"
        style={{
          marginLeft: 12,
        }}
        onClick={showProfile}
      >
        <Profile />
      </div>
      <Link to={"/"}>
        <img src={Logo} alt="logo" className="logo" />
      </Link>

      <Search
        sx={{
          marginLeft: 10,
        }}
      >
        <SearchIconWrapper>
          <SearchIcon
            sx={{
              color: "rgba(47, 128, 237, 1)",
            }}
          />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <div className="notification">
        <Badge
          badgeContent={4}
          sx={{
            fontSize: 6,
          }}
          color="primary"
        >
          <NotificationsIcon
            sx={{
              cursor: "pointer",
            }}
            color="action"
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          />
        </Badge>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover>
        <Menu
          id={pid}
          anchorEl={anchor}
          open={openProfile}
          onClose={handleProfileClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};
