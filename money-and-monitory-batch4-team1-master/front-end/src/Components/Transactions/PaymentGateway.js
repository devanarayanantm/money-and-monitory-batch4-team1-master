import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import NavBarUser from "../Navbar/NavBarUser";
import { useNavigate } from "react-router-dom";
import { PasswordField } from "primereact/password";

export default function PaymentGateway() {
  const [pin, setPin] = useState("");
  //const dispatch=useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <NavbarFunctions />
      <div></div>
      <form>
        <div className="card-body form_width ">
          <h2 className="top">ENTER 4-DIGIT PIN</h2>
          <div className="row">
            <div className="col-lg-12 padding">
              <div className="form-group">
                <input
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="form-control"
                  placeholder="Pin"
                ></input>
              </div>
            </div>
          </div>
          <button className="btn btn-light button" type="submit">
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}
