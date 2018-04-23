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

	}

	this.unauthorized = function(req,res,message){
		res.status(401)
		var error = new Error( message || 'Unauthorized')
		error.source = req.originalUrl
		res.json(this.formatError(error))
	}

	this.notFound = function(req,res,message){
		res.status(404)
		var error = new Error( message || 'Not Found')
		error.source = req.originalUrl
		res.json(this.formatError(error))

	}

	this.notModified = function(req,res,message){
		res.status(304)
		var error = new Error( message || 'Not Modified')
		error.source = req.originalUrl
		res.json(this.formatError(error))

	}

	this.internalError = function(req,res,message){
		res.status(500)
		var error = new Error( message || 'Internal Server Error')
		error.source = req.originalUrl
		res.json(this.formatError(error))

	}

}


module.exports = new Handler
