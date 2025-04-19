# Idle Capitalist
<span style="display:block;text-align:center">

![alt text](https://raw.githubusercontent.com/RSginer/idle-capitalist/master/screenshot.gif "Idle Capitalist")

</span>


### Features
  - ✅ Buy Business.
  - ✅ Multiple Business to choose
  - ✅ Upgrade Business.
  - ✅ Manage orders.
  - ✅ Hire Managers.
  - ✅ Managers automatically manage orders.
  - ✅ Your businesses make money for you while you are out, even if the server is down or the websocket is disconnected.
  - ✅ Websocket reconnection.

## Getting Started 🎉
* Clone the repository. 
```bash
git clone https://github.com/RSginer/idle-capitalist.git
```
### Docker
* Build images.
```bash
cd idle-capitalist
docker-compose build
```

* Run the containers.
```bash 
docker-compose up
```

* Go to http://localhost:3000 🤘
### npm
* This option needs Node.js v12.16.1 installed and a MongoDB instance running on your localhost
#### Start Server

* Install dependencies
```bash
cd idle-capitalist/server
npm install
```

* Start the server
```bash
npm run start
```

* Start the server in development mode
```bash
npm run start:dev
```
#### Start Client
* Install dependencies
```bash
cd idle-capitalist/client
npm install
```

* Start Webapp
```bash
npm run start
```

* Go to http://localhost:3000 🤘

## 👨‍💻 Technical things

Workflow: 
`Web browser -> React Component -> Dispatch Redux Action -> Redux Saga Catch -> Websocket Emmit -> Server Websocket -> Controller -> RPC Exec Command -> Service -> Repository -> Database`.

Initial game state is fetched from an REST API `GET /api/v1/game/initialGameState`.

Client and server communicates their commands throght a **websocket**.

### Client
Client is a **React-Redux webapp**, with **Redux-Saga**, so is a implementation of the flux pattern.
It's also ready to use with **[Redux-DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)**

### Server
Server is a **Node.js** with **Express** server.

### Database
Server uses a **MongoDB** database.

#### Game Model Schema
This Model is used to store the game data.
```js
Game: {
  totalCashAmount: Number,
  businesses: [Business],
  lastEventDateInMs: Number
}
```

#### Business Model Schema
This Model is used to store the businesses data for each `Game`
```js
Business: {
  businessKey: String,
  level: Number,
  manager: Boolean,
  lastOrderStarted: Number
}
```
### Maths
* Calculating expand business cost.

$cost_{next} = cost_{base} \times (rate_{growth})^{owned}$

$cost_{base} = \text{Initial Cost}$

$rate_{growth} = \text{Coefficient}$

$owned = \text{Business Level}$

* Calculating business revenue per second

$production_{total} = (production_{base} \times owned)$

$owned = \text{Business Level}$

$production_{base} = \text{Initial Productivity}$

* 👨🏻‍💼 Managers price is fixed depends on the business:
  - **Lemonade Stand**: $1,000
  - **Newspaper Delivery**: $15,000
  - **Car Wash**: $100,000
  - **Pizza Delivery**: $500,000
  - **Donut Shop**: $1,200,000

* Initial values

<img src="https://cdn1.kongcdn.com/assets/files/0001/8435/anthony_idle_1.png" alt="Maths of Idle capitalist table" width="500px" />

* 👨🏻‍🎓📚 **Bibliography**: https://blog.kongregate.com/the-math-of-idle-games-part-i/
