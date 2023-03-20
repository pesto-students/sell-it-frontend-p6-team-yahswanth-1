import React from "react";
import { Home, Dashboard, Group } from "@mui/icons-material";

import { NavButton } from "./NavButton";

const routes = [
  { title: "Home", url: "/", active: true, Icon: <Home /> },
  { title: "Dashboard", url: "/dashboard", active: false, Icon: <Dashboard /> },
  {
    title: "User management",
    url: "/user-managment",
    active: false,
    Icon: <Group />,
  },
  {
    title: "Bid management",
    url: "/bid-managment",
    active: false,
    Icon: <Dashboard />,
  },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      {routes.map(({ title, active, url, Icon }) => {
        return (
          <NavButton
            key={title}
            title={title}
            url={url}
            active={active}
            Icon={Icon}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
