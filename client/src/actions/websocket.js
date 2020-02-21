import { types } from "./types";

export const wsConnect = host => ({ type: types.WS_CONNECT, host });
export const wsConnecting = host => ({ type: types.WS_CONNECTING, host });
export const wsConnected = host => ({ type: types.WS_CONNECTED, host });
export const wsDisconnect = host => ({ type: types.WS_DISCONNECT, host });
export const wsDisconnected = host => ({ type: types.WS_DISCONNECTED, host });