const { DataTypes } = require('sequelize');
const { conn } = require('../db.js');


module.exports =(sequelize) =>{
    sequelize.define('reviews', {
        usuarioId:{
            type: DataTypes.STRING,
            allowNull: false
        },
        title:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        value:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{timestamps: false })
}
