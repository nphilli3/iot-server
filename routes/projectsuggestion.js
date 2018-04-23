module.exports = function(sequelize){

	var express = require('express');
	var router = require('express').Router()
	var projectSuggestion = require('../middlewares/projectsuggestion')(sequelize)

	router.use('/:id', projectSuggestion.read)
	router.post('/', projectSuggestion.create)
	router.get('/', projectSuggestion.list)
	// router.get('/:id', projectSuggestion.read)
	router.put('/:id', projectSuggestion.update)
	router.delete('/:id', projectSuggestion.destroy)

	//Create
	router.post('/',function(req,res){
		res.json(req.payload.projectSuggestion)
	})

	//List
	router.get('/', function(req, res) {
	  var payload = req.payload.projectSuggestion
	  payload.limit = req.payload.query.limit
	  payload.offset = req.payload.query.offset
	  res.json(req.payload.projectSuggestion)

	});
	//Read
	router.get('/:id', function(req, res) {
	  res.json(req.payload.projectSuggestion)
	})

	//Update
	router.put('/:id', function(req, res){
	  res.json(req.payload.projectSuggestion)
	})

	//Destroy
	router.delete('/:id',function(req,res){
	  res.json(req.payload.projectSuggestion)
	})

	return router
}