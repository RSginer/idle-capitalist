import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyBusiness, manageOrder } from '../../actions';
import { Cash } from '../components/cash';
import { Business } from '../components/business';

import "./index.css";

export const Game = () => {
  const totalCashAmount = useSelector((state) => state.game.totalCashAmount);
  const businesses = useSelector((state) => state.game.businesses);
  const businessesConfig = useSelector((state) => state.game.businessesConfig);
  const dispatch = useDispatch();

  const onBuyBusiness = (businessKey) => () => {
    dispatch(buyBusiness(businessKey))
  }

  const onManageOrder = (businessKey) => () => {
    dispatch(manageOrder(businessKey))
  }

  const calcOrderProgress = (businessKey, ms) => {
    if (ms <= 0 || !ms) {
      return 0;
    }

    const timeLeft = businessesConfig[businessKey].baseOrderTimerInMs - ms;
    return timeLeft * 100 / businessesConfig[businessKey].baseOrderTimerInMs;
  }

  const msToHMS = (ms) => {
    if (!ms) {
      return '00:00:00'
    }

    let secNum = ms / 1000;
    let hours   = Math.floor(secNum / 3600);
    let minutes = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds = Math.ceil(secNum - (hours * 3600) - (minutes * 60));

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+ seconds;}
    return hours+':'+minutes+':'+seconds;
  }

  return (
    <div>
      <Cash amount={totalCashAmount} />
      <div className="game-businesses-container">
        <div className="game-businesses-list">
          {Object.keys(businessesConfig).map((businessKey) => <Business
            key={businessKey}
            businessKey={businessKey}
            title={businessesConfig[businessKey].title}
            type={businessKey}
            managersBasePrice={businessesConfig[businessKey].managersBasePrice}
            price={businessesConfig[businessKey].price}
            owner={businesses[businessKey]?.owner}
            totalCashAmount={totalCashAmount}
            picture={businessesConfig[businessKey].picture}
            onBuyBusiness={onBuyBusiness}
            onManageOrder={onManageOrder}
            processingOrder={businesses[businessKey]?.processingOrder}
            timer={msToHMS(businesses[businessKey]?.timer)}
            orderProgress={calcOrderProgress(businessKey, businesses[businessKey]?.timer)}
          />)}
        </div>
      </div>
    </div>
  )
}

export default Game;

