//middleware/middleware.js 

import * as actions from '../actions/websocket';
import { types } from "../actions/types";

const socketMiddleware = () => {
  let socket = null;

  const onOpen = store => (event) => {
    store.dispatch(actions.wsConnected(event.target.url));
  };

  const onClose = store => () => {
    store.dispatch(actions.wsDisconnected());
  };

  const onMessage = store => (event) => {
    const wsMessage = JSON.parse(event.data);

    if (wsMessage) {
      let wsMessageJSON = JSON.parse(wsMessage);
      store.dispatch({ type: wsMessage.type, payload: wsMessage.payload });
    }
  };

  // the middleware part of this function
  return store => next => action => {
    switch (action.type) {
      case types.WS_CONNECT:
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = new WebSocket(action.host);

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case types.WS_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case types.WS_MESSAGE:
        socket.send(JSON.stringify({ command: 'NEW_MESSAGE', payload: action.payload }));
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();