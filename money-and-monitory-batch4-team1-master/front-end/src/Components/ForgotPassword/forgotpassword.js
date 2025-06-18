import React, { useState } from "react";
import RegisterNav from "../Navbar/RegisterNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../Header/header";

function ForgotPassword() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    pin: "",
    password: "",
  });
  const MSUsername = 'MSUser';
  const MSPassword = 'moneyAndMonitory';
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (e.target.name === "password") {
      // Validate the password using a regular expression
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      const isValid = passwordRegex.test(value);
      console.log(isValid);
    }
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (!isPasswordValid) {
      alert("Invalid Password");
    } else if (user.password === confirmPassword) {
      // Passwords match, you can proceed with changing the password
      // You can add your logic to update the password in your backend here
      axios
        .put(
          "http://localhost:8080/user-management-service/user/forgotPassword",
          user,
          {
            auth: {
                username: MSUsername,
                password: MSPassword
              }
        }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("Password Changed Successfully");
            console.log("sucess");
            navigate("/login");
          }
        })
        .catch((error) => {
          alert("Incorrect Pin");
        });
    } else {
      alert("Password missmatch");
    }
  };

  return (
    <div>
      <HeaderBar/>
      <RegisterNav></RegisterNav>
      <div className="login-container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4 custom-column">
            <div class="card">
              <div className="card-body">
                <h3 className="card-title text-center violet-text bold-text">
                  Forgot Password?
                </h3>
                <form>
                  <div className="form-group mb-3 mt-4">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email ID"
                      required
                      name="email"
                      value={user.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group mb-3 mt-4">
                    <input
                      type="password"
                      className="form-control"
                      id="pin"
                      placeholder="Pin"
                      required
                      name="pin"
                      value={user.pin}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group mb-3 mt-4">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Set new password"
                      required
                      name="password"
                      value={user.password}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group mb-3 mt-4">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword2"
                      placeholder="Confirm password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4 custom-button"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
