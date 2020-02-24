import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { buyBusiness, manageOrder, expandBusiness, hireManager, closeIdleDialog } from '../../actions';

import { wsConnect } from '../../actions/websocket';
import config from '../../config';
import { Cash } from '../components/cash';
import { Business } from '../components/business';
import { Dialog } from '../components/dialog';
import util from '../../util';

import "./index.css";

export const Game = () => {
  const totalCashAmount = useSelector((state) => state.game.totalCashAmount);
  const showIdleDialog = useSelector((state) => state.game.showIdleDialog);
  const idleTime = useSelector((state) => state.game.idleTime);
  const idleRevenue = useSelector((state) => state.game.idleRevenue);
  const businesses = useSelector((state) => state.game.businesses);
  const businessesConfig = useSelector((state) => state.game.businessesConfig);
  const dispatch = useDispatch();
  const socketConnected = useSelector((state) => state.game.socketConnected);

  const onBuyBusiness = (businessKey) => () => {
    dispatch(buyBusiness(businessKey));
  }

  const onManageOrder = (businessKey) => () => {
    dispatch(manageOrder(businessKey));
  }

  const onExpandBusiness = (businessKey) => () => {
    dispatch(expandBusiness(businessKey));
  }

  const onHireManager = (businessKey) => () => {
    dispatch(hireManager(businessKey));
  }

  const calcOrderProgress = (businessKey, ms) => {
    if (ms <= 0 || !ms) {
      return 0;
    }

    const timeLeft = (businessesConfig[businessKey].initialTime - ms);
    const percent = timeLeft * 100 / businessesConfig[businessKey].initialTime
    return percent;
  }

  const msToHMS = (ms) => {
    if (!ms || ms <= 0) {
      return '00:00:00';
    }

    let secNum = ms / 1000;
    let hours = Math.floor(secNum / 3600);
    let minutes = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds = secNum - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    return hours + ':' + minutes + ':' + seconds;
  }

  const msToDHMS = (ms) => {
    let days, hours, minutes, seconds, totalHours, totalMinutes, totalSeconds;

    totalSeconds = parseInt(Math.floor(ms / 1000));
    totalMinutes = parseInt(Math.floor(totalSeconds / 60));
    totalHours = parseInt(Math.floor(totalMinutes / 60));
    days = parseInt(Math.floor(totalHours / 24));

    seconds = parseInt(totalSeconds % 60);
    minutes = parseInt(totalMinutes % 60);
    hours = parseInt(totalHours % 24);

    return { d: days, h: hours, m: minutes, s: seconds };
  }

  const calcNextExpandCost = (businessKey) => {
    const rateGrowth = businessesConfig[businessKey].coefficient;
    const costBase = businessesConfig[businessKey].initialCost;
    const businessLevel = businesses[businessKey] && businesses[businessKey].level ? businesses[businessKey].level : 1;

    return util.getNextExpandCost(costBase, businessLevel, rateGrowth);
  }

  const getRevenue = (businessKey) => {
    const level = (businesses[businessKey] ? businesses[businessKey].level : 1);
    const initialTime = businessesConfig[businessKey].initialTime;
    const initialProductivity = businessesConfig[businessKey].initialProductivity;
    return util.getBusinessRevenue(initialProductivity, level, initialTime);
  }

  const getRevenuePerSecond = (businessKey) => {
    const level = (businesses[businessKey] ? businesses[businessKey].level : 1);
    const initialProductivity = businessesConfig[businessKey].initialProductivity;
    return util.getBusinessRevenuePerSecond(initialProductivity, level)
  }

  const onIdleDialogClose = () => {
    dispatch(closeIdleDialog())
  }

  const onSocketDisconnected = () => {
    dispatch(wsConnect(config.websocketUrl))
  }

  return (
    <div>
      <Cash amount={totalCashAmount} />
      <Dialog opened={showIdleDialog} content={`You were offline for ${msToDHMS(idleTime).d} days ${msToDHMS(idleTime).h} hours ${msToDHMS(idleTime).m} minutes ${msToDHMS(idleTime).s} seconds, and your businesses generated $${idleRevenue?.toFixed(2)} for you`}
       title="Welcome back!" actionText="Ok, thanks" onActionClick={() => onIdleDialogClose()} />
      <Dialog opened={!socketConnected} content="You lost the connection with the server, try to reconnect clicking the button bellow, don't worry your businesses are still working for you." title="Disconnected Socket" actionText="Reconnect" onActionClick={() => onSocketDisconnected()} />

      <div className="game-businesses-container">
        <div className="game-businesses-list">
          {Object.keys(businessesConfig).map((businessKey) => <Business
            key={businessKey}
            businessKey={businessKey}
            title={businessesConfig[businessKey].title}
            type={businessKey}
            managerPrice={businessesConfig[businessKey].managerPrice}
            price={businessesConfig[businessKey].initialCost}
            owner={businesses[businessKey]?.owner}
            totalCashAmount={totalCashAmount}
            picture={businessesConfig[businessKey].picture}
            onBuyBusiness={onBuyBusiness}
            onManageOrder={onManageOrder}
            processingOrder={businesses[businessKey]?.processingOrder}
            timer={msToHMS(businesses[businessKey]?.timer, true)}
            orderProgress={calcOrderProgress(businessKey, businesses[businessKey]?.timer)}
            costNextExpand={calcNextExpandCost(businessKey)}
            manager={businesses[businessKey]?.manager}
            timeCost={msToHMS(businessesConfig[businessKey].initialTime)}
            revenue={getRevenue(businessKey)}
            onExpandBusiness={onExpandBusiness}
            level={businesses[businessKey] ? businesses[businessKey]?.level : 1}
            onHireManager={onHireManager}
            revenuePerSecond={getRevenuePerSecond(businessKey)}
          />)}
        </div>
      </div>
    </div>
  )
}

export default Game;

