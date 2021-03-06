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

export function expandBusiness(businessKey) {
  return {
    type: types.EXPAND_BUSINESS,
    payload: businessKey
  }
}

export function hireManager(businessKey){
  return {
    type: types.HIRE_MANAGER,
    payload: businessKey
  }
}

export function closeIdleDialog() {
  return {
    type: types.CLOSE_IDLE_DIALOG,
    payload: null
  }
}
