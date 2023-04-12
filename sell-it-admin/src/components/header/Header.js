import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem, Box, Chip, IconButton, Button } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CloseIcon from "@mui/icons-material/Close";

import { Profile } from "../reusable";
import Logo from "../../assets/img/logo.png";
import {
  deleteAllNotifications,
  deleteNotificationById,
  getAllNotifications,
  getNotificationsUnReadCount,
} from "../../api/notification";
import { toast } from "react-hot-toast";
dayjs.extend(relativeTime);
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
const now = dayjs(); // current date and time

export const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [unReadNotificationCount, setUnReadNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
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

  useEffect(() => {
    getNotificationsUnReadCount()
      .then((res) => {
        setUnReadNotificationCount(res.data?.response?.unreadCount);
      })
      .catch((err) => console.log(err));
    getAllNotifications(page)
      .then((res) => {
        setNotifications(res.data?.message?.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const openProfile = Boolean(anchor);
  const pid = openProfile ? "profile" : undefined;

  const closeNotification = (id) => {
    deleteNotificationById(id)
      .then((res) => {
        toast.success("Notification removed");
        setNotifications((old) => old.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const removeAllNotifications = () => {
    deleteAllNotifications()
      .then((res) => {
        toast.success("Removed all");
        setNotifications([]);
      })
      .catch((err) => console.log(err));
  };

  const showMoreNotifications = () => {
    getAllNotifications(page + 1)
      .then((res) => {
        const notificationsList = res.data?.message?.results;
        setNotifications((old) => [...old, ...notificationsList]);
        setPage((old) => old + 1);
      })
      .catch((err) => console.log(err));
  };

  const NotificationItem = ({ text, time, sender, id, title }) => {
    const someDate = dayjs(time);
    const relativeTime = someDate.fromNow();
    return (
      <Box
        sx={{
          marginX: 1,
          paddingX: 1,
          backgroundColor: "#ecedf3",
          borderBottom: "1px solid #c9b3b3",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography fontSize={14} fontWeight={700}>
              {title}
            </Typography>
            <Typography fontSize={12}>{text}</Typography>
          </Box>
          <Typography fontSize={8} color={"gray"}>
            {relativeTime}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Chip label={sender} size="small" />
          <IconButton onClick={() => closeNotification(id)}>
            <CloseIcon fontSize="2" />
          </IconButton>
        </Box>
      </Box>
    );
  };
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
          badgeContent={unReadNotificationCount}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ p: 2, fontWeight: "700" }}>
              Notifications
            </Typography>
            <Button
              size="small"
              sx={{
                textTransform: "none",
              }}
              onClick={removeAllNotifications}
            >
              Clear all
            </Button>
          </Box>
          {notifications.length > 0
            ? notifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  text={notification?.description}
                  time={notification?.updatedAt}
                  sender={notification?.senderDetail?.email}
                  title={notification?.title}
                  id={notification?._id}
                />
              ))
            : "No Notifications found"}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              size="small"
              sx={{
                textTransform: "none",
              }}
              onClick={showMoreNotifications}
            >
              Show more
            </Button>
          </Box>
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
