import config from '../config';
import { types } from './types';

import axios from 'axios';

export const initGame = dispatch => async () => {
  dispatch({ type: types.INIT_GAME });

  axios
    .post(config.serverUrl + '/login', {})
    .then(res => {
      dispatch(initSuccess(res.data));
    })
    .catch(err => {
      dispatch(initError(err.message));
    });

}

const initSuccess = res => ({
  type: types.INIT_GAME_SUCCESS,
  payload: res
})

const initError = error => ({
  type: types.INIT_GAME_ERROR,
  payload: error
});