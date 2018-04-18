var express = require('express')
var path = require('path')
var Sequelize = require('sequelize')
var db = require('./config/db.json')
var conserver = require('./config/server.json')
var http = require('http');
var sequelize = new Sequelize(db.database, db.user, db.password,{
	host: db.host,
	port: db.port,
	dialect: db.dialect,
	logging: db.logging
})


require('./models/suggestion')(sequelize)

var suggestion = require('./routes/suggestion')(sequelize)

var app = express()

app.use(express.static('./build'))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/suggestion', suggestion)

var port = normalizePort(process.env.PORT || conserver.port);
app.set('port', port);

var server = http.createServer(app)
server.listen(port)
server.on('error',onError)
server.on('listening', onListening)

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  server.timeout = conserver.timeout
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Server listening on port %s...',addr.port)
}