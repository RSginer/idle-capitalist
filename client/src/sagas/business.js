import { put, takeEvery, all } from 'redux-saga/effects'

import * as serverActions from '../actions/server';
import { types } from "../actions/types";

function* buyBussiness(action) {
    yield put({type: types.WS_MESSAGE, payload: serverActions.buyBusiness(action.payload)});
}

function* buyBusinessSaga() {
  yield takeEvery(types.BUY_BUSINESS, buyBussiness);
}

export default function* rootSaga() {
  yield all([
    buyBusinessSaga()
  ])
}
