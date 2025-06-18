import React, { useEffect } from "react";
import NavBarUser from "../Navbar/NavBarUser";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import Sidebar from "./sidebar";
import SidebarFunctions from "../Navbar/SidebarFunctions";
import HeaderBar from "../Header/header";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import HandleTimeout from '../Timeout/Timeout';

function Dashboard() {
  const { user } = useUser();
  let navigate = useNavigate();
  useEffect(() => {
    // Check if the user is not logged in and navigate to the login page
    console.log(user);
    if (Object.keys(user).length === 0) {
      navigate("/login"); // Replace with your login route
    }
  }, []);
  return (
    <div>
      <HandleTimeout/>
      <div>
        <HeaderBar />
        <SidebarFunctions />
      </div>
      <div className="container">
        <Sidebar></Sidebar>
      </div>
    </div>
  );
}

export default Dashboard;
