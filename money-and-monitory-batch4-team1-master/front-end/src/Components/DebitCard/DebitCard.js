import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./DebitCard.css"
import { useUser } from '../../UserContext';
import axios from 'axios'; // Make sure you have Axios installed


const DebitCard = () => {
    const { user } = useUser();
    const [cardDetails, setCardDetails] = useState('');
    const [cvvValueSecret, setCvvValueSecret] = useState('•••');
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
            setCardDetails(res.data.card);
          }).catch((err) => {
            console.log(err);
          });
      }, []);
      const showCVV = () => {
        if(cvvValueSecret === '•••'){
            setCvvValueSecret(cardDetails.cvv);
        }else{
            setCvvValueSecret('•••');
        }
      }
    return (
        <div>
          <div class="Debitcard">
              <span class="line-1"></span>
              <span class="line-2"></span>
              <span class="line-3"></span>
              <div class="top-row">
                  <div class="visa">
                      <h6>Coin Stash</h6>
                      <h5>{user.name}</h5>
                  </div>
                  <div class="tick">
                      <i class="fa fa-check"></i>
                  </div>
                  
              </div>
              <div class="bottom-row">
              <p class="bottom-row">CardNumber</p>
              <span class="number">{String(cardDetails.cardNumber).replace(/(\d{3})/g, '$1 ')}</span>
              <p class="bottom-row cvv">CVV</p>
              <span class="number cvvNumber" id="cvvNumberSecret" onClick={showCVV}>{cvvValueSecret}</span>
              </div>
            
              
          </div>
        </div>
    );
};

export default DebitCard;
