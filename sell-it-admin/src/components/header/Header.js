import React from "react";

import { Profile } from "../reusable";
import Logo from "../../assets/img/logo.png";

export const Header = () => {
  return (
    <div className="header">
      <Profile />
      <img src={Logo} alt="logo" className="logo" />
    </div>
  );
};
