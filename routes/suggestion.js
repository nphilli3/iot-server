module.exports = function(sequelize){

	var express = require('express');
	var router = require('express').Router()
	var suggestion = require('../middlewares/suggestion')(sequelize)





	router.post('/suggestion', suggestion.create)
	router.get('/suggestion', suggestion.list)
	router.get('/suggestion/:id', suggestion.read)
	router.put('/suggestion/:id', suggestion.update)
	router.delete('/suggestion/:id', suggestion.destroy)



	//Create
	router.post('/',function(req,res){
		sequelize.models.suggestion.create(req.body).then(function(suggestion) {
			req.payload.suggestion = suggestion
			next()
		}).catch(function(error){
			handler.badRequest(req,res,error.message)
		})
			res.json(req.payload.suggestion)
		})

	//List
	router.get('/', function(req, res) {
	  var payload = req.payload.suggestion
	  payload.limit = req.payload.query.limit
	  payload.offset = req.payload.query.offset
	  res.json(req.payload.suggestion)

	});
	//Read
	router.get('/:id', function(req, res) {
	  res.json(req.payload.suggestion)
	})

	//Update
	router.put('/:id', function(req, res){
	  res.json(req.payload.suggestion)
	})

	//Destroy
	router.delete('/:id',function(req,res){
	  res.json(req.payload.suggestion)
	})

	return router
}