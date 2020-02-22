const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
  totalCashAmount: String,
  businesses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Business'}]
});

module.exports = mongoose.model('Game', GameSchema);
