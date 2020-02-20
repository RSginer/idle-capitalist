import React from 'react';
import CurrencyFormat from "react-currency-format";
import "./index.css";

export const Business = (props) => {
  return (
    <div className="business-container">
      <div className="business-level">Limonade - Business level 1</div>
      <div className="business-control"></div>
      <div className="business-actions">
        <div className="business-managers">
          <p className="business-managers-label">Managers:</p>
          <div className="business-manager">
            <img src="https://via.placeholder.com/50" alt="user" />
          </div>
          <div className="business-manager">
            <img src="https://via.placeholder.com/50" alt="user" />
          </div>
          <div className="business-manager">
            <img src="https://via.placeholder.com/50" alt="user" />
          </div>
        </div>
        <div className="business-expand">
          <button className="business-expand-btn">Expand $200</button>
        </div>
      </div>
    </div>
  )
}