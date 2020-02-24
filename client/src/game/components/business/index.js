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
        <div className="business-level">{props.title} - level {props.level}</div>
        <div className="business-control" style={{ backgroundImage: `url("${props.picture}")` }}>
          {!props.processingOrder && !props.manager && <div onClick={props.onManageOrder(props.businessKey)} className="business-control-label">
            <span className="business-control-label-message">Click to manage order</span>
            <span className="business-control-label-message-info">Revenue: <CurrencyFormat value={props.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /> Time cost: {props.timeCost}</span>
          </div>}
        </div>
        <div className="business-progress-bar">
          <Line strokeWidth="3" trailWidth={3} strokeLinecap="square" trailColor="gray" strokeColor="yellowgreen" percent={props.orderProgress} />
          {props.manager && <div className="business-progress-bar-revenue-per-second"><CurrencyFormat value={props.revenuePerSecond} displayType={'text'} thousandSeparator={true} prefix={'$'} />/sec</div>}
        </div>
        <div className="business-actions">
          <div className="business-managers">
            <p className="business-managers-label">{!props.manager ? 'Hire a Manager! ->' : 'Manager hired!'}</p>
            <div className="business-manager">
              {!props.manager && <button className="manager-picture" disabled={props.totalCashAmount < props.managerPrice} onClick={props.onHireManager(props.businessKey)}>
                <CurrencyFormat value={props.managerPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </button>}
              {props.manager && <div className="manager-picture manager-picture-hired">
              </div>}
            </div>
          </div>
          <div className="timer">{props.timer}</div>
          <div className="business-expand">
            <button disabled={props.totalCashAmount < props.costNextExpand} onClick={props.onExpandBusiness(props.businessKey)} className="business-expand-btn">Expand <CurrencyFormat value={props.costNextExpand} displayType={'text'} thousandSeparator={true} prefix={'$'} /></button>
          </div>
        </div>
      </div>

    </div>
  )
}