const { DataTypes } = require('sequelize');
const { conn } = require('../db.js');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
      	isNumeric: true
      }
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
      	isNumeric: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1, //ver la forma de que sea el mismo que stock 
      validate: {
      	isNumeric: true
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
  } , {
  	timestamps: false
  });
};
