const mongoose = require('mongoose')

const GameSchema = mongoose.Schema({
  totalCashAmount: Number,
  businesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business' }],
  lastConnectionClosedDateInMs: Number
})

module.exports = mongoose.model('Game', GameSchema)
