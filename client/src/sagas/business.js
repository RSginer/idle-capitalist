import { put, takeEvery, call, all } from 'redux-saga/effects'
import { fetchInit } from "../services";

import { types } from "../actions/types";
import config from "../config";

function* buyBussiness(action) {
    const serverAction = {
      command: 'buyBusiness',
      message: action.payload
    }

    yield put({type: types.WS_MESSAGE, payload: serverAction});
}

function* buyBusinessSaga() {
  yield takeEvery(types.BUY_BUSINESS, buyBussiness);
}

export default function* rootSaga() {
  yield all([
    buyBusinessSaga()
  ])
}
