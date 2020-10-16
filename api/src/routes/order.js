const server = require('express').Router();
const { Order, Orderline, User } = require('../db.js');

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

server.get('/users/orders', (req, res, next) => {
    const { order } = req.query
    console.log(req.query)
    Order.findAll({
        order: ['id'],
        where :{status: order }
	})
		.then(orders => {
			if (!orders) {
				return res.send('<h1>No hay ordenes cargadas</h1>')
			}
			res.json(orders);
            next()
        })
});

server.get('/users/:idUser/orders', async (req,res,next) => {
    const { idUser } = req.params

    try{
    const usuario = await User.findOne({ // Devuelve el carrito abierto del usuario solicitado
        where: {
            id: idUser,
        },
        include: { model: Order}
    })

    if (!usuario) return res.status(400).send('<h1>Usuario no encontrado o sin carrito con estado abierto<h1/>')
    await res.json(usuario)
        } catch (error) {
            return res.status(400).send(error)
        }

})

module.exports = server;