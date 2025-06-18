import React, { useState } from "react";
import { useUser } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderBar from "../Header/header";
import SidebarFunctions from "../Navbar/SidebarFunctions";

export default function EditProfile() {
  let navigate = useNavigate();
  const { user, updateUser } = useUser();
  const MSUsername = "MSUser";
  const MSPassword = "moneyAndMonitory";

  const [formData, setFormData] = useState({
    userId: user.userId,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    dob: user.dob,
    address: user.address,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        "http://localhost:8080/user-management-service/user/updateprofile",
        formData,
        {
          auth: {
            username: MSUsername,
            password: MSPassword,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Update Successful");
          updateUser(response.data);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Update Failed");
      });
  };

  return (
    <div>
      <HeaderBar />
      <SidebarFunctions />
      <div
        className="container mt-5"
        style={{ maxWidth: "600px", maxHeight: "500px" }}
      >
        <div className="card mb-3">
          <div className="card-body view-profile">
            <h3 className="mb-4 violet-text bold-text">
              EDIT PROFILE
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  //onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="text" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="btn violet-button">
                Save
              </button>
              <Link to="/dashboard" className="btn btn-secondary ms-2">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
