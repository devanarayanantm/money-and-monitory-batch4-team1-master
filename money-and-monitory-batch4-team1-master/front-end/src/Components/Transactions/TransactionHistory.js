import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import "../script.css";
import { useUser } from "../../UserContext";
import Pagination from "./Pagination";
import Records from "./Records";
import SidebarFunctions from "../Navbar/SidebarFunctions";
import HeaderBar from "../Header/header";
import { useNavigate } from "react-router-dom";
import HandleTimeout from "../Timeout/Timeout";

export default function TransactionHistory() {
  const { user } = useUser();
  const [data, setTransactionData] = useState([]);
  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const MSUsername = "MSUser";
  const MSPassword = "moneyAndMonitory";
  let navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/login"); // Replace with your login route
    }
    fetch(
      "http://localhost:8080/account-service/account/debit/transactionhistory/" +
        user.userId,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(MSUsername + ":" + MSPassword),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTransactionData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <div>
      <HandleTimeout/>
      <HeaderBar />
      <SidebarFunctions />

      <div className="container">
        <div className="history">
          <Records data={currentRecords} />
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            color="secondary"
          />
        </div>
      </div>
    </div>
  );
}
