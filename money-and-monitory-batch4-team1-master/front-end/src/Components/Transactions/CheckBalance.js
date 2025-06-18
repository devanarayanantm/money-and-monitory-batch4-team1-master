import React, { useEffect } from "react";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import { useState } from "react";
import { useUser } from "../../UserContext";
import SidebarFunctions from "../Navbar/SidebarFunctions";
import HeaderBar from "../Header/header";
import { useNavigate } from "react-router-dom";
import HandleTimeout from "../Timeout/Timeout";

const CheckBalance = () => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();
  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
  };
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/login"); // Replace with your login route
    }
  }, []);
  const MSUsername = "MSUser";
  const MSPassword = "moneyAndMonitory";

  const handleCheckBalance = () => {
    // Make an API request to fetch the balance
    if (selectedAccount === "savings" || selectedAccount === "debit") {
      fetch(
        `http://localhost:8080/account-service/account/${selectedAccount}account/balance/${user.userId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(MSUsername + ":" + MSPassword),
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setBalance(data);
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
          console.error("Error fetching balance:", error);
        });
    }
  };

  return (
    <div>
      <HandleTimeout />
      <HeaderBar />
      <SidebarFunctions />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="mb-5">
              <div className="card-body">
                <h1 className="card-title text-center color">CHECK BALANCE</h1>
                <br></br>
                <div className="form-group">
                  <label style={{ fontWeight: "bold" }}>
                    Select Account Type:
                  </label>
                  <select
                    className="form-control form-select"
                    value={selectedAccount}
                    onChange={handleAccountChange}
                  >
                    <option value="">Select Account</option>
                    <option value="savings">Savings Account</option>
                    <option value="debit">Debit Card Account</option>
                  </select>
                </div>
                <button
                  className={`btn btn-primary btn-block mt-3 custom-button ${
                    !selectedAccount ? "violet-disabled" : ""
                  }`}
                  onClick={handleCheckBalance}
                  disabled={!selectedAccount}
                >
                  Check Balance
                </button>
                {error !== null && (
                  <h5 className="mt-4" style={{ color: "red" }}>
                    Enable Roundup Service Please!
                  </h5>
                )}
                {error === null && balance !== null && (
                  <div className="mt-3">
                    <h4 className="text-center">Current Balance:</h4>
                    <p
                      className="text-center bold-text"
                      style={{ fontSize: "20px", color: "#03C03C" }}
                    >
                      {`$${balance}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckBalance;
