var ProjectSuggestion = function(sequelize) {
	
	var handler = require('../library/handler')

	this.create = function(req, res, next) {
		sequelize.models.projectSuggestion.create(req.body).then(function(projectSuggestion) {
			req.payload.projectSuggestion = projectSuggestion
			next()
		}).catch(function(error){
			handler.badRequest(req,res,error.message)
		})
	}

	this.read = function(req, res, next) {
		sequelize.models.projectSuggestion.findById(req.params.id,req.payload.query).then(function(projectSuggestion) {
			if (!projectSuggestion) return handler.notFound(req, res, 'Contact message not found.')
			req.payload.projectSuggestion = projectSuggestion
			next()
		})
	}

	this.update = function(req, res, next) {
		var payload = req.payload.projectSuggestion
		payload.update(req.body).then(function(updated){
			payload = updated
			next()
		}).catch(function(error){
			handler.badRequest(req,res,error.message)
		})
	}

	this.destroy = function(req, res, next) {
		req.payload.projectSuggestion.destroy().then(function(deleted){
			req.payload.projectSuggestion = {
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
		sequelize.models.projectSuggestion.findAndCountAll(query).then(function(projectSuggestion) {
			req.payload.projectSuggestion = projectSuggestion
			next()
		})
	}

}

module.exports = function(sequelize) {
	return new ProjectSuggestion(sequelize)
}
