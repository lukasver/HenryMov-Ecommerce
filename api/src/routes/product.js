const server = require('express').Router();
const { Product} = require('../db.js');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

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


//=============================================
//  Obtener por producto por id (unico) (fijarse si funciona sin 'id:id')
//=============================================
server.get('/product/:id', (req, res, next) => {	
	const { id } = req.params;
	Product.findOne({
		where: {
			id
		}
	})
		.then(product => {
			res.status(200).json(product);
		})
		.catch(error => {
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
			[Op.or]: [
			{
				name: { 
					[Op.iLike]: '%' + product + '%'}
			},
			{
				description: {
					[Op.iLike]: '%' + product + '%'
				}
			}]
		}
	})
		.then(product => {
			console.log('producto')
			res.json(product)
		})
		.catch(error => {
			res.status(404).send('Producto no encontrado')
		});
});

//==============================================
//	Ruta para crear/agregar un producto.
//============================================== 
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

//==============================================
//	Ruta para modificar un producto.
//============================================== 
server.put('/products/:id', (req, res, next) => {
	const {name, description, price, availability, stock, quantity, image, categories} = req.body;
	if(!name || !description || !price || !availability || !stock || !image) {
    return res.sendStatus(400);
  }
  Product.update(req.body, {
  	where: {id: req.params.id}
  }).then(result => {
  	if (result.length < 1) {
  		return res.sendStatus(404);
  	}
  	return Product.findByPk(req.params.id)
  }).then(modifiedProduct => {
  	modifiedProduct.setCategories(categories);
  	res.sendStatus(200);
  });
});

//==============================================
//	Ruta para eliminar un producto.
//============================================== 
server.delete('/products/:id', (req, res, next) => {
  Product.destroy({
  	where: {id: req.params.id}
  }).then(deletedProduct => {
  	res.sendStatus(200);
  });
});



module.exports = server;
