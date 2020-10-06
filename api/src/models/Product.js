const { DataTypes } = require('sequelize');
const { conn } = require('../db.js');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
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
      allowNull: false,
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
      validate: {
      	isNumeric: true
      }
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      	isUrl: true
      }
    },
  } , {
  	timestamps: false
  });
};
