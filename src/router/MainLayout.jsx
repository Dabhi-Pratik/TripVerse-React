import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/ui/Navbar";

import React from "react";

const MainLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};

export default MainLayout;
