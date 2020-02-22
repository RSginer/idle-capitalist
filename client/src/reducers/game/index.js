import { types } from '../../actions/types';
import config from "../../config";

export default (state = {
  loading: false,
  error: null,
  totalCashAmount: 0,
  businesses: {
    lemonade: {
      owner: false,
      managers: []
    },
    bakery: {
      owner: false,
      managers: []
    }
  }
}, action) => {
  switch (action.type) {
    case types.BUY_BUSINESS:
      return buyBusiness(state, action);
    case types.INIT_GAME_SUCCESS:
      return { ...state, loading: false, error: null }
    case types.INIT_GAME_ERROR:
      return { ...state, loading: false, error: action.payload }
    case types.INIT_GAME:
      return { ...state, loading: true, error: null }
    default:
      return state;
  }
}

function buyBusiness(state, action) {
  const businessPrice = config.businesses[action.payload].price;
  const newState = { ...state };

  if (state.totalCashAmount >= businessPrice) {
    newState.totalCashAmount -= businessPrice;
    const business = newState[action.payload];
    business.owner = true;
    newState[action.payload] = Object.assign({}, business);
  }

  return newState;
}
