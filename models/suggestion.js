var Sequelize = require('sequelize')


module.exports = function(sequelize) {

	var Suggestion = sequelize.define('suggestion', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		suggestionMessage: {
			type: Sequelize.TEXT
		},
	}, {
		timestamps: true,
	})

	return Suggestion

}
