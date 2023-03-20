import React from "react";

import Logo from "../../assets/img/logo.png";

export const BlindFooter = () => {
  return (
    <div className="blind-header">
      <div className="header">
        <img src={Logo} alt="logo" className="logo" />
      </div>
    </div>
  );
};
