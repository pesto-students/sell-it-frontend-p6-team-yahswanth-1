import React from "react";

import Sidebar from "../components/sidebar/Sidebar";
import { Header } from "../components/header/Header";

const Layout = ({ children }) => {
  return (
    <div className="main-content">
      <Header />
      <div className="content-area">
        <Sidebar />
        <div className="main-body">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
