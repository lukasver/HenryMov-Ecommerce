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

server.get('/reviews/:idProduct/reviews', async (req,res,next) => {
    const { idProduct } = req.params

    try{
    const product = await Product.findOne({ // Devuelve el carrito abierto del usuario solicitado
        where: {
            id: idProduct,
        },
        include: { model: Reviews}
    })

   // if (!product) return res.status(400).send('<h1>Producto no encontrado o sin carrito con estado abierto<h1/>')
    await res.json(product)
        } catch (error) {
            return res.status(400).send(error)
        }

})


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
