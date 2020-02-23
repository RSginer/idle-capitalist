import React from 'react';
import CurrencyFormat from "react-currency-format";
import "./index.css";

export const Cash = (props) => {
  return (
    <div className="cash-container">
      <div className="user-picture">
        <img src="https://avatars3.githubusercontent.com/u/14939307?s=460&v=4" alt="user"/>
      </div>
      <div className="cash-amount">
        <CurrencyFormat value={props.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      </div>
    </div>
  )
}