const mongoose = require('mongoose');

const BusinessSchema = mongoose.Schema({
  businessKey: String,
  level: Number,
  manager: Boolean
});

module.exports = mongoose.model('Business', BusinessSchema);
