import React from 'react';
import CurrencyFormat from "react-currency-format";
import "./index.css";

export const Cash = (props) => {
  return (
    <div className="cash-container">
      <div className="user-picture">
        <img src="https://via.placeholder.com/60" alt="user"/>
      </div>
      <div className="cash-amount">
        <CurrencyFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      </div>
    </div>
  )
}