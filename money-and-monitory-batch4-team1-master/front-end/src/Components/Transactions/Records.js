import React from "react";
import "../script.css";
import Table from "react-bootstrap/Table";

const Records = ({ data }) => {
  return (
    <div className="history">
      <br></br>
      <h1 className="color">TRANSACTION HISTORY</h1>
      <br></br>
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
                  <td>{(item.date).split("T")[0] + " " + (item.date).split("T")[1].substring(0,5)}</td>
                  <td>{item.narration}</td>
                  <td>{item.referenceNumber}</td>
                  <td>{item.debited == 0 ? "-":item.debited}</td>
                  <td>{item.credited  == 0 ? "-":item.credited}</td>
                  <td>{item.closingBalance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Loading...</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Records;
