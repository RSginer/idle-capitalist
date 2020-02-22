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
    case types.BUY_BUSINESS_SUCCESS:
      return buyBusiness(state, action);
    case types.INIT_GAME_SUCCESS:
      return { ...state, loading: false, error: null, totalCashAmount: action.payload.totalCashAmount, businesses: factoryBusinesses(action.payload.businesses) }
    case types.INIT_GAME_ERROR:
      return { ...state, loading: false, error: action.payload }
    case types.INIT_GAME:
      return { ...state, loading: true, error: null }
    default:
      return state;
  }
}

function factoryBusinesses(businessesServerResult) {
  let businesses = {};

  businessesServerResult.map((business) => {
    businesses[business.businessKey] = {
      owner: true,
      managers: business.managers
    }
  });

  return businesses
}

function buyBusiness(state, action) {
  const businessPrice = config.businesses[action.payload.businessKey].price;
  const newState = { ...state };

  if (state.totalCashAmount >= businessPrice) {
    newState.totalCashAmount -= businessPrice;
    newState.businesses[action.payload.businessKey] = {
      owner: true,
      managers: []
    }
  }

  return {...newState, businesses: {...newState.businesses}};
}
