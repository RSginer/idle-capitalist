export const types = {

  // Websocket
  WS_CONNECT: "[Websocket] Connect",
  WS_CONNECTING: "[Websocket] Connecting",
  WS_CONNECTED: "[Websocket] Connected",
  WS_DISCONNECT: "[Websocket] Disconnect",
  WS_DISCONNECTED: "[Websocket] Disconnected",
  WS_MESSAGE: "[Websocket] Send Message",

  // Init Game
  INIT_GAME: '[Game] Init',
  INIT_GAME_SUCCESS: '[Server] Init Succesfully',
  INIT_GAME_ERROR: '[Server] Init Error',

  // Buy Business
  BUY_BUSINESS: '[Business] Buy Business',
  BUY_BUSINESS_SUCCESS: '[Server] Buy Business Success',
  BUY_BUSINESS_ERROR: '[Server] Buy Business Error',

  // Manage Order
  MANAGE_ORDER: '[Business] Manage Order',
  MANAGE_ORDER_SUCCESS: '[Server] Manage Order Success',
  MANAGE_ORDER_ERROR: '[Server] Manage Order Error',
  MANAGE_ORDER_TICK: '[Timer] Manage Order Tick',
  MANAGE_ORDER_FINISH: '[Timer] Manage Order Finish',

  // Expand Business
  EXPAND_BUSINESS: '[Business] Expand',
  EXPAND_BUSINESS_SUCCESS: '[Server] Expand Success',
  EXPAND_BUSINESS_ERROR: '[Server] Expand Error',
}
