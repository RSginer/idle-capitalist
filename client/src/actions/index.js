import config from '../config';
import { types } from './types';

import axios from 'axios';

export const initGame = dispatch => async () => {
 


}

const initSuccess = res => ({
  type: types.INIT_GAME_SUCCESS,
  payload: res
})

const initError = error => ({
  type: types.INIT_GAME_ERROR,
  payload: error
});