import React from "react";

import Sidebar from "../components/sidebar/Sidebar";
import { Header } from "../components/header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );
};

export default Layout;
