var Sequelize = require('sequelize')


module.exports = function(sequelize) {

	var Contactus = sequelize.define('contactus', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		message: {
			type: Sequelize.TEXT
		},
	}, {
		timestamps: true,
	})

	return Contactus

}
