import { types } from '../../actions/types';

export default (state = {
  loading: false,
  error: null,
  totalCashAmount: 0,
  businesses: {},
  businessesConfig: {}
}, action) => {
  switch (action.type) {

    // Init Game
    case types.INIT_GAME_SUCCESS:
      return {
        ...state, loading: false,
        error: null,
        totalCashAmount: parseInt(action.payload.gameState.totalCashAmount),
        businesses: factoryBusinesses(action.payload.gameState.businesses),
        businessesConfig: action.payload.businessesConfig
      };
    case types.INIT_GAME_ERROR:
      return { ...state, loading: false, error: action.payload };
    case types.INIT_GAME:
      return { ...state, loading: true, error: null };

    // Buy Business
    case types.BUY_BUSINESS_SUCCESS:
      return buyBusiness(state, action);

    // Orders
    case types.MANAGE_ORDER:
      return manageOrder(state, action);
    case types.MANAGE_ORDER_SUCCESS:
      return state;
    default:
      return state;
  }
}

function factoryBusinesses(businessesServerResult) {
  let businesses = {};

  businessesServerResult.map((business) => {
    return businesses[business.businessKey] = {
      owner: true,
      managers: business.managers
    }
  });

  return businesses
}

function buyBusiness(state, action) {
  const businessPrice = state.businessesConfig[action.payload.businessKey].price;
  const newState = { ...state };

  if (state.totalCashAmount >= businessPrice) {
    newState.totalCashAmount -= businessPrice;
    newState.businesses[action.payload.businessKey] = {
      owner: true,
      managers: []
    }

    newState.businesses[action.payload.businessKey] = { ...newState.businesses[action.payload.businessKey] };
  }

  return { ...newState, businesses: { ...newState.businesses } };
}

function manageOrder(state, action) {
  const newState = {...state};
  const businessKey = action.payload;
  const business = newState.businesses[businessKey];

  business.processingOrder = true;
  business.timer = newState.businessesConfig[businessKey].orderBaseTimer;

  newState.businesses[businessKey] = business;

  newState.businesses[businessKey] = { ...newState.businesses[businessKey] };

  return {...newState, businesses: {...newState.businesses}};
}