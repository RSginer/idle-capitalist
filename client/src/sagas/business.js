import { put, takeEvery, all, call, take, fork, cancel, select } from 'redux-saga/effects'

import * as serverActions from '../actions/server';
import { types } from "../actions/types";

// Buy Business
function* buyBussiness(action) {
  yield put({ type: types.WS_MESSAGE, payload: serverActions.buyBusiness(action.payload) });
}

function* buyBusinessSaga() {
  yield takeEvery(types.BUY_BUSINESS, buyBussiness);
}

// Manage Order
export const getIsProcessing = (businessKey) => (state) => state.game.businesses[businessKey].processingOrder;

export const getBusinessTimer = (businessKey) => (state) => state.game.businesses[businessKey].timer;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function manageOrderDelay(businessKey) {
  return function* () {
    let isProcessing = yield select(getIsProcessing(businessKey));

    while (isProcessing) {
      yield put({ type: types.MANAGE_ORDER_TICK, payload: businessKey });
      isProcessing = yield select(getIsProcessing(businessKey));
      console.log('Processing order...')
      yield call(delay, 100);
    }

    yield put({ type: types.MANAGE_ORDER_FINISH, payload: businessKey });

  }
}

function* manageOrderTimer() {
  yield takeEvery(types.MANAGE_ORDER, function* (action) {
    const bgSyncTask = yield fork(manageOrderDelay(action.payload))
  })

}

export default function* rootSaga() {
  yield all([
    buyBusinessSaga(),
    manageOrderTimer()
  ])
}
