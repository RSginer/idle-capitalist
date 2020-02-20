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
    default:
      return state;
  }
}