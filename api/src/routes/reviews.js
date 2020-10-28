const server = require('express').Router();
const { Product , Reviews } = require('../db.js');
const auths = require('./auth');

// MIDDLEWARES //
// auths[1]()  <<== Esto permite el ingreso a usuarios con role: Admin o Responsable
// auths[2]() <<== Esto permite el ingreso a cualquier usuario registrado, pero no a guests

// ========================================================================
//    Get para todas las reviews 
// ========================================================================
server.get('/reviews/', (req, res, next) => {
	Reviews.findAll({
		order: ['id'],
	})
	.then(reviews => {
		if (!reviews) {
			return res.send('<h1>No hay reviews cargadas</h1>')
		}
		res.json(reviews);
		})
		.catch(err => {
			console.log(err);
			return res.status(404).end()
		});
});

// ========================================================================
//    Get reviews por Id
// ========================================================================
server.get('/reviews/:id', (req, res, next) => {
	const { id } = req.params;
	Reviews.findOne({
		where: { id},
	})
	.then(reviews => {
		if (!reviews) {
			return res.send('<h1>No hay reviews cargadas</h1>')
		}
		res.json(reviews);
		})
		.catch(err => {
			console.log(err);
			return res.status(404).end()
		});
});

  
// ========================================================================
//      Get todas las reviews de cada producto
// ========================================================================

server.get('/product/:id/reviews', (req, res, next) => {
	Reviews.findAll({
		where: { productId: req.params.id},
		include: [{ model: Product, attributes:['id','name']  }]
	})
    .then(reviews => {
		if (reviews.length==0) {
			return res.send('<h1>No hay reviews cargadas</h1>')
        }
        res.status(200).json(reviews);
    })
});

//==========================================================
//	Ruta para agregar nueva reviews a un producto específico
//==========================================================

server.post('/product/:idProducto/reviews/add',auths[2](), (req, res, next) => {
	const { idProducto } = req.params;
	const { usuarioId, title, description, value } = req.body;
	
	Reviews.create({
		usuarioId,
		title,
		description,
		value,
		productId: idProducto
	})
	.then(response => {
		if (!response) {
			return res.status(404).end()
		}
		res.status(200)
	}).catch(err => {
		console.log(err)
		return res.status(404).end()
 	})
 	res.end()
})

//===========================================================
//	 Ruta para eliminar reviews por su id
//===========================================================

server.delete('/reviews/:id',auths[1], (req, res, next) => {
	Reviews.destroy({
		where: { id: req.params.id }
	}).then(deleted=> {
		res.sendStatus(200);
	}).catch(error => {
		return res.end()
	});
});

//===========================================================
//	 Ruta para modificar reviews
//===========================================================

server.put('/reviews/:id',auths[2](), (req, res, next) => {
	const {title,description, value} = req.body
	Reviews.update(req.body, {
		where: { id: req.params.id }
	}).then(result => {
		console.log(result)
		res.send(result).end()
	})

})

// ========================================================================
//      Get todas las reviews de cada usuario  (NO ESTA EN USO)
// ========================================================================

// server.get('/user/:id/reviews', (req, res, next) => {
// 	Reviews.findAll({
// 		where: {userId: req.params.id}
// 	})
//     .then(reviews => {
// 		if (!reviews) {
// 			return res.sendStatus(404).send('<h1>No hay reviews cargadas</h1>')
//         }
//         res.status(200).json(reviews);
//     })
// });
module.exports = server