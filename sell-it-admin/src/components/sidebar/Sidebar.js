import React, { useEffect, useState } from "react";
import { Home, Dashboard, Group } from "@mui/icons-material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CategoryIcon from "@mui/icons-material/Category";

import { useLocation } from "react-router-dom";

import { NavButton } from "./NavButton";

const routes = [
  { title: "Home", url: "/", active: true, Icon: <Home /> },
  // { title: "Dashboard", url: "/dashboard", active: false, Icon: <Dashboard /> },
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
    Icon: <LocalOfferIcon />,
  },
  {
    title: "Category management",
    url: "/category-managment",
    active: false,
    Icon: <CategoryIcon />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = routes.findIndex((item) => item.url === `/${curPath}`);
    console.log(activeItem);
    setSelectedTab(curPath.length === 0 ? 0 : activeItem);
  }, [location]);
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
            id={index}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
