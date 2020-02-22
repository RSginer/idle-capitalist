const mongoose = require('mongoose');

const BusinessSchema = mongoose.Schema({
  businessKey: String,
  level: Number,
  managers: [Number]
});

module.exports = mongoose.model('Business', BusinessSchema);
