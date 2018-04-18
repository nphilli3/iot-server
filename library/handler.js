var Handler = function(){


	this.formatError = function(error){
		var err = {}
		var keys = Object.getOwnPropertyNames(error)
		for (var i in keys) {
			var key = keys[i]
			err[key] = error[key]
		}
		if ( err.stack ){
			err.stack = err.stack.split('\n')
		}
		return {
			error: err
		}
	}

	this.badRequest = function(req,res,message){
		res.status(400)
		var error = new Error(message || 'Bad Request')
		error.source = req.originalUrl
		res.json(this.formatError(error))
		req.log.update({
			status: 400,
			message: error.message,
			stack: error.stack
		})
	}

	this.unauthorized = function(req,res,message){
		res.status(401)
		var error = new Error( message || 'Unauthorized')
		error.source = req.originalUrl
		res.json(this.formatError(error))
		req.log.update({
			status: 401,
			message: error.message,
			stack: error.stack
		})
	}

	this.notFound = function(req,res,message){
		res.status(404)
		var error = new Error( message || 'Not Found')
		error.source = req.originalUrl
		res.json(this.formatError(error))
		req.log.update({
			status: 404,
			message: error.message,
			stack: error.stack
		})
	}

	this.notModified = function(req,res,message){
		res.status(304)
		var error = new Error( message || 'Not Modified')
		error.source = req.originalUrl
		res.json(this.formatError(error))
		req.log.update({
			status: 304,
			message: error.message,
			stack: error.stack
		})
	}

	this.internalError = function(req,res,message){
		res.status(500)
		var error = new Error( message || 'Internal Server Error')
		error.source = req.originalUrl
		res.json(this.formatError(error))
		req.log.update({
			status: 500,
			message: error.message,
			stack: error.stack
		})
	}

}


module.exports = new Handler
