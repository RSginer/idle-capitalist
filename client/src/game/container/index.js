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
    const timeLeft = businessesConfig[businessKey].baseOrderTimerInMs - ms;
    console.log(timeLeft * businessesConfig[businessKey].baseOrderTimerInMs / 100)
    return timeLeft * businessesConfig[businessKey].baseOrderTimerInMs / 100;
  }

  const msToHMS = (ms) => {
    if (!ms) {
      return '00:00:00'
    }

    // 1- Convert to seconds:
    var seconds = ms / 1000;
    // 2- Extract hours:
    var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    return hours + ":" + minutes + ":" + seconds;
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

