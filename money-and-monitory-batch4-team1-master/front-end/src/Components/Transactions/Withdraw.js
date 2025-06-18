import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "./withdraw.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import NavbarSavings from "../Navbar/NavbarSavings";
import HeaderBar from "../Header/header";
import HandleTimeout from "../Timeout/Timeout";

export default function Withdraw() {
  const { user } = useUser();

  const [selectedAccount, setSelectedAccount] = useState(""); // State to store selected account
  const [withdrawAmount, setWithdrawAmount] = useState(""); // State to store withdrawal amount
  const MSUsername = "MSUser";
  const MSPassword = "moneyAndMonitory";

  let navigate = useNavigate();

  useEffect(() => {
    // Fetch savings account number when the component mounts
    if (Object.keys(user).length === 0) {
      navigate("/login"); // Replace with your login route
    }
    const userId = user.userId;
    axios
      .get(
        `http://localhost:8080/account-service/account/savingsaccount/${userId}`,
        {
          auth: {
            username: MSUsername,
            password: MSPassword,
          },
        }
      )
      .then((res) => {
        setSelectedAccount(String(res.data.savingsAccountNumber));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.userId]); // Dependency array ensures this effect runs when userId changes

  const handleAmountChange = (event) => {
    setWithdrawAmount(event.target.value);
  };

  const handleSubmit = async () => {
    //Assuming withdraw only for savings account
    const userId = user.userId;

    await axios
      .put(
        `http://localhost:8080/account-service/account/savingsaccount/withdraw/${userId}/${withdrawAmount}`,
        {},
        {
          auth: {
            username: MSUsername,
            password: MSPassword,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Withdraw Successful");
          console.log(res.data.referenceNumber);
          let transactionId = res.data.referenceNumber.toString();
          console.log(transactionId);
          navigate(`/transactionsuccess/${transactionId}`);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Handle the 400 Bad Request error and show an alert
          alert("Insufficient funds!");
        } else if (error.response && error.response.status === 412) {
          alert("Account is locked");
        } else {
          // Handle other errors here
          navigate("/transactionfail");
        }
      });
  };

  const handleCancel = () => {
    // Handle cancel logic here (e.g., resetting form fields)
    setWithdrawAmount("");
  };

  return (
    <div>
      <HandleTimeout />
      <HeaderBar />
      <NavbarSavings />

      <div className="row">
        <div className="col depositLeftPaneWithdraw">

        </div>
        <div className="col">
          <div className="container mt-4">
          <div className="row">
            <div className="col-md-10">
              <div className="card cardbg-color" style={{ marginTop: "40px" }}>
                <div className="card-body">
                  <h2 className="card-title color">WITHDRAW</h2>
                  <br />
                  <form className="text-start white-text">
                    <div className="mb-3">
                      <label htmlFor="accountSelect" className="form-label">
                        Account Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="account"
                        value={selectedAccount}
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="amount" className="form-label">
                        Amount
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="amount"
                        value={withdrawAmount}
                        onChange={handleAmountChange}
                        placeholder="Enter Amount to withdraw"
                      />
                    </div>
                    <br />
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn whitebutton"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={handleCancel}
                        style={{ fontWeight: "bold" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      
    </div>
  );
}
