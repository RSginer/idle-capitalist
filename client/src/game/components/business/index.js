import React from 'react';
import CurrencyFormat from "react-currency-format";
import "./index.css";

import config from "../../../config";
import { Line } from "rc-progress";

export const Business = (props) => {
  return (
    <div className="business-container">
      <div className="business-level">{props.title} - level 1</div>
      <div className="business-control" style={{backgroundImage: `url("${config.businesses[props.type].picture}")`}}></div>
      <Line strokeWidth="3" trailWidth={3} strokeLinecap="square" trailColor="orange" strokeColor="yellow"  percent={90} />
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
        <div className="timer">00:00:00</div>
        <div className="business-expand">
          <button className="business-expand-btn">Expand $200</button>
        </div>
      </div>
    </div>
  )
}