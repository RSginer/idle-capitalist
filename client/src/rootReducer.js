import { combineReducers } from 'redux';

import player from './reducers/player';
import businesses from './reducers/businesses';
import ui from './reducers/ui';

export default () => combineReducers({
  player,
  businesses,
  ui
})