import React from "react";
import { Avatar } from "@mui/material";

export const Profile = () => {
  return (
    <Avatar
      sx={{
        margin: "10px",
        cursor: "pointer",
      }}
      alt="Remy Sharp"
      src="/static/images/avatar/1.jpg"
    />
  );
};
