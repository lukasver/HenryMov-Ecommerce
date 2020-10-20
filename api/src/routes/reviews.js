const server = require('express').Router();
const { Product , Reviews } = require('../db.js');


// ========================================================================
//    Get para una reviews en particular
// ========================================================================
server.get('/reviews/:id', (req, res, next) => {

    Reviews.findByPk(req.params.id).then(reviews => {
      if (!reviews) return res.sendStatus(404);
      res.status(200).send(reviews);
    })
  });
  
// ========================================================================
//      Get todas las reviews de cada producto
// ========================================================================

server.get('/product/:id/reviews', (req, res, next) => {
	Reviews.findAll({
		where: {prodId: req.params.id}
	})
    .then(reviews => {
		if (!reviews) {
			return res.sendStatus(404).send('<h1>No hay reviews cargadas</h1>')
        }
        res.status(200).json(reviews);
    })
});

// ========================================================================
//      Get todas las reviews de cada usuario
// ========================================================================

server.get('/user/:id/reviews', (req, res, next) => {
	Reviews.findAll({
		where: {userId: req.params.id}
	})
    .then(reviews => {
		if (!reviews) {
			return res.sendStatus(404).send('<h1>No hay reviews cargadas</h1>')
        }
        res.status(200).json(reviews);
    })
});


//==========================================================
//	Ruta para agregar nueva categoría a un producto específico
//==========================================================

server.post('/products/:idProducto/reviews/add', (req, res, next) => {
	const { idProducto } = req.params;
	const { reviewsId } = req.body;

	if (typeof categoryId !== "number") {
		return res.status(401).send('Categoria debe ser un valor numerico');
	}
	Product.findOne({
		where: {
			id: idProducto
		},
		include: [{ model: Reviews }]
	}).then(response => {
		if (!response) {
			return res.status(404).end()
		}
		let prod = response;
		prod.addReviews([reviewsId])
		res.status(200)
	}).catch(err => {
		console.log(err)
		return res.status(404).end()
 	})
 	res.end()
 })
