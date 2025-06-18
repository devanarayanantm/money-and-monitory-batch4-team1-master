import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

export default function NavbarFunctions() {
  const { user } = useUser(); // Get the user from the context
  let navigate = useNavigate(); // Get the navigate function from the router

  const handleSavingsAccountLinkClick = (event) => {
    // Check if the user's roundoff is enabled
    console.log(user);
    if (user && user.roundUpSavings) {
      // If roundoff is enabled, navigate to the Savings Account page
      return;
    } else {
      // If roundoff is not enabled, show an alert
      alert("Round Off is not enabled. Please enable it first.");
      <div class="alert alert-primary" role="alert">
        This is a primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
      </div>
      //navigate("/roundup")

      event.preventDefault();
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/dashboard"} class="nav-link violet-text">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/transfermoney"} class="nav-link violet-text">
                  Pay
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/transactionhistory"} class="nav-link violet-text">
                  Statement
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/savingsaccount"
                  className="nav-link violet-text"
                  onClick={handleSavingsAccountLinkClick} // Add the click event handler
                >
                  Savings Account
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/checkbalance"} class="nav-link violet-text">
                  Check Balance
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/deposit"} class="nav-link violet-text">
                  Deposit
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/roundup"} class="nav-link violet-text">
                  Round Up Savings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
