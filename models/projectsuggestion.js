var Sequelize = require('sequelize')


module.exports = function(sequelize) {

	var ProjectSuggestion = sequelize.define('projectSuggestion', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		title: {
			type: Sequelize.STRING
		},
		message: {
			type: Sequelize.TEXT
		},
	}, {
		timestamps: true,
	})

	return ProjectSuggestion

}
