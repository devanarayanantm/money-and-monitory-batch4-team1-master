import React from "react";
import "./RightSidebar.css";

const RightSidebar = () => {
  return (
    <div className="right-sidebar">
      <h2>Quick Links</h2>
      <ul>
        <li>
          <a href="#">Water Bills</a>
        </li>
        <li>
          <a href="#">Income Salary</a>
        </li>
        <li>
          <a href="#">Electricity Bills</a>
        </li>
        <li>
          <a href="#">Phone Bill</a>
        </li>
      </ul>
    </div>
  );
};

export default RightSidebar;
