import { types } from '../../actions/types';

export default (state = {
  userId: 'rsginer-idle-capitalist',
  cashAmount: 0
}, action) => {
  switch (action.type) {
    case types.INIT_GAME_SUCCESS:
      return {...state,  userId: action.payload.userId }
    default:
      return state;
  }
}