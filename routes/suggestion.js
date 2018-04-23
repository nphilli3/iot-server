module.exports = function(sequelize){

	var express = require('express');
	var router = require('express').Router()
	var suggestion = require('../middlewares/suggestion')(sequelize)

	router.use('/:id', suggestion.read)
	router.post('/', suggestion.create)
	router.get('/', suggestion.list)
	// router.get('/:id', suggestion.read)
	router.put('/:id', suggestion.update)
	router.delete('/:id', suggestion.destroy)

	//Create
	router.post('/',function(req,res){
		res.json(req.payload.suggestion)
	})

	//List
	router.get('/', function(req, res) {
	  var payload = req.payload.suggestions
	  payload.limit = req.payload.query.limit
	  payload.offset = req.payload.query.offset
	  res.json(req.payload.suggestions)

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