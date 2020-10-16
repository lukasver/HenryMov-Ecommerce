const server = require('express').Router();
const { Order, Orderline } = require('../db.js');

//==============================================
//	Ruta para agregar item al carrito
//==============================================
server.post('/users/:idUser/cart', (req, res, next) => {
	const { amount, quantity, productId } = req.body;
	if(!amount || !quantity) {
    return res.sendStatus(400);
  }
  Order.findOne({
  	where: {
  		userId: req.params.idUser,
  		status: 'On Cart'
  	}
  }).then(order => {
  	if (!order) return res.sendStatus(404);
  	return Orderline.create({
  		amount,
  		quantity,
  		orderId: order.id,
  		productId
  	});
  }).then(createdOrderLine => {
  	return res.status(201).send(createdOrderLine);
  });
  /*.catch(err => {
    res.sendStatus(400);
  });*/
});

//=======================================================
//	Ruta para retornar todas las ordenes de los usuarios
//=======================================================
server.get('/users/:id/orders', (req, res, next) => {
	Order.findAll({
		where: {userId: req.params.id}
	}).then(orders => {
		console.log('ORDERS:', orders);
		return res.status(201).send(orders);
	})
});

module.exports = server;