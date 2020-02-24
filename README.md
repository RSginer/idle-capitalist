# Idle Capitalist 🤑💰
<span style="display:block;text-align:center">

![alt text](https://i.imgur.com/NWVNAji.gif "Idle Capitalist")

</span>


### Features
  - ✅ Buy Business.
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
## 🤓 Maths
![alt text](https://cdn1.kongcdn.com/assets/files/0001/8435/anthony_idle_1.png "Maths of Idle capitalist table")

* Calculating expand business cost (owned = business level)
$$cost_{next} = cost_{base} \times (rate_{growth})^{owned}.$$

* Calculating order revenue per second
$$production_{total} = (production_{base} \times owned) \times.$$

* Managers price is fixed depends on the business:
  - Lemonade Stand: $1,000
  - Newspaper Delivery: $15,000
  - Car Wash: $100,000
  - Pizza Delivery: $500,000
  - Donut Shop: $1,200,000

* Source: https://blog.kongregate.com/the-math-of-idle-games-part-i/

