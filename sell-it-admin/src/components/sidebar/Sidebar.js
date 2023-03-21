import React, { useState } from "react";
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
  const [selectedTab, setSelectedTab] = useState(0);
  const onTabChange = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <div className="sidebar">
      {routes.map(({ title, active, url, Icon }, index) => {
        return (
          <NavButton
            key={title}
            title={title}
            url={url}
            active={index === selectedTab}
            Icon={Icon}
            onTabChange={onTabChange}
            id={index}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
