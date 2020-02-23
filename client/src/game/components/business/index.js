import React from 'react';
import CurrencyFormat from "react-currency-format";
import "./index.css";

import { Line } from "rc-progress";

export const Business = (props) => {

  return (
    <div className="business-container" style={{ borderColor: props.owner ? 'green' : 'gray' }}>
      {!props.owner && <div className="business-without-owner">
        <span className="unlock-business">Acquire this business to unlock it</span>
        <button disabled={props.totalCashAmount < props.price} onClick={props.onBuyBusiness(props.businessKey)} className="unlock-business-button">
          Buy <CurrencyFormat value={props.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </button>
      </div>}
      <div>
        <div className="business-level">{props.title} - level 1</div>
        <div className="business-control" style={{ backgroundImage: `url("${props.picture}")` }}>
          {!props.processingOrder && <div  onClick={props.onManageOrder(props.businessKey)} className="business-control-label">
            <span className="business-control-label-message">Click to manage order</span>
          </div>}
        </div>
        <Line strokeWidth="3" trailWidth={3} strokeLinecap="square" trailColor="gray" strokeColor="yellowgreen" percent={props.orderProgress} />
        <div className="business-actions">
          <div className="business-managers">
            <p className="business-managers-label">Hire Managers! -></p>
            {<div className="business-manager">
              <div className="manager-picture">
                {props.managersBasePrice}$
            </div>
            </div>}
          </div>
          <div className="timer">{props.timer}</div>
          <div className="business-expand">
            <button className="business-expand-btn">Expand <CurrencyFormat value={props.costNextExpand} displayType={'text'} thousandSeparator={true} prefix={'$'} /></button>
          </div>
        </div>
      </div>

    </div>
  )
}