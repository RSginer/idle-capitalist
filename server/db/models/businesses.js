const mongoose = require('mongoose');

const BusinessSchema = mongoose.Schema({
  businessKey: String,
  level: Number,
  manager: Boolean,
  lastOrderStarted: Number
});

module.exports = mongoose.model('Business', BusinessSchema);
