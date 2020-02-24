import { put, takeEvery, all, call, fork, select } from 'redux-saga/effects'

import * as serverActions from '../actions/server';
import { types } from "../actions/types";

// Buy Business
function* buyBussiness(action) {
  yield put({ type: types.WS_MESSAGE, payload: serverActions.buyBusiness(action.payload) });
}

function* buyBusinessSaga() {
  yield takeEvery(types.BUY_BUSINESS, buyBussiness);
}

// Expand Business
function* expandBusiness(action) {
  yield put({ type: types.WS_MESSAGE, payload: serverActions.expandBusiness(action.payload) })
}

function* expandBusinessSaga() {
  yield takeEvery(types.EXPAND_BUSINESS, expandBusiness)
}

// Hire Manager
function* hireManager(action) {
  yield put({ type: types.WS_MESSAGE, payload: serverActions.hireManager(action.payload) });
}

function* hireManagerSaga() {
  yield takeEvery(types.HIRE_MANAGER, hireManager)
}

function* hireManagerSuccess(action) {
  const business = action.payload;

  if (business && business.manager === true) {
    yield put({ type: types.MANAGE_ORDER, payload: business.businessKey })
  }
}

function* hireManagerSuccessSaga() {
  yield takeEvery(types.HIRE_MANAGER_SUCCESS, hireManagerSuccess)
}

// Manage Order
function* manageOrder(action) {
  yield put({ type: types.WS_MESSAGE, payload: serverActions.manageOrder(action.payload) });
  const businesses = yield select((state) => state.game.businesses);
  const business = businesses[action.payload];
  if (business && business.manager === true && !business.processingOrder) {
    yield put({ type: types.MANAGE_ORDER, payload: action.payload })
  }
}

function* manageOrderSaga() {
  yield takeEvery(types.MANAGE_ORDER_FINISH, manageOrder);
}

export const getIsProcessing = (businessKey) => (state) => state.game.businesses[businessKey].processingOrder;

export const getBusinessTimer = (businessKey) => (state) => state.game.businesses[businessKey].timer;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function manageOrderDelay(businessKey) {
  return function* () {
    let isProcessing = yield select(getIsProcessing(businessKey));
    yield put({ type: types.WS_MESSAGE, payload: serverActions.manageOrderStart(businessKey) });
    while (isProcessing) {
      yield put({ type: types.MANAGE_ORDER_TICK, payload: businessKey });
      isProcessing = yield select(getIsProcessing(businessKey));
      yield call(delay, 10);
    }

    yield put({ type: types.MANAGE_ORDER_FINISH, payload: businessKey });

  }
}

function* manageOrderTimer() {
  yield takeEvery(types.MANAGE_ORDER, function* (action) {
    yield fork(manageOrderDelay(action.payload))
  })
}

export default function* rootSaga() {
  yield all([
    buyBusinessSaga(),
    manageOrderTimer(),
    manageOrderSaga(),
    expandBusinessSaga(),
    hireManagerSaga(),
    hireManagerSuccessSaga()
  ])
}
