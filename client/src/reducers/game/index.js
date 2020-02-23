import { types } from '../../actions/types';
import util from '../../util';

export default (state = {
  showIdleDialog: false,
  socketConnected: true,
  loading: false,
  error: null,
  totalCashAmount: 0,
  businesses: {},
  businessesConfig: {}
}, action) => {
  switch (action.type) {
    case types.WS_DISCONNECTED:
      return {...state, socketConnected: false};
    case types.WS_CONNECTED:
      return {...state, socketConnected: true}

    // Init Game
    case types.INIT_GAME_SUCCESS:
      return {
        ...state, loading: false,
        error: null,
        totalCashAmount: parseInt(action.payload.gameState.totalCashAmount),
        businesses: factoryBusinesses(action.payload.gameState.businesses),
        businessesConfig: action.payload.businessesConfig,
        showIdleDialog: action.payload.showIdleDialog,
        idleTime: action.payload.idleTime,
        idleRevenue: action.payload.idleRevenue
      };
    case types.INIT_GAME_ERROR:
      return { ...state, loading: false, error: action.payload };
    case types.INIT_GAME:
      return { ...state, loading: true, error: null };
    
    // Hire Manager
    case types.HIRE_MANAGER_SUCCESS:
      return hireManager(state, action);

    // Buy Business
    case types.BUY_BUSINESS_SUCCESS:
      return buyBusiness(state, action);
    
    // Expand Business
    case types.EXPAND_BUSINESS_SUCCESS:
      return expandBusiness(state, action)

    // Orders
    case types.MANAGE_ORDER:
      return manageOrder(state, action);
    case types.MANAGE_ORDER_TICK:
      return manageOrderTick(state, action);
    case types.MANAGE_ORDER_SUCCESS:
      return { ...state, totalCashAmount: action.payload }
    
    // Others
    case types.CLOSE_IDLE_DIALOG:
      return {...state, showIdleDialog: false, idleTime: 0, idleRevenue: 0}
    default:
      return state;
  }
}

function factoryBusinesses(businessesServerResult) {
  let businesses = {};

  businessesServerResult.map((business) => {
    return businesses[business.businessKey] = {
      owner: true,
      level: business.level,
      manager: business.manager
    }
  });

  return businesses
}

function buyBusiness(state, action) {
  const businessPrice = state.businessesConfig[action.payload.businessKey].initialCost;
  const newState = { ...state };

  if (newState.totalCashAmount >= businessPrice) {
    newState.totalCashAmount = Math.round((newState.totalCashAmount - businessPrice) * 100) / 100;
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
  const newState = { ...state };
  const businessKey = action.payload;
  const business = newState.businesses[businessKey];

  business.processingOrder = true;
  business.timer = newState.businessesConfig[businessKey].initialTime;

  newState.businesses[businessKey] = { ...business };

  return { ...newState, businesses: { ...newState.businesses } };
}

function manageOrderTick(state, action) {
  const newState = { ...state };
  const businessKey = action.payload;
  const business = newState.businesses[businessKey];
  if (business.timer > 0) {
    business.processingOrder = true;
    business.timer = business.timer - 100;
  } else if (!business.managers || business.managers.length === 0) {
    business.timer = 0;
    business.processingOrder = false;
  } else {
    business.processingOrder = true;
    business.timer = newState.businessesConfig[businessKey].initialTime;
  }

  newState.businesses[businessKey] = { ...business };

  return { ...newState, businesses: { ...newState.businesses } };
}

function expandBusiness(state, action) {
  const newState = { ...state };
  const businessKey = action.payload.businessKey;
  const business = newState.businesses[businessKey];
  const rateGrowth = newState.businessesConfig[businessKey].coefficient;
  const costBase = newState.businessesConfig[businessKey].initialCost;
  const businessLevel = newState.businesses[businessKey] && business.level ? business.level : 1;
  const cost = util.getNextExpandCost(costBase, businessLevel, rateGrowth);
  
  newState.totalCashAmount = Math.round((newState.totalCashAmount - cost) * 100) / 100;
  business.level = action.payload.level;
  newState.businesses[businessKey] = { ...business };

  return { ...newState, businesses: { ...newState.businesses } };
}

function hireManager(state, action) {
  const newState = { ...state };
  const businessKey = action.payload.businessKey;
  const business = newState.businesses[businessKey];

  business.manager = true;

  const cost = newState.businessesConfig[businessKey].managerPrice;

  newState.totalCashAmount = Math.round((newState.totalCashAmount - cost) * 100) / 100;

  newState.businesses[businessKey] = { ...business };

  return { ...newState, businesses: { ...newState.businesses } };
}
