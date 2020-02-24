import { put, takeEvery, call } from 'redux-saga/effects'
import { fetchInit } from "../services";

import { types } from "../actions/types";

function* initGame() {
  try {
    const initRes = yield call(fetchInit);
    yield put({ type: types.INIT_GAME_SUCCESS, payload: initRes.data });
    if (initRes.data.gameState.businesses) {
      const length = initRes.data.gameState.businesses.length
      for (let index = 0; index < length; index++) {
        const business = initRes.data.gameState.businesses[index];
        if (business.manager === true) {
          yield put({ type: types.MANAGE_ORDER, payload: business.businessKey })
        }
      }
    }
  } catch (e) {
    yield put({ type: types.INIT_GAME_ERROR, payload: e.message });
  }
}

function* initialSaga() {
  yield takeEvery(types.WS_CONNECTED, initGame);
}

export default initialSaga;
