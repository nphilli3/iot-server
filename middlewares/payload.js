var router = require('express').Router()

router.use(function(req,res,next){
	req.payload = {}
	next()
})

module.exports = router

