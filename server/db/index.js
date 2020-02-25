const debug = require('debug')('idle-capitalist-server:db')
const mongoose = require('mongoose')

function setupDB (dbUri) {
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  mongoose.set('useUnifiedTopology', true)
  mongoose.connect(dbUri)

  const db = mongoose.connection

  db.on('error', function (err) {
    debug(err)
  })

  db.once('open', function () {
    debug('Connection Successful!')
  })

  return db
}

module.exports = setupDB
