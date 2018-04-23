var Suggestion = function(sequelize) {
	
	var handler = require('../library/handler')

	this.create = function(req, res, next) {
		sequelize.models.suggestion.create(req.body).then(function(suggestion) {
			req.payload.suggestion = suggestion
			next()
		}).catch(function(error){
			handler.badRequest(req,res,error.message)
		})
	}

	this.read = function(req, res, next) {
		sequelize.models.suggestion.findById(req.params.id,req.payload.query).then(function(suggestion) {
			if (!suggestion) return handler.notFound(req, res, 'Suggestion not found.')
			req.payload.suggestion = suggestion
			next()
		})
	}

	this.update = function(req, res, next) {
		var payload = req.payload.suggestion
		payload.update(req.body).then(function(updated){
			payload = updated
			next()
		}).catch(function(error){
			handler.badRequest(req,res,error.message)
		})
	}

	this.destroy = function(req, res, next) {
		req.payload.suggestion.destroy().then(function(deleted){
			req.payload.suggestion = {
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
		sequelize.models.suggestion.findAndCountAll(query).then(function(suggestions) {
			req.payload.suggestions = suggestions
			next()
		})
	}

}

module.exports = function(sequelize) {
	return new Suggestion(sequelize)
}
