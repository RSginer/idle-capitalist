import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

import initialSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const enhancers = [
  applyMiddleware(
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
sagaMiddleware.run(initialSaga);

export default store;

