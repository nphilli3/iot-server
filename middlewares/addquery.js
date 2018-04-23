var pluralize = require('pluralize')

module.exports = function(sequelize){

	var router = require('express').Router()
	var _ = require('underscore')

	router.use(function(req,res,next){
		var query = _.mapObject(req.query,function(value){
			try {
				return JSON.parse(value)
			} catch(error){
				return value
			}
		})
		req.payload.query = {
			where: {}
		}
		for (var key in query) {
			var value = query[key]
			if (key == 'limit' || key == 'offset' || key == 'order' || key == 'attributes'){
				req.payload.query[key] = value
			} else if (key == 'include'){
				if (Array.isArray(value)){
					var segments = req.path.split('/')
					var root = segments[segments.length - 1]
					var name = pluralize(root,1)
					var parent = sequelize.models[name]
					if (!parent) continue
					for ( var i in value ){
						var item = value[i]
						if (item.model){
							value[i].model = sequelize.models[item.model]
						} else {
							value[i] = parent.associations[item]
						}
					}
				}
				req.payload.query[key]= value
			} else {
				req.payload.query.where[key] = value
			}
		}
		next()
	})

	return router

}