const { DataTypes } = require('sequelize');
const { conn } = require('../db.js');

module.exports = (sequelize) => {
	sequelize.define('order', {
		shipping: {
			type: DataTypes.BOOLEAN,
			defaultValue: "1",
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
			defaultValue: "0",
			allowNull: true
		},
		buyDate: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW()
		}, // ver si esto se genera al momento de confirmar una orden o cuando

	},{ timestamps: false })
}