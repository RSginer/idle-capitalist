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
    case types.MANAGE_ORDER_TICK:
      return manageOrderTick(state, action);
    case types.MANAGE_ORDER_FINISH:
      // TODO: put this logic in backend 
      return manageOrderFinish(state, action)
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
  const businessPrice = state.businessesConfig[action.payload.businessKey].initialCost;
  const newState = { ...state };

  if (state.totalCashAmount >= businessPrice) {
    newState.totalCashAmount -= businessPrice;
    newState.businesses[action.payload.businessKey] = {
      owner: true,
      level: action.payload.level,
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
  business.timer = newState.businessesConfig[businessKey].initialTime;

  newState.businesses[businessKey] = { ...business };

  return {...newState, businesses: {...newState.businesses}};
}

function manageOrderTick(state, action) {
  const newState = {...state};
  const businessKey = action.payload;
  const business = newState.businesses[businessKey];
  if (business.timer > 0) {
    business.processingOrder = true;
    business.timer = business.timer - 100;
  } else if (!business.managers || business.managers.length === 0){
    business.processingOrder = false;
    business.timer = 0;
  } else {
    business.processingOrder = true;
    business.timer = newState.businessesConfig[businessKey].initialTime;
  }

  newState.businesses[businessKey] = {...business };

  return {...newState, businesses: {...newState.businesses}};
}

function manageOrderFinish(state, action) {
  const newState = {...state};
  const businessKey = action.payload;
  const business = newState.businesses[businessKey];

  console.log(business)
  

  // calc revenue
  const initialRevenue = newState.businessesConfig[businessKey].initialRevenue;
  const initialProductivity = newState.businessesConfig[businessKey].initialProductivity;
  
  let profit = (initialProductivity * business.level) * initialRevenue;

  console.log(profit)

  /* if (business.managers && business.managers.length > 0) {
    profit = profit * business.managers.length;
  } */

  newState.totalCashAmount += profit;

  return {...newState};
}
