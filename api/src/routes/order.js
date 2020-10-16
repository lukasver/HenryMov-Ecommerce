const server = require('express').Router();
const { Order,User } = require('../db.js');
// ========================================================================
// ============Get de todas las orders=====================================
// ========================================================================
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

module.exports = server;