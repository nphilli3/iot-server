module.exports = function(sequelize){

	var express = require('express');
	var router = require('express').Router()
	var contactus = require('../middlewares/contactus')(sequelize)

	router.use('/:id', contactus.read)
	router.post('/', contactus.create)
	router.get('/', contactus.list)
	// router.get('/:id', contactus.read)
	router.put('/:id', contactus.update)
	router.delete('/:id', contactus.destroy)

	//Create
	router.post('/',function(req,res){
		res.json(req.payload.contactus)
	})

	//List
	router.get('/', function(req, res) {
	  var payload = req.payload.contactus
	  payload.limit = req.payload.query.limit
	  payload.offset = req.payload.query.offset
	  res.json(req.payload.contactus)

	});
	//Read
	router.get('/:id', function(req, res) {
	  res.json(req.payload.contactus)
	})

	//Update
	router.put('/:id', function(req, res){
	  res.json(req.payload.contactus)
	})

	//Destroy
	router.delete('/:id',function(req,res){
	  res.json(req.payload.contactus)
	})

	return router
}