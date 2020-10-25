const server = require('express').Router();

const { Product, User, Order, Orderline } = require('../db.js');
const { Sequelize, QueryTypes } = require('sequelize');
const auths = require('./auth');

// MIDDLEWARES //
// auths[1]()  <<== Esto permite el ingreso a usuarios con role: Admin o Responsable
// auths[2]() <<== Esto permite el ingreso a cualquier usuario registrado, pero no a guests

//==============================================
//	Ruta para agregar item al carrito
//==============================================
server.post('/users/:idUser/cart', async (req, res, next) => {
  const { idUser } = req.params;
	const { amount, quantity, productId } = req.body;

	if(!amount || !quantity || !productId) {
    return res.sendStatus(400);
  }

try {
  const [orden, created] = await Order.findOrCreate({ // true == crea -- false == encuentra
    where: {userId: idUser, status: 'On Cart'}, 
    include: {model: Product, attributes: ['id']}
  })

  await orden.addProducts(productId, { through: { quantity: quantity, amount: amount }})

  return res.status(200).send('Producto agregado/modificado satisfactoriamente')
} catch (error) {
  console.log(error)
  new Error(error)
}

});

//=======================================================
//	Ruta para retornar todas las ordenes de los usuarios
//=======================================================
server.get('/users/:id/orders', (req, res, next) => {
	Order.findAll({
		where: {userId: req.params.id}
	}).then(orders => {
		if (!orders) return res.sendStatus(404);
		return res.status(200).json(orders);
	})
    .catch(error => {
        return res.send(error);
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

//==============================================
//  Ruta para retornar una orden en particular
//==============================================
server.get('/orders/:id', (req, res, next) => {

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
      { model: Product, attributes: ['id','name','availability','stock'], through: {
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

server.get('/users/orders', (req, res, next) => {

    const { order } = req.query
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
//  Ruta para editar cantidad del carrito - PUT
//======================================================================== 

server.put('/users/:idUser/cart', async (req,res,next) => {

    // FRONT DEBE PASAR UN [] CON {} QUE CONTENGAN: ID DE PRODUCTO A UPDATEAR, CANTIDAD Y PRECIO UNITARIO (OPCIONAL)
    const { idUser } = req.params

    // ARRAY QUE SE ENVIARA COMO RESPUESTA AL CLIENTE... CONTENDRÁ SÓLO DE LOS PRODUCTOS QUE SE MODIFICARON
    let respuesta = [];

    // POR CADA OBJETO QUE SE PASE (POR CADA LINEA DE ORDEN DEL CARRITO) SE HARA UN UPDT EN LA BD ...
    await req.body.forEach( async (lineaproducto) => {

    const { productId, quantity, amount } = lineaproducto;


    try{
    // SI EL productId NO EXISTE O NO HAY SUFICIENTE STOCK - SE ENVÍA AVISO EN EL JSON DE RTA...
    let producto = await Product.findByPk(productId)

    if (!producto && req.body.length == 1) return res.send(`El producto ${productId} no existe en la base de datos...`);
    !producto ? respuesta.push([`${productId}`,`El Id de producto: ${productId} - No encontrado en la base de datos `]) : null;
    if (producto && producto.get('stock') < quantity && req.body.length == 1) {
       respuesta.push([`${productId}`,`El Id de producto: ${productId} - No cuenta con stock suficiente `]);
       return res.send(respuesta)
    }
    if (producto && producto.get('stock') < quantity && req.body.length > 1) {
      respuesta.push([]);
      return
    }


    // DEVUELVE EL CARRITO ABIERTO DEL USUARIO SOLICITADO - SI NO ENCUENTRA USUARIO, RECHAZA...
    let usuario = await User.findOne({ 
        where: {
            id: idUser,
        },
        include: {model: Order, where: {status: 'On Cart'}, attributes: ['id','status']}
    })
    if (!usuario ) return res.status(400).send('<h1>Usuario no encontrado o sin carrito con estado abierto<h1/>')

    // DEVUELVE LAS ORDERLINE QUE CORRESPONDAN A LA ORDENID DEL USUARIO - SI NO ENCUENTRA ORDERLINES...
    // ... DEVUELVE U
    let carrito = await Orderline.findAll({
        where: {orderId: usuario.orders[0].id, productId: productId}
    })
    if (carrito.length === 0 && req.body.length === 1) res.send('no hay orderline')
    if (carrito.length === 0 ) {
      respuesta.push(carrito)
      return
    }

    // UPDATEA CANTIDAD EN BD SI EL ID DEL PRODUCTO RECIBIDO X BODY MATCHEA CON ALGUNO EN LA ORDERLINE
    carrito.forEach(orderline => {  
        if (orderline.get('productId') == productId) {
            orderline.setDataValue('quantity', quantity)
            if(amount) orderline.setDataValue('amount', amount)
            orderline.save();  // necesario para guardar los cambios en la DB
        }
            return;
    })

    if (lineaproducto)  respuesta.push(lineaproducto)

    if(req.body.length === respuesta.length) return res.json(respuesta)

      } catch (error) {
      return res.status(400).send(error)
    }
  })

  // await res.send('no tenia q llegar aca...')

  return
  next();

})


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
//  Ruta para tener las ordenes y productos comprados x un cliente
//======================================================================== 

server.get('/users/orders/:userId', auths[2](), (req, res, next) => {
  console.log(auths)

  const { userId } = req.params
  console.log('paso el const')
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
    console.log('Llega aca!')
    res.sendStatus(404)})
  })
  

module.exports = server;