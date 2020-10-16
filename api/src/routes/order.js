const server = require('express').Router();
// ========================================================================
// ============Get de todas las orders=====================================
// ========================================================================

const { Product, User, Order, Orderline } = require('../db.js');
const { Sequelize } = require('sequelize');


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
// server.get('/users/:id/orders', (req, res, next) => {
// 	Order.findAll({
// 		where: {userId: req.params.id}
// 	}).then(orders => {
// 		console.log('ORDERS:', orders);
// 		return res.status(201).send(orders);
// 	})
// });

server.get('/users/orders', (req, res, next) => {
    Order.findAll({
        order: ['id'],
	})
    .then(orders => {
        if (!orders) {
            return res.send('<h1>No hay ordenes cargadas</h1>')
        }
        res.json(orders);
    })
});

// ========================================================================
// ============Get de las ordenes por status ==============================
// ========================================================================
server.get('/users/ordersByQuery', (req, res, next) => {
    const { order } = req.query
    Order.findAll({
        order: ['id'],
        where :{status: order }
	})
    .then(orders => {
        if (!orders) {
            return res.send('<h1>No hay ordenes cargadas</h1>')
        }
        res.json(orders);
    })
});

// ========================================================================
// ============Get todas las ordenes de cada usuario ======================
// ========================================================================

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


//======================================================================== 
//  Ruta para devolver el último carrito abierto de un usuario registrado - GET
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

//======================================================================== 
//  Ruta para editar cantidad del carrito - PUT
//======================================================================== 

server.put('/users/:idUser/cart', async (req,res,next) => {

    // FRONT DEBE PASAR ID DE PRODUCTO A UPDATEAR, CANTIDAD Y PRECIO UNITARIO (OPCIONAL)
    const { idUser } = req.params
    const { productId, quantity, amount } = req.body

    try{
    // SI LA CANTIDAD SOLICITADA EXCEDE EL STOCK DISPONIBLE, SE RECHAZA EL PEDIDO...
    const producto = await Product.findByPk(productId)
    !producto ? res.status(406).send('<h1> Producto no presente en orderline </h1>') : null;
    if (producto.get('stock') < quantity) return res.status(406).send('<h1> Stock insuficiente </h1>')

    // DEVUELVE EL CARRITO ABIERTO DEL USUARIO SOLICITADO - SI NO ENCUENTRA USUARIO, RECHAZA...
    const usuario = await User.findOne({ 
        where: {
            id: idUser,
        },
        include: {model: Order, where: {status: 'On Cart'}, attributes: ['id','status']}
    })
    if (!usuario ) return res.status(400).send('<h1>Usuario no encontrado o sin carrito con estado abierto<h1/>')

    // DEVUELVE LAS ORDERLINE QUE CORRESPONDAN A LA ORDENID DEL USUARIO - SI NO ENCUENTRA ORDERLINES, RECHAZA...
    const carrito = await Orderline.findAll({
        where: {orderId: usuario.orders[0].id}
    })
    if (!carrito ) return res.status(400).send('<h1>Orden sin orderlines existentes<h1/>')


    // UPDATEA CANTIDAD EN BD SI EL ID DEL PRODUCTO RECIBIDO X BODY MATCHEA CON ALGUNO EN LA ORDERLINE
    carrito.forEach(orderline => {  
        if (orderline.get('productId') == productId) {
            orderline.setDataValue('quantity', quantity)
            if(amount) orderline.setDataValue('amount', amount)
            orderline.save();  // necesario para guardar los cambios en la DB
        }
            return;
    })

    await res.json(carrito)
        } catch (error) {
            return res.status(400).send(error)
        }

})
//======================================================================== 

//======================================================================== 
//  Ruta para vaciar el carrito de un usuario registrado - DELETE
//======================================================================== 

server.delete('/users/:idUser/cart', async (req,res,next) => {

    const { idUser } = req.params
    
    try{

    const usuario = await User.findOne({ // Devuelve el carrito abierto del usuario solicitado
        where: {
            id: idUser,
        },
        include: { model: Order, where: {status: 'On Cart'} }
    })
    if (!usuario) return res.status(400).send('<h1>Usuario no encontrado o sin carrito con estado abierto<h1/>')
    usuario.destroy();  // destruye la orden con estatus On Cart... ver si es lo mejor o capaz usar un set 

    await res.json('Carrito eliminado con éxito')
        } catch (error) {
            return res.status(400).send(error.name)
        }

})
//======================================================================== 

module.exports = server;