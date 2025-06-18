import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import userprofile from "../../Assets/user-profile.png";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

export default function NavBarUser() {
  const { user } = useUser();

  let navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-violet">
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100">
          <Link
            to="/viewprofile"
            className="navbar-brand"
            style={{ color: "#490778" }}
          >
            <img
              src={userprofile} // Replace with your profile image URL
              alt="Profile"
              width="30"
              height="30"
              className="d-inline-block align-top rounded-circle me-2"
            />
            {user.name}
          </Link>
          <button
            className="btn"
            style={{
              borderColor: "white",
              backgroundColor: "#490778",
              color: "white",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
