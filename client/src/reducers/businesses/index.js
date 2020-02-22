import { types } from '../../actions/types';
import config from "../../config";

export default (state = {
  totalCashAmount: 0,
  lemonade: {
    owner: false,
    managers: []
  },
  bakery: {
    owner: false,
    managers: []
  }
}, action) => {
  switch (action.type) {
    case types.BUY_BUSINESS:
      return buyBusiness(state, action);
    default:
      return state;
  }
}

function buyBusiness(state, action) {
  const businessPrice = config.businesses[action.payload].price;
  const newState = {...state};

  if (state.totalCashAmount >= businessPrice) {
    newState.totalCashAmount -= businessPrice;
    const business = newState[action.payload];
    business.owner = true;
    newState[action.payload] = Object.assign({}, business);
  }

  return newState;
}