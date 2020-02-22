import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import config from "../../config";

import { Cash } from '../components/cash';
import { Business } from '../components/business';
import { types } from "../../actions/types";

import "./index.css";

export const Game = () => {
  const userId = useSelector((state) => state.player.userId);
  const cashAmount = useSelector((state) => state.player.cashAmount);
  const businesses = useSelector((state) => state.businesses);
  const dispatch = useDispatch();

    return (
      <div>
        <Cash amount={cashAmount} />
        <div className="game-businesses-container">
          <div className="game-businesses-list">
            {Object.keys(config.businesses).map((businessKey) => <Business
               key={businessKey}
               businessKey={businessKey}
               onBuyBusiness={(payload) => () => dispatch({type: types.BUY_BUSINESS, payload: payload})}
               title={config.businesses[businessKey].title} 
               type={businessKey} 
               managersBasePrice={config.businesses[businessKey].managersBasePrice}
               price={config.businesses[businessKey].price}
               owner={businesses[businessKey].owner}
               />)}
          </div>
        </div>
      </div>
    )
}

export default Game;

