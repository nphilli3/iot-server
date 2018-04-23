var Contactus = function(sequelize) {
	
	var handler = require('../library/handler')

	this.create = function(req, res, next) {
		sequelize.models.contactus.create(req.body).then(function(contactus) {
			req.payload.contactus = contactus
			next()
		}).catch(function(error){
			handler.badRequest(req,res,error.message)
		})
	}

	this.read = function(req, res, next) {
		sequelize.models.contactus.findById(req.params.id,req.payload.query).then(function(contactus) {
			if (!contactus) return handler.notFound(req, res, 'Contact message not found.')
			req.payload.contactus = contactus
			next()
		})
	}

	this.update = function(req, res, next) {
		var payload = req.payload.contactus
		payload.update(req.body).then(function(updated){
			payload = updated
			next()
		}).catch(function(error){
			handler.badRequest(req,res,error.message)
		})
	}

	this.destroy = function(req, res, next) {
		req.payload.contactus.destroy().then(function(deleted){
			req.payload.contactus = {
				id: deleted.id,
				deleted: true
			}
			next()
		}).catch(function(error){
			handler.badRequest(req,res,error.message)
		})
	}

	this.list = function(req, res, next) {
		var query = req.payload.query
		sequelize.models.contactus.findAndCountAll(query).then(function(contactus) {
			req.payload.contactus = contactus
			next()
		})
	}

}

module.exports = function(sequelize) {
	return new Contactus(sequelize)
}
