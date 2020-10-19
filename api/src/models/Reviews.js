const { DataTypes } = require('sequelize');
const { conn } = require('../db.js');


module.export =(sequelize) =>{
    sequelize.define('reviews',{
        usuario:{
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
            type: DataTypes.NUMBER,
            allowNull: false
        },
        like:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        dislike:{
            type: DataTypes.NUMBER,
            allowNull: false
        }
    },{timestamps: false })
}