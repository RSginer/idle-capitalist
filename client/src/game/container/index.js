import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyBusiness } from '../../actions';
import { Cash } from '../components/cash';
import { Business } from '../components/business';

import "./index.css";

export const Game = () => {
  const totalCashAmount = useSelector((state) => state.game.totalCashAmount); 
  const businesses = useSelector((state) => state.game.businesses);
  const businessesConfig = useSelector((state) => state.game.businessesConfig);
  const dispatch = useDispatch();

  const onBuyBusiness = (payload) => () => {
    dispatch(buyBusiness(payload))
  }

    return (
      <div>
        <Cash amount={totalCashAmount} />
        <div className="game-businesses-container">
          <div className="game-businesses-list">
            {Object.keys(businessesConfig).map((businessKey) => <Business
               key={businessKey}
               businessKey={businessKey}
               onBuyBusiness={onBuyBusiness}
               title={businessesConfig[businessKey].title} 
               type={businessKey}
               managersBasePrice={businessesConfig[businessKey].managersBasePrice}
               price={businessesConfig[businessKey].price}
               owner={businesses[businessKey] ? true : false}
               totalCashAmount={totalCashAmount}
               picture={businessesConfig[businessKey].picture}
               />)}
          </div>
        </div>
      </div>
    )
}

export default Game;

