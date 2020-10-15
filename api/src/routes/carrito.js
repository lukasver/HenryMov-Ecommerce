const server = require('express').Router();
const { Product, User, Order, Orderline } = require('../db.js');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;


//======================================================================== 
//	Ruta para devolver el último carrito abierto de un usuario registrado
//======================================================================== 

server.get('/users/:idUser/cart', async (req,res,next) => {

	const { idUser } = req.params
	
	try{
	const usuario = await User.findOne({ // Devuelve el carrito abierto del usuario solicitado
		where: {
			id: idUser,
		},
		include: { model: Order, where: {status: 'On Cart'} }
	})


	if (!usuario) return res.status(400).send('<h1>Usuario no encontrado o sin carrito con estado abierto<h1/>')
	await res.json(usuario)
		} catch (error) {
			return res.status(400).send(error.name)
		}

})
//======================================================================== 








module.exports = server;
