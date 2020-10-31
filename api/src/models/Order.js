const { DataTypes } = require('sequelize');
const { conn } = require('../db.js');

module.exports = (sequelize) => {
	sequelize.define('order', {
		shipping: {
			type: DataTypes.ENUM('Retiro en Tienda','Envio a domicilio'),
			defaultValue: "Envio a domicilio", // hay que usar 1 como true porque sequelize no acepta true o false en este campo
			allowNull: true
		},
		paymentMethod: {
			type: DataTypes.ENUM('Efectivo','Tarjeta de Credito','Tarjeta de Debito','Rapipago','Pagofacil'), // Tipo entero??
			allowNull: true,
		/*	defaultValue: 'Tarjeta de Credito'*/
		},
		status: {
			type: DataTypes.ENUM('On Cart','Creada','Procesando', 'Enviada','Cancelada','Completa'),
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
		},
		paymentId: { // esto es para ingresar el codigo de confirmación del pago viene de MP
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		paymentStatus: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		paymentDetail:{
			type: DataTypes.STRING,
			allowNull: true,
		}

	},{ timestamps: false })
}