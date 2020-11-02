const server = require('express').Router();

const { Product, User, Order, Orderline } = require('../db.js');
const { Sequelize, QueryTypes } = require('sequelize');
const auths = require('./auth');
const mailCreator = require('./mailgun/setUp.js')

// MIDDLEWARES //
// auths[1]  <<== Esto permite el ingreso a usuarios con role: Admin o Responsable
// auths[2]() <<== Esto permite el ingreso a cualquier usuario registrado, pero no a guests

//==============================================
//	Ruta para agregar orderlines a carrito 'On Cart' o crearlo si no existe
//==============================================
server.post('/users/:idUser/cart', async (req, res, next) => {
  const { idUser } = req.params;


try {
  let sinStock = []
  let orden = await Order.findOne({where: {userId: idUser, status: 'On Cart'}})
  if (orden) await orden.destroy()
  orden = await Order.create({
    userId: idUser
  })

  // Itera sobre cada {} de orderlines enviado del carrito del front del usuario
    await req.body.forEach(async (orderline) => {
    const { productId, quantity, amount } = orderline;
    //asocia la orderline a la orden 'On Cart'
    const producto = await Product.findOne({where: {id: productId}})

    // if ((producto.stock - quantity) < 0) {
    //   sinStock.push(orderline)
    //   return 
    // }

    await orden.addProducts(productId, { through: { quantity: quantity, amount: amount }})

    return sinStock
  })


  await res.status(200).json([orden, sinStock])


} catch (error) {
  console.log(error)
  new Error(error)
}

next()
});

//==============================================
//  Ruta CONFIRMAR un carrito cuando se paga, resta el stock de los productos
//==============================================
server.post('/users/:idUser/cart/paid', async (req, res, next) => {
  const { idUser } = req.params;
  console.log(req.body)
try {
  let orden = await Order.findOne({where: {userId: idUser, status: 'On Cart'}})
  if (orden) await orden.destroy()
  orden = await Order.create({
    userId: idUser
  })
  // const [orden, created] = await Order.findOrCreate({ // true == crea -- false == encuentra
  //   where: {userId: idUser, status: 'On Cart'}, 
  //   include: {model: Product, attributes: ['id']}
  // })
  // Itera sobre cada {} de orderlines enviado del carrito del front del usuario
  await req.body.forEach(async (orderline) => {
    const { productId, quantity, amount } = orderline;
    // busca x cada orderline que el id de producto exista, y caso que exista updatea la cantidad
    // en la BD en base a lo que compró el cliente 
    console.log('order', orderline)
    const producto = await Product.findByPk(productId)
    if (!producto) {return;
      } else {
     
      let newStock = await producto.get('stock')-quantity
      console.log('nuevo stock ', newStock)

      await Product.update({stock: newStock}, {
        where: {id: productId}
      })
    }
    //asocia la orderline a la orden 'On Cart'
    await orden.addProducts(productId, { through: { quantity: quantity, amount: amount }})
    return
  })

  await orden.update({status: 'Creada'})

  return res.status(200).send(orden)
} catch (error) {
  console.log(error)
  new Error(error)
}

});

//=======================================================
//	Ruta para retornar todas las ordenes de los usuarios
//=======================================================
server.get('/users/:id/orders'/*,auths[2]()*/, (req, res, next) => {
	Order.findAll({
		where: {userId: req.params.id}
	}).then(orders => {
		if (!orders) return res.sendStatus(404);
		return res.status(200).json(orders);
	})
    .catch(error => {
        return res.send(error);
    })
    // next() // no sacar el coment, rompe orderHistory
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

//==============================================
//  Ruta para retornar una orden en particular
//==============================================
server.get('/orders/:id'/*,auths[2]()*/, (req, res, next) => {

  Order.findByPk(req.params.id).then(order => {
    if (!order) return res.sendStatus(404);
    res.status(200).send(order);
  })
});


//=============================================
//  Ruta para retornar las orderlines de una orden particular
//==============================================
server.get('/orders/:id/cart', async (req, res, next) => {
  const { id } = req.params

      Order.findOne({
      where: {id},
      include: [
      { model: Product, attributes: ['id','name','availability','stock', 'image', 'price', 'count'], through: {
        attributes: ['amount','quantity'] // agregar 'id' si se quiere obtener el id de la orderline 
      }},
      { model: User, attributes:['id','name','lastname','email', 'address'] }],
      group: Orderline.id
    })
      
  .then(carrito => {
      res.status(200).send(carrito)})
  .catch(err => {
    console.log(err.sql)
    res.sendStatus(404)})
})



//==============================================
//  Ruta para modificar una orden
//==============================================
server.put('/orders/:id', (req, res, next) => {
  const { paymentMethod, status } = req.body;
  if(!paymentMethod || !status) {
    return res.sendStatus(400);
  }
  Order.update(req.body, {
    where: { id: req.params.id }
  }).then(result => {
    if (result[0] === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send(result);
  })
});

//==============================================
//  Ruta para traer ordenes
//==============================================

server.get('/order/admin', auths[1], (req, res, next) => {

    Order.findAll({
      include: [{model: User, attributes: ['id','email']}]
    })
    .then(orders => {
        if (!orders) {
            return res.send('<h1>No hay ordenes cargadas</h1>')
        }
        return res.json(orders);
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
//  Ruta para vaciar el carrito de un usuario registrado - DELETE
//======================================================================== 

server.delete('/users/:idUser/cart', async (req,res,next) => {
  const { idUser } = req.params
  try{
  const order = await Order.findOne({ // Devuelve el carrito abierto del usuario solicitado
      where: {
          userId: idUser,
          status: 'On Cart'
      }
  })
  if (!order) return res.status(400).send('<h1>Orden no encontrada o sin carrito con estado abierto<h1/>')
  order.destroy();  // destruye la orden con estatus On Cart... ver si es lo mejor o capaz usar un set 

  await res.json('Carrito eliminado con éxito')
      } catch (error) {
          return res.status(400).send(error.name)
      }
})


//======================================================================== 
//  Ruta para tener las ordenes y productos comprados x un cliente
//======================================================================== 

server.get('/users/orders/:userId'/*, auths[2]()*/, (req, res, next) => {
  const { userId } = req.params
  Order.findAll({
    where:{userId},
    attributes: ['id','userId','status'],
    include: { model: Product, attributes: ['id','name',]/*(where: {status: 'On Cart'}*/ }

  })
  .then(carrito => {
    console.log(carrito)
      return res.status(200).json(carrito)
    })
  .catch(err => {
    res.sendStatus(404)})
  })


//======================================================================== 
//  Ruta para modificar el estado de una orden a CANCELADA
//======================================================================== 

server.put('/orders/cancel/:orderId', async (req, res, next) => {
  const { userId, buyDate } = req.body;
  const {orderId} = req.params;

  try {
  const orderNew = await Order.update({
    status: 'Cancelada'},
    {where: {id: orderId}
  })

  const canxOL = await Orderline.findAll({
    where: {orderId: orderId}
  })

  // INCREMENTA EL STOCK DEL PRODUCTO YA QUE LAS ORDENES FUERON CANCELADAS
  await canxOL.forEach(async(productOL) => {
    await Product.increment(['stock'], { by: productOL.quantity, where: { id: productOL.productId } });
  })

  const user = await User.findOne({
    where: {
      id: userId
    }
  })
  const mailCancel = `Tu orden numero ${orderId}, con fecha de creacion de ${new Date (buyDate)} ha sido cancelada con exito.
            Lamentamos que tu compra no haya sido completada satisfactoriamente. 
            Saludos cordiales,  \n  
            Equipo de Henry-Mov`

    await mailCreator(user.email, "mailCancel", mailCancel);
    

  // AGREGAR DISPARO DE EMAIL AVISANDO CANCELACION DE ORDEN

  return res.send('Orden cancelada con éxito')
  } catch (error) {
    res.send(new Error(error))
  }

  })

//======================================================================== 
//  Ruta para modificar el estado de una orden (NO a cancelada)
//======================================================================== 

server.put('/orders/status/:orderId', async (req, res, next) => {

  const {orderId} = req.params
  const {status} = req.body

  try {
  const orderNew = await Order.update({
    status: status},
    {where: {id: orderId}
  })

  if (!orderNew[0]) return res.send('Orden no encontrada...')

  return res.send('Status de orden modificado con éxito')
  } catch (error) {
    new Error(error)
    res.status(400).send(error)
  }

  })


module.exports = server;