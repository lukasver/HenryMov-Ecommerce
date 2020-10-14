const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: "El nombre debe contener solo letras"
                },
                len: {
                    args: [3, 45],
                    msg: "El nombre debe contener minimo 3 letras"
                }
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: "El apellido debe contener solo letras"
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
        addres: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: {
                    args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,32}$/,
                    msg: 'la contraseña debe contener minimo 8 caracteres, una letra minuscula, una letra masyuscula y un numero'
                }
            }
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(['Administrador', 'Cliente'])
        }
    });
};