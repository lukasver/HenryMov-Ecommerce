const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/products', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.json(products);
		})
		.catch(err => {
			console.log(err);
			next()
		});	
});

server.get('/product/:id', (req, res, next)=>{
//=============================================
//  Obtener por producto por id (unico) (fijarse si funciona sin 'id:id')
//=============================================
	const { id } = req.params;
	Product.findOne({
		where:{
			id
		}
	})
	.then(product => {
		res.status(200).json(product);
	})
	.catch(error =>{
		res.status(404).send('<h1>error...product not found</h1>')
	})
})

//==============================================
//	Busca un producta por nombre o descripcion
//============================================== 
server.get('/search', (req, res, next) => {
	const { product } = req.query;
	Product.findAll({
		where: {
			$or: [
			{
				name: { 
					$iLike: '%' + product + '%'}
			},
			{
				description: {
					$iLike: '%' + product + '%'
				}
			}]
		}
	})
		.then(product => {
			res.json(product)
		})
		.catch(error => {
			res.status(404).send('Producto no encontrado')
		});
});

// Ruta para crear/agregar producto.
server.post('/products', (req, res, next) => {
	const {name, description, price, availability, stock, quantity, image, categories} = req.body;
	if(!name || !description || !price || !availability || !stock || !image) {
    return res.sendStatus(400);
  }
  Product.create(req.body).then(createdProduct => {
  		createdProduct.setCategories(categories);
  	}).then(() => {
  		res.status(201).send(req.body);
  	});
});

// Ruta para eliminar un producto.
server.delete('/products/:id', (req, res, next) => {
  Product.destroy({
  	where: {id: req.params.id}
  }).then(deletedProduct => {
  	res.sendStatus(200);
  });
});

module.exports = server;
