import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

export default function SidebarFunctions() {
  const { user } = useUser(); // Get the user from the context

  let navigate = useNavigate();
  const handleSavingsAccountLinkClick = (event) => {
    // console.log(user);
    //if (user && user.roundUpSavings) {
    navigate("/savingsaccount");
    // } else {
    //   alert("Round Off is not enabled. Please enable it first.");
    //   event.preventDefault();
    // }
  };
  const handleSidebarClick = (e) => {
    e.preventDefault();
    if (e.target.value != "/savingsaccount") navigate(e.target.value);
    else {
      handleSavingsAccountLinkClick(e);
    }
  };
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div
      class="d-flex flex-column flex-shrink-0 p-3 text-dark"
      style={{
        width: "220px",
        position: "fixed",
        height: "-webkit-fill-available",
      }}
    >
      <div class="h4">Debit Account</div>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <div className="h4">
            <button
              type="button"
              class="btn btn-block text-white"
              style={{ backgroundColor: "#490778" }}
              value="/dashboard"
              onClick={handleSidebarClick}
            >
              Dashboard
            </button>
          </div>
        </li>
        <li class="nav-item">
          <div className="h4">
            <button
              type="button"
              class="btn btn-block text-white"
              style={{ backgroundColor: "#490778" }}
              value="/transfermoney"
              onClick={handleSidebarClick}
            >
              Pay
            </button>
          </div>
        </li>
        <li>
          <div className="h4">
            <button
              type="button"
              class="btn btn-block text-white"
              style={{ backgroundColor: "#490778" }}
              value="/transactionhistory"
              onClick={handleSidebarClick}
            >
              Statement
            </button>
          </div>
        </li>
        <li>
          <div className="h4">
            <button
              type="button"
              class="btn btn-block text-white"
              style={{ backgroundColor: "#490778" }}
              value="/savingsaccount"
              onClick={handleSidebarClick}
            >
              Savings Account
            </button>
          </div>
        </li>
        <li>
          <div className="h4">
            <button
              type="button"
              class="btn btn-block text-white"
              style={{ backgroundColor: "#490778" }}
              value="/checkbalance"
              onClick={handleSidebarClick}
            >
              Check Balance
            </button>
          </div>
        </li>
        <li>
          <div className="h4">
            <button
              type="button"
              class="btn btn-block text-white"
              style={{ backgroundColor: "#490778" }}
              value="/deposit"
              onClick={handleSidebarClick}
            >
              Deposit
            </button>
          </div>
        </li>
        <li>
          <div className="h4">
            <button
              type="button"
              class="btn btn-block text-white"
              style={{ backgroundColor: "#490778" }}
              value="/roundup"
              onClick={handleSidebarClick}
            >
              Round Up Savings
            </button>
          </div>
        </li>
        <li>
          <hr />
          <button
            className="btn btn-block"
            style={{
              borderColor: "white",
              backgroundColor: "#490778",
              color: "white",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
        <hr />
      </ul>
    </div>
  );
}
