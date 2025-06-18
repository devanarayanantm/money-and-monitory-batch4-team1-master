import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { useUser } from "../../UserContext";
import { Link } from "react-router-dom";
import DebitCard from "../DebitCard/DebitCard";
import axios from 'axios';

const Sidebar = () => {
  const { user } = useUser();
  const [accDetails, setAccDetails] = useState('');
  const MSUsername = "MSUser";
  const MSPassword = "moneyAndMonitory";
  useEffect(() => {
    axios.get(
        `http://localhost:8080/account-service/account/debitaccount/${user.userId}`,
        {
          auth: {
            username: MSUsername,
            password: MSPassword,
          },
        }
      ).then((res) => {
        console.log(res);
        console.log(user)
        setAccDetails(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container sidebar user-info">
      <br/>
      <p className="display-6">Welcome, {user.name}</p>
      <div className="row">
        <div className="col">
          <div className="card">
          <div class="card-body">
            <h5 class="card-title">Your card details</h5><hr/>
            <div className="col-4">
                <DebitCard/>
              </div>
                
          </div>
        </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
            <h5 class="card-title">User details</h5><hr/>
          <div className="row">
                  <div className="col">
                    <p class="card-text">Name :</p>
                  </div>
                  <div className="col" style={{fontWeight:"bold"}}>
                    {user.name}
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <p class="card-text">Address :</p>
                  </div>
                  <div className="col" style={{fontWeight:"bold"}}>
                    {user.address}
                  </div>
                </div>

                <div className="row">
                  <div className="col" >
                    <p class="card-text">Date of birth :</p>
                  </div>
                  <div className="col" style={{fontWeight:"bold"}}>
                    {user.dob}
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <p class="card-text">Email :</p>
                  </div>
                  <div className="col" style={{fontWeight:"bold"}}>
                    {user.email}
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <p class="card-text">Contact Number :</p>
                  </div>
                  <div className="col" style={{fontWeight:"bold"}}>
                    {user.mobile}
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <p class="card-text">User ID :</p>
                  </div>
                  <div className="col" style={{fontWeight:"bold"}}>
                    {user.userId}
                  </div>
                </div> 
                <br/>
                <div style={{height:"14px"}}></div>
                <div className="row">
                  <div className="col">
                    <div className="d-flex justify-content-left">
                        <Link to="/editprofile" className="btn btn-primary button">
                          Edit Profile
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      
      <br/>
      <div className="card">
        <div class="card-body">
          <h5 class="card-title">Account details</h5><hr/>
          <div class="container">
            <div class="row">
              <div class="col-3">
              <p class="card-text">Debit Account Number:</p>
              </div>
              <div class="col">
              <p class="card-text"><strong>{accDetails.debitAccountNumber}</strong></p>
              </div>
            </div>

            <div class="row">
              <div class="col-3">
              <p class="card-text">Account Balance:</p>
              </div>
              <div class="col">
              <p class="card-text" style={{color:"green"}}><strong>$ {accDetails.balance}</strong></p>
              </div>
            </div>

            <div class="row">
              <div class="col-3">
              <p class="card-text">Round up enabled:</p>
              </div>
              <div class="col">
              <p class="card-text"><strong>{accDetails.roundUp == true?"True":"False"}</strong></p>
              </div>
            </div>

            <div class="row">
              <div class="col-3">
              <p class="card-text">Saving Account:</p>
              </div>
              <div class="col">
              <p class="card-text" ><strong>{accDetails.savingsAccountNumber}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      { accDetails.transactions && accDetails.transactions.length > 0 && 
      <div className="card">
      <div class="card-body">
        <h5 class="card-title">Recent Transaction details</h5><hr/>
        <div class="container">
          <div class="row">
            <div class="col-3">
            <p class="card-text" style={{color:"black"}}><strong>{accDetails.transactions[accDetails.transactions.length-1].date.substring(0, 10)}</strong></p>
            </div>
            <div class="col">
            <p class="card-text" style={{color:"green"}}><strong>+ $ {accDetails.transactions[accDetails.transactions.length-1].credited}</strong></p>
            </div>
            <div class="col">
            <p class="card-text" style={{color:"red"}}><strong>- $ {accDetails.transactions[accDetails.transactions.length-1].debited}</strong></p>
            </div>
            <div class="col">
            <p class="card-text" style={{color:"blue"}}><strong>Closing Balance: $ {accDetails.transactions[accDetails.transactions.length-1].closingBalance}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
      }
    </div>
  );
};

export default Sidebar;
