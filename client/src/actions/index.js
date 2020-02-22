import { types } from './types';

export function initGame() {
  return {
    type: types.INIT_GAME,
    payload: null
  }
}

export function buyBusiness(businessKey) {
  return {
    type: types.BUY_BUSINESS,
    payload: businessKey
  }
}

export function manageOrder(businessKey) {
  return {
    type: types.MANAGE_ORDER,
    payload: businessKey
  }
}
