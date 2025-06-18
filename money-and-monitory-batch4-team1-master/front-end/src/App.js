import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Components/Home/Home";
import Dash_board from "./Components/Dash_board/Dash_board";
import Register from "./Components/Register/Register";

import Withdraw from "./Components/Transactions/Withdraw";
import TransactionSucess from "./Components/Transactions/TransactionSucess";
import TransactionFail from "./Components/Transactions/TransactionFail";
import Deposit from "./Components/Transactions/Deposit";

import PaymentGateway from "./Components/Transactions/PaymentGateway";
import LockAccount from "./Components/Savings/LockAccount";
import TransactionHistory from "./Components/Transactions/TransactionHistory";

import Login from "./Components/Login/Login";
import CheckBalance from "./Components/Transactions/CheckBalance";
import ViewProfile from "./Components/ViewProfile/ViewProfile";
import RoundUp from "./Components/RoundUp/RoundUp";

import { UserProvider } from "./UserContext";

import Savings from "./Components/Savings/Savings";
import TransferMoney from "./Components/Transactions/TransferMoney";
import ForgotPassword from "./Components/ForgotPassword/forgotpassword";
import TransactionHistorySavings from "./Components/Transactions/TransactionHistorySavings";
import EditProfile from "./Components/ViewProfile/EditProfile";
import HomePage from "./Components/Home/HomePage";
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  return (
    <UserProvider>
      <div className="App" style={{ height: "1000px" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>

            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/withdraw" element={<Withdraw />}></Route>
            <Route path="/deposit" element={<Deposit />}></Route>
            <Route
              path="/transactionsuccess/:transactionId"
              element={<TransactionSucess />}
            ></Route>
            <Route
              path="/transactionfail"
              element={<TransactionFail />}
            ></Route>
            <Route path="/paymentgateway" element={<PaymentGateway />}></Route>
            <Route path="/lockaccount" element={<LockAccount />}></Route>
            <Route
              path="/transactionhistory"
              element={<TransactionHistory />}
            ></Route>
            <Route
              path="/savings/transactionhistory"
              element={<TransactionHistorySavings />}
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/checkbalance" element={<CheckBalance />}></Route>
            <Route path="/viewprofile" element={<ViewProfile />}></Route>
            <Route path="/editprofile" element={<EditProfile />}></Route>
            <Route path="/roundup" element={<RoundUp />}></Route>
            <Route path="/dashboard" element={<Dash_board />}></Route>
            <Route path="/transfermoney" element={<TransferMoney />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
            <Route path="/savingsaccount" element={<Savings />}></Route>
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
