import { put, takeEvery, call, all } from 'redux-saga/effects'
import { fetchInit } from "../services";

import { types } from "../actions/types";
import { wsConnect } from "../actions/websocket";
import config from "../config";

function* connectWebsocket() {
    yield put(wsConnect(config.websocketUrl));
}

function* websocketConnectionSaga() {
  yield takeEvery(types.INIT_GAME_SUCCESS, connectWebsocket);
}

export default function* rootSaga() {
  yield all([
    websocketConnectionSaga()
  ])
}