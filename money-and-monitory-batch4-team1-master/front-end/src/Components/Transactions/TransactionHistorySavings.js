import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import NavBarUser from "../Navbar/NavBarUser";
import NavbarSavings from "../Navbar/NavbarSavings";
import Table from "react-bootstrap/Table";
import Records from "./Records";
import Pagination from "./Pagination";
import HeaderBar from "../Header/header";
import { useNavigate } from "react-router-dom";
import HandleTimeout from "../Timeout/Timeout";

export default function TransactionHistorySavings() {
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
      "http://localhost:8080/account-service/account/savings/transactionhistory/" +
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
  // const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  // const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <div>
      <HandleTimeout />
      <HeaderBar />
      <NavbarSavings />

      <div className="history">
        {/* <Records data={currentRecords} />
         <Pagination
          nPages={nPages}
           currentPage={currentPage}
           setCurrentPage={setCurrentPage}
           color="secondary"
         /> */}
      </div>

      <h1 className="color">TRANSACTION HISTORY - SAVINGS ACCOUNT</h1>

      <br></br>
      <div className="container">
        <div className="tablepadding">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date and Time</th>
                <th>Narration</th>
                <th>Reference Number</th>
                <th>Debited Amount</th>
                <th>Credited Amount</th>
                <th>Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.narration}</td>
                    <td>{item.referenceNumber}</td>
                    <td>{item.debited > 0?item.debited:"-"}</td>
                    <td>{item.credited > 0? item.credited:"-"}</td>
                    <td>{item.closingBalance > 0?item.closingBalance:"-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Loading...</td>
                </tr>
              )}
            </tbody>
          </Table>
          <div style={{height:"100px"}}></div>
        </div>
      </div>
    </div>
  );
}
