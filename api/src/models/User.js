const { DataTypes } = require('sequelize');
const { conn } = require('../db.js');
const bcrypt = require('bcrypt');


module.exports = (sequelize) => {
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // is: {
                //     args: /^[a-zA-Z ]*$/i,
                //     msg: "El nombre debe contener solo letras"
                // },
                len: {
                    args: [4, 45],
                    msg: "El nombre debe contener minimo 4 letras"
                }
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // isAlpha: {
                //     args: true,
                //     msg: "El nombre debe contener solo letras"
                // },
                len: {
                    args: [2, 45],
                    msg: "El nombre debe contener minimo 2 letras"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail:{ 
                    args: true,
                    msg: "El mail debe ser valido"
                }
            }
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(25), // este campo no debe ser INTEGER, no son datos manipulables matematicamente
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,80}$/,
                    msg: 'la contraseña debe contener minimo 8 caracteres, una letra minuscula, una letra masyuscula, un numero y un caracter especial'
                }
            }
        },
        birthdate: {
            type: DataTypes.DATEONLY, // si se quiere usar el hook para manipular formato, se debe pasar a STRING y usar libreria "moment"
            allowNull: false,
            },
        role: {
            type: DataTypes.ENUM(['Admin', 'Cliente', 'Responsable']),
            defaultValue: 'Cliente',
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'https://www.farma-erp.cl/img/no_photo.png'
        },
        creationdate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM(["Activo","Inactivo","Bloqueado"]),
            allowNull: true,
            defaultValue: "Activo"
        },
        passwordResetToken: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    }, { hooks: 
        {
        beforeValidate: function set(user) {
            user.birthDate = new Date(user.birthDate)
            }
        // afterValidate: async function set(user) {
        //     console.log('aca: ', user.password)
        //     user.password = await bcrypt.hash(user.password, 9)
        // }
    }, timestamps: false });
};