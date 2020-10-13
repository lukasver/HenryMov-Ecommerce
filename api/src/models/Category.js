const { DataTypes } = require('sequelize') ;
const { conn } = require('../db.js');

module.exports = (sequelize) => {
	sequelize.define('category', {
		name: {type: DataTypes.STRING(45), allowNull: false, unique: true},
		description: {type: DataTypes.TEXT},
		status: {type: DataTypes.ENUM('Activado', 'Desactivado'), defaultValue: 'Activado'}
	},{
	  timestamps: false
	});
}

	