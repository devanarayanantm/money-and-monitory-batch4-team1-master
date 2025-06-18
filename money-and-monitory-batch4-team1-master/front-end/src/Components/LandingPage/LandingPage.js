import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
function LandingPage() {
  const subscribed = () => {
    alert("Subscribed!");
  }
  return (
    <>
      <header style={{ width: "-webkit-fill-available" }}>
        <div
          class="px-3 py-2 text-white"
          style={{ backgroundColor: "rgb(107 44 177)" }}
        >
          <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              >
                <div class="logo">
                  <img src="icon-removebg.png" alt="Product Icon" />
                  <h1 class="display-1">Coin Stash</h1>
                </div>
              </a>
              <a class="btn" role="button">
                <Link to={"/register"} class="nav-link padding">
                  <h1 className="display-6">Register</h1>
                </Link>
              </a>
              <a class="btn" role="button">
                <Link to={"/login"} class="nav-link padding">
                  <h1 className="display-6">Login</h1>
                </Link>
              </a>
            </div>
          </div>
        </div>
    </header>
    <div class="position-left text-left left-half text-white">
      <div class="col-md-10">
        <h1 class="display-6 padding-top">Banking Made Easier</h1>
        <p class="lead font-weight-normal padding">Welcome to Coin Stash, where smart banking meets effortless saving! Discover our innovative 'RoundUp Savings' feature – every transaction you make gets rounded up, and the extra change goes straight into your savings account. It's a simple, automatic way to cultivate the habit of saving while you manage your finances. Start rounding up and watch your savings grow. Join us on the journey to financial empowerment today</p>
            
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
    
    </>
  );
}

export default LandingPage;
