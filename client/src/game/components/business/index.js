import React from 'react';
import CurrencyFormat from "react-currency-format";
import "./index.css";

import config from "../../../config";
import { Line } from "rc-progress";

export const Business = (props) => {
  return (
    <div className="business-container">
      <div className="business-level">{props.title} - level 1</div>
      <div className="business-control" style={{ backgroundImage: `url("${config.businesses[props.type].picture}")` }}>
        <div className="business-control-label">
          <span className="business-control-label-message">Click to manage order</span>
        </div>
      </div>
      <Line strokeWidth="3" trailWidth={3} strokeLinecap="square" trailColor="gray" strokeColor="yellowgreen" percent={2} />
      <div className="business-actions">
        <div className="business-managers">
          <p className="business-managers-label">Hire Managers! -></p>
          {[1, 2, 3].map((i, index) => <div className="business-manager">
            <div className="manager-picture">
              {props.managersBasePrice * i * (index > 0 ? index : 1)}$
            </div>
          </div>)}
        </div>
        <div className="timer">00:00:00</div>
        <div className="business-expand">
          <button className="business-expand-btn">Expand $200</button>
        </div>
      </div>
    </div>
  )
}