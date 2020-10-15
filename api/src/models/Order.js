const { DataTypes } = require('sequelize');
const { conn } = require('../db.js');

module.exports = (sequelize) => {
	sequelize.define('order', {
		shipping: {
			type: DataTypes.BOOLEAN,
			defaultValue: "1", // hay que usar 1 como true porque sequelize no acepta true o false en este campo
			allowNull: true
		},
		paymentMethod: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1
		},
		status: {
			type: DataTypes.ENUM('On Cart','Created','Processing','Cancelled','fulfilled'),
			defaultValue: 'On Cart',
			allowNull: false
		},
		received: { // cuando el cliente recibe o retira la compra debería setearse a true
			type: DataTypes.BOOLEAN,
			defaultValue: "0", // hay que usar 0 como false porque sequelize no acepta true o false en este campo
			allowNull: true
		},
		buyDate: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true,
		}, // ver si esto se genera al momento de confirmar una orden o cuando

	},{ timestamps: false })
}