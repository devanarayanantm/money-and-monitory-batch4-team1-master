import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";


export default function SidebarFunctions() {
    const { user } = useUser(); // Get the user from the context
  
    let navigate = useNavigate();
    const handleSidebarClick = (e) => {
        e.preventDefault();
        navigate(e.target.value);
    };
    return (
        <div class="d-flex flex-column flex-shrink-0 p-3 text-dark" style={{width: "220px", position:"fixed", height:"-webkit-fill-available"}}>
            <div class="h4">Savings Account</div>
            <hr/>
            <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <div className="h4">
                    <button type="button" class="btn btn-block text-white" style={{backgroundColor:"#490778"}} value = "/dashboard" onClick={handleSidebarClick}>
                        Home
                    </button>
                </div>
            </li>
            <li>
                <div className="h4">
                    <button type="button" class="btn btn-block text-white" style={{backgroundColor:"#490778"}} value = "/savings/transactionhistory" onClick={handleSidebarClick}>
                        Statement
                    </button>
                </div>
            </li>
            <li>
                <div className="h4">
                    <button type="button" class="btn btn-block text-white" style={{backgroundColor:"#490778"}} value = "/withdraw" onClick={handleSidebarClick}>
                        Withdraw
                    </button>
                </div>
            </li>
            <li>
                <div className="h4">
                    <button type="button" class="btn btn-block text-white" style={{backgroundColor:"#490778"}} value = "/lockaccount" onClick={handleSidebarClick}>
                        Lock Account
                    </button>
                </div>
            </li>
            <hr/>
            </ul>                
        </div>
  );
}