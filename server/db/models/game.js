const mongoose = require('mongoose');

const BusinessSchema = mongoose.Schema({
  type: String,
  level: Number,
})

const GameSchema = mongoose.Schema({
  totalCashAmount: String,
  businesses: [BusinessSchema]
});

module.exports = mongoose.model('Game', GameSchema);
