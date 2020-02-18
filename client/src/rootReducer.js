import { combineReducers } from 'redux';

import player from './reducers/player';
import stores from './reducers/stores';
import ui from './reducers/ui';

export default () => combineReducers({
  player,
  stores,
  ui
})