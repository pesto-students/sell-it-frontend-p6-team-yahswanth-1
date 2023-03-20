import React from "react";
import { Link } from "react-router-dom";

export const NavButton = ({ title, url, active, Icon }) => {
  return (
    <Link to={url}>
      <div className={`nav-button ${active ? "active" : ""}`}>
        {Icon}
        <span className="title-button">{title}</span>
      </div>
    </Link>
  );
};
