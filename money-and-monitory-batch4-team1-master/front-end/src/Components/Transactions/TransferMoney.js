import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../script.css";
import NavBarUser from "../Navbar/NavBarUser";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import "../script.css";
import { useUser } from "../../UserContext";
import axios from "axios";
import SidebarFunctions from "../Navbar/SidebarFunctions";
import HeaderBar from "../Header/header";
import HandleTimeout from "../Timeout/Timeout";

export default function TransferMoney() {
  const { user } = useUser();
  const [debitAccountNumber, setDebitAccountNumber] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cvv, setCvv] = useState();
  const [error, setError] = useState(null);
  const phoneRegex =
    /^\?([0-9]{3})[-. ]?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;

  const userUrl = "http://localhost:8080/account-service/account/transfermoney";
  const MSUsername = "MSUser";
  const MSPassword = "moneyAndMonitory";
  const [payment, setPayment] = useState({
    userId: user.userId,
    debitAccountNumber: "",
    receiverAccountNumber: "",
    amount: "",
    cvv: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(user.userId);
    if (cvv === payment.cvv) {
      const res = await axios.post(userUrl, payment, {
        auth: {
          username: MSUsername,
          password: MSPassword,
        },
      });
      console.log(res);
      //navigate("/paymentgateway");
      if (res.status === 200) {
        alert("Transaction Successful");
        console.log(res.data.referenceNumber);
        let transactionId = res.data.referenceNumber.toString();
        console.log(transactionId);
        navigate(`/transactionsuccess/${transactionId}`);
      } else {
        navigate("/transactionfail");
      }
    } else {
      alert("Enter correct CVV");
    }
  };

  useEffect(() => {
    // Fetch the debit account number when the component mounts
    const userId = user.userId;
    axios
      .get(
        `http://localhost:8080/account-service/account/debitaccount/${userId}`,
        {
          auth: {
            username: MSUsername,
            password: MSPassword,
          },
        }
      )
      .then((res) => {
        setDebitAccountNumber(String(res.data.debitAccountNumber));
        setCardNumber(
          String(res.data.card.cardNumber)
            .replace(/(\d{3})/g, "$1-")
            .substring(0, 15)
        );
        setCvv(String(res.data.card.cvv));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.userId]); // Dependency array ensures this effect runs when userId changes

  return (
    <div>
      <div>
        <HandleTimeout />
        <HeaderBar />
        <SidebarFunctions />
      </div>
      <div className="form_width">
        <form onSubmit={onSubmit}>
          <div className="card-body ">
            <h1 className="color">MAKE PAYMENT</h1>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label youraccount">
                    Your Account Number
                  </label>
                  <input
                    type="text"
                    value={debitAccountNumber}
                    name="debitAccountNumber"
                    className="form-control"
                    placeholder="Account Number"
                    required
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label receiver">
                    Receiver's Account Number
                  </label>
                  <input
                    type="text"
                    name="receiverAccountNumber"
                    value={payment.receiverAccountNumber}
                    onChange={(e) => handleChange(e)}
                    className="form-control"
                    placeholder="Account Number"
                    required
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label amount">Amount to Pay</label>
                  <input
                    type="text"
                    name="amount"
                    value={payment.amount}
                    onChange={(e) => handleChange(e)}
                    className="form-control"
                    placeholder="Enter Amount"
                    required
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label cardnumber">Your Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    name="cardNumber"
                    className="form-control"
                    placeholder="Card Number"
                    required
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label cvv">Your Card CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    value={payment.cvv}
                    onChange={(e) => handleChange(e)}
                    className="form-control"
                    placeholder="Enter CVV"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <button className="btn btn-light button" type="submit">
              Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
