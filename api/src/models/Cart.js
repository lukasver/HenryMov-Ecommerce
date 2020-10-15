const { DataTypes } = require('sequelize');
const { conn } = require('../db.js');

module.exports = (sequelize) => {
	sequelize.define('cart', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		amount: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		quantity: { // cantidad de producto q viene de la asociacion de products 
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1
		}

	},{ timestamps: false })
}