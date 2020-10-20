const { DataTypes } = require('sequelize');
const { conn } = require('../db.js');

module.exports = (sequelize) => {
	sequelize.define('newsletter', {
		email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        status: {
        	type: DataTypes.ENUM(["suscribed","unsuscribed"]),
        	defaultValue: "suscribed"
        }
	}, { hooks: 
		{
			afterValidate: function set(datos) {
				datos.email = datos.email.toLowerCase();
			}
		
	},timestamps: true })
}