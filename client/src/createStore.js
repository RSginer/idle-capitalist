import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from './rootReducer';
import ReduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

const enhancers = [
  applyMiddleware(
    ReduxThunk
  )
]

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(composeWithDevTools())
}



export default function configureStore() {
  const store = createStore(
    createRootReducer(),
    compose(
      ...enhancers
    ),
  )

  return store
}