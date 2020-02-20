import React from 'react';
import CurrencyFormat from "react-currency-format";
import "./index.css";

export const Cash = (props) => {
  return (
    <div className="cash-container">
      <div className="user-picture">
        <img src="https://png.pngtree.com/element_our/png_detail/20190103/business-man-line-black-icon-png_309140.jpg" alt="user"/>
      </div>
      <div className="cash-amount">
        <CurrencyFormat value={props.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      </div>
    </div>
  )
}