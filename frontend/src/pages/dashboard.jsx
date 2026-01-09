import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MainGrid from "../components/MainGrid";
import { Outlet } from "react-router-dom";
import "../assets/main.css";

export default function Dashboard({ role }) {
  return (
    <div className="main-container">
      <Navbar role={role} />
      <div className="main-content">
        <Header />
        <div className="content-area">
          {/* Page content goes here */}
          {/* <h2>Dashboard Overview</h2>
           <MainGrid></MainGrid> */}
          <Outlet></Outlet>

        </div>
      </div>
    </div>
  );
}
