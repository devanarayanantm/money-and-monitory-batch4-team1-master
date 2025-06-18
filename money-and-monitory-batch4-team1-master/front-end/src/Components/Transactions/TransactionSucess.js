import React from "react";
import NavBarUser from "../Navbar/NavBarUser";
import { Link, useParams } from "react-router-dom";
import successimg from "../../Assets/sucess.png";
import HeaderBar from "../Header/header";
import HandleTimeout from "../Timeout/Timeout";

export default function TransactionSucess() {
  const transactionDate = new Date().toISOString()

  // Generate a random transaction ID (you can replace this with your logic)
  //temporary -- technically this should come from withdraw component
  const transactionId = useParams().transactionId;

  return (
    <div>
      <HandleTimeout/>
      <HeaderBar/>
      <div className="container mt-4">
        <div className="row justify-content-center violet-text">
          <h1>
            {" "}
            Transaction Successful <i className="fas fa-check"></i>
          </h1>
          <h4 className="transaction-date">Date: {transactionDate.split("T")[0] + " " + transactionDate.split("T")[1].substring(0,8)}</h4>
          <div className="circle-image">
            {/* You can replace this with your circle image */}
            <br></br>
            <img
              src={successimg} // Replace with your circle image URL
              alt="Circle"
              width="150"
              height="150"
            />
          </div>
          <div>
            <br></br>
            <h3 className="transaction-id">Transaction ID: {transactionId}</h3>
            <br></br>
            <Link className="btn violet-button" to="/dashboard">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
