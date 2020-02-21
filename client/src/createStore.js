import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from './rootReducer';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

import { helloSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const enhancers = [
  applyMiddleware(
    ReduxThunk,
    sagaMiddleware
  )
]

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(composeWithDevTools())
}

function configureStore() {
  const store = createStore(
    createRootReducer(),
    compose(
      ...enhancers
    ),
  )

  return store
}

const store = configureStore();

// SAGAS
sagaMiddleware.run(helloSaga);

export default store;

