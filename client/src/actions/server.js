import serverComands from './serverCommands';

export function buyBusiness(payload) {
  return {
    command: serverComands.buyBusiness,
    paylod: payload
  }
}