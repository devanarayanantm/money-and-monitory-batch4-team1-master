import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';
import { useUser } from '../../UserContext';
import axios from 'axios'; // Make sure you have Axios installed
import RegisterNav from '../Navbar/RegisterNav';
import HeaderBar from '../Header/header';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { updateUser } = useUser();

    const subscribed = () => {
        alert("Subscribed!");
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        var MSUsername = 'MSUser';
        var MSPassword = 'moneyAndMonitory';    
        try {
            // Make the first request to validate the username and password
            const response = await axios.get(`http://localhost:8080/user-management-service/user/${username}/${password}`, {
                auth: {
                  username: MSUsername,
                  password: MSPassword
                }
              });

            if (response.data) {
                // If the first request succeeds, make the second request to get user data
                const response1 = await axios.get(`http://localhost:8080/user-management-service/user/${username}`, {
                    auth: {
                        username: MSUsername,
                        password: MSPassword
                      }
                });
                const userData = response1.data;
                console.log(userData);
                updateUser(userData);
                navigate('/dashboard');
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <div>
                <HeaderBar/>
               <RegisterNav></RegisterNav>
            </div>
            <div class="container">
            <div class="row">
                <div class="col" id="leftPanelLogin">
                </div>
                <div class="col">
                <div className="login-container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10 custom-column">
                        <div class="card">
                            <div className="card-body">
                                <h3 className="card-title text-center violet-text bold-text">LOGIN</h3>
                                <form>
                                    <div className="form-group mb-3 mt-4">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Email ID"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    {error && ( // Display the error message if error is not null
                                        <p className="error-message">
                                            {error}
                                        </p>
                                    )}
                                   <button
                                        type="submit"
                                        className={`btn btn-primary btn-block custom-button ${error ? '' : 'mt-4'}`}
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                </form>
                                <p className="mt-3 text-center white-text">
                                    Don't have an account? <Link to="/register" className="violet-link">Register</Link>
                                </p>
                                <p className="mt-3 text-center white-text">
                                     <Link to="/forgotpassword" className="violet-link">Forgot Password?</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
                </div>
            </div>
            <div class="myContainer">
      <hr/>
      <footer class="py-5">
        <div class="row">
          <div class="col-2">
            <h5>Quick Links</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
            </ul>
          </div>
    
          <div class="col-2">
            <h5>Authors</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Neha Sarnaik</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pooja S</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Saatvik Sangwan</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Monika Sharma</a></li>
            </ul>
          </div>
    
          <div class="col-4 offset-1">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of whats new and exciting from us.</p>
              <div class="d-flex w-100 gap-2">
                <label for="newsletter1" class="visually-hidden">Email address</label>
                <input id="newsletter1" type="text" class="form-control" placeholder="Email address"/>
                <button class="btn btn-primary" type="button" onClick={subscribed}>Subscribe</button>
              </div>
            </form>
          </div>
        </div>
    
        <div class="d-flex justify-content-between py-4 my-4 border-top">
          <p>© Coin Stash 2023. All rights reserved.</p>
          <ul class="list-unstyled">
            <a href="https://www.instagram.com/" target="_blank">
              <img src="./fti.PNG" alt="Girl in a jacket" width="150px" height="50px"/>
            </a>
            
          </ul>
        </div>
      </footer>
    </div>  
        </div>
    );
};

export default Login;
