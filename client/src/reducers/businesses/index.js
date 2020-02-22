import { types } from '../../actions/types';

export default (state = {
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
  const business = state[action.payload];
  business.owner = true;
  const newState = {...state};
  newState[action.payload] = Object.assign({}, business);
  return newState;
}