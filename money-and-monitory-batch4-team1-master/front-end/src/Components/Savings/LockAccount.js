import React, { useState, useCallback, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import NavbarSavings from "../Navbar/NavbarSavings";
import { useNavigate } from "react-router-dom";
import "./savings.css";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "../../UserContext";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import HeaderBar from "../Header/header";
import HandleTimeout from "../Timeout/Timeout";

export default function LockAccount() {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const minDate = new Date();
  const navigate = useNavigate();
  const MSUsername = "MSUser";
  const MSPassword = "moneyAndMonitory";
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/login"); // Replace with your login route
    }
  });
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setCheckboxChecked(event.target.checked);
  };

  const yesterday = moment().subtract(1, "day");
  const fixedPeriod = moment().add(1, "year");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  const onSubmit = () => {
    const inputDate = new Date(selectedDate);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = inputDate.toLocaleDateString("en-IN", options);

    axios.put(
      "http://localhost:8080/account-service/account/lockaccount/" +
      user.userId +
      "/" +
      selectedDate,
      {},
      {
        auth: {
          username: MSUsername,
          password: MSPassword,
        },
      }
    );
    alert("Savings account locked till " + formattedDate);
    navigate("/dashboard");
  };

  return (
    <div className="width">
      <HandleTimeout/>
      <HeaderBar />
      <NavbarSavings />
      <div className="lock">
        <br></br>
        <br></br>
        <h1 className="hh1">WANT TO SAVE MORE MONEY?</h1>
        <br></br>
        <h4 className="h5">LOCK YOUR SAVINGS ACCOUNT</h4>

        <form className="dropdown" onSubmit={onSubmit}>
          <div className="calender">
            <DatePicker
              placeholderText="Select date"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy" // Specify the date format you prefer
              minDate={yesterday.toDate()} // Set minDate to yesterday
              maxDate={fixedPeriod.toDate()} // Set minDate to yesterday
            />
          </div>
          <br></br>
          <label>
            <input className="checkbox" type="checkbox" required checked={isCheckboxChecked}
              onChange={handleCheckboxChange} /> You won't be
            able to withdraw money for above selected period of time. <br></br>If you wish to withdraw money before selected time please visit the bank.
          </label>
          <br></br>
          <br></br>
          <button
            className={`btn btn-primary buttonpadding custom-button ${!isCheckboxChecked ? 'violet-disabled' : ''
              }`}
            type="submit" disabled={!isCheckboxChecked}>
            Lock the Account
          </button>
          <br></br>
          <br></br>
        </form>
      </div>
    </div>
  );
}
