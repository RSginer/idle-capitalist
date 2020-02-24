# Idle Capitalist
<span style="display:block;text-align:center">

![alt text](https://i.imgur.com/NWVNAji.gif "Idle Capitalist")

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
This game uses two compatible architecture patterns, a common **onion architecture** (😉 I know that's not very "cool" nowadays but I think that this backend is quite simple and I don't want to do over engineering, maybe for next releases I can refactor it to DDD pattern) with a simplified version of **CQRS pattern**.

Client and server communicates their commands throght a **websocket**.

### Client
Client is a **React-Redux webapp**, with **Redux-Saga**.

### Server
Server is a **Node.js** with **Express** server.

### Database
Server uses a **MongoDB** database.

#### Game Model Schema
This Model is used to store the game data.
```js
Game: {
  businessKey: String,
  level: Number,
  manager: Boolean,
  lastOrderStarted: Number
}
```

#### Business Model Schema
This Model is used to store the businesses data for each `Game`
```js
Business: {
  totalCashAmount: Number,
  businesses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Business'}],
  lastConnectionClosedDateInMs: Number
}
```
## 🤓 Maths
* Calculating expand business cost.

<img src="https://render.githubusercontent.com/render/math?math=cost_{next} = cost_{base} \times (rate_{growth})^{owned}">
<img src="https://render.githubusercontent.com/render/math?math=cost_{base} = {Initial Cost}">
<img src="https://render.githubusercontent.com/render/math?math=rate_{growth} = {Coefficient}">
<img src="https://render.githubusercontent.com/render/math?math=owned = {Business Level}">

* Calculating business revenue per second
<img src="https://render.githubusercontent.com/render/math?math=production_{total} = (production_{base} \times owned)">
<img src="https://render.githubusercontent.com/render/math?math=owned = {Business Level}">
<img src="https://render.githubusercontent.com/render/math?math=production_{base} = {Initial Revenue}">


* 👨🏻‍💼 Managers price is fixed depends on the business:
  - **Lemonade Stand**: $1,000
  - **Newspaper Delivery**: $15,000
  - **Car Wash**: $100,000
  - **Pizza Delivery**: $500,000
  - **Donut Shop**: $1,200,000

* Initial values

<img src="https://cdn1.kongcdn.com/assets/files/0001/8435/anthony_idle_1.png" alt="Maths of Idle capitalist table" width="500px" />

* 👨🏻‍🎓📚 **Bibliography**: https://blog.kongregate.com/the-math-of-idle-games-part-i/
