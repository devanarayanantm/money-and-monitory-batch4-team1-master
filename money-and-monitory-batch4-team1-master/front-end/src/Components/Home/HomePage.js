import React from "react";
import savemoney from "../../Assets/payments.png";
import "./Home.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="voilet-bg">
      <div className="row">
        {/* Left Half: Image */}
        <div
          className="col-md-8 left-half p-0"
          style={{ backgroundImage: `url(${savemoney})` }}
        >
          {/* Empty div for background image */}
        </div>

        {/* Right Half: Register and Login Buttons */}
        <div className="col-md-4 p-0 d-flex flex-column">
          {/* Add p-0 and d-flex flex-column here */}
          <div
            className="text-center mt-4 "
            style={{ color: "#ffffff", position: "relative", zIndex: 1 }}
          >
            <br />
            <br />
            <br />
            <h1 className="white-text">Welcome to Coin Stash!</h1>
            <br />
            <p>
              <i>
                Your Pocket-Sized Savings Buddy! Transform your everyday debit
                card transactions into savings effortlessly.
              </i>
            </p>
          </div>
          <br />
          <br />

          <div className="text-center">
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to="/login" className="btn btn-success">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
