import { put, takeEvery, call } from 'redux-saga/effects'
import { fetchInit } from "../services";

import { types } from "../actions/types";

function* initGame() {
  try {
    const initRes = yield call(fetchInit);
    yield put({ type: types.INIT_GAME_SUCCESS, payload: initRes });
  } catch (e) {
    yield put({ type: types.INIT_GAME_ERROR, payload: e.message });
  }
}

function* initialSaga() {
  yield takeEvery(types.INIT_GAME, initGame);
}

export default initialSaga;
