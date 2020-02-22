import serverComands from './serverCommands';

export function buyBusiness(payload) {
  return {
    command: serverComands.BUY_BUSINESS,
    message: payload
  }
}