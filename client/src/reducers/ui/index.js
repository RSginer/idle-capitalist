import { types } from '../../actions/types';

export default (state = {
  loading: false,
  error: null
}, action) => {
  switch (action.type) {
    case types.INIT_GAME_SUCCESS:
      return {...state,  loading: false, error: null }
    case types.INIT_GAME_ERROR:
      return {...state, loading: false, error: action.payload}
    case types.INIT_GAME:
      return {...state, loading: true, error: null}
    default:
      return state;
  }
}