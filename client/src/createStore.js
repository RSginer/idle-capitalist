import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from './rootReducer';

import createSagaMiddleware from 'redux-saga';
import wsMiddleware from './middlewares/websocket';
import { composeWithDevTools } from 'redux-devtools-extension';

import initialSaga from "./sagas";
import websocketConnectionSaga from "./sagas/websocket";


const sagaMiddleware = createSagaMiddleware();
const enhancers = [
  applyMiddleware(
    sagaMiddleware,
    wsMiddleware
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
sagaMiddleware.run(websocketConnectionSaga);


export default store;

