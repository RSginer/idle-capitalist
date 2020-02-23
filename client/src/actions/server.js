import serverComands from './serverCommands';

export function buyBusiness(payload) {
  return {
    command: serverComands.BUY_BUSINESS,
    message: payload
  }
}

export function manageOrder(payload) {
  return {
    command: serverComands.MANAGE_ORDER,
    message: payload
  }
}

export function expandBusiness(payload) {
  return {
    command: serverComands.EXPAND_BUSINESS,
    message: payload
  }
}
