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
