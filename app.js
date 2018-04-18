var express = require('express')
var path = require('path')
var Sequelize = require('sequelize')

var cfg = {
  db: require('./config/db.json'),
  server: require('./config/server.json')
}
var http = require('http');
var sequelize = new Sequelize(cfg.db.database, cfg.db.user, cfg.db.password,{
	host: cfg.db.host,
	port: cfg.db.port,
	dialect: cfg.db.dialect,
	logging: cfg.db.logging
})

var payload = require('./middlewares/payload')

require('./models/suggestion')(sequelize)

var suggestion = require('./routes/suggestion')(sequelize)

var app = express()

app.use(express.static('./build'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(payload)

app.use('/suggestion', suggestion)

sequelize.sync().then(function(){
  app.listen(cfg.server.port,function(error){
    if (error) throw error
    console.log('listening at %s:%s',cfg.server.host,cfg.server.port)
  })
})