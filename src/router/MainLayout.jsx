import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import React from "react";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
