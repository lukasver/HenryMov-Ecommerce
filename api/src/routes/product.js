const server = require('express').Router();

const { Product, Category, productCategory } = require('../db.js');

const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

//==============================================
//	Ruta para devolver todos los productos.
//============================================== 

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
//  Obtener un producto por id (unico) (fijarse si funciona sin 'id:id')
//=============================================
server.get('/products/:id', (req, res, next) => {	
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

//==========================================================
//	Ruta para agregar nueva categoría a un producto
//==========================================================

server.post('/products/:idProducto/category/add', (req,res,next) => {

	const { idProducto } = req.params;
	const { categoryId } = req.body;

	if (typeof categoryId !== "number") {
		return res.status(401).send('Categoria debe ser un valor numerico');
	}

	Product.findOne({
		where: {
			id: idProducto 
		},
		include: [{ model: Category }]
	}).then(response => {
		let prod = response;
		prod.addCategories([categoryId])
		res.status(200)
	}).catch(err => {
		console.log(err)
		return res.status(404).end()
	})
	res.end()
})


//==============================================
//	Ruta para eliminar categoría a un producto
//==============================================

server.delete('/products/:idProducto/category/delete', (req,res,next) => {

	const { idProducto } = req.params;
	const { categoryId } = req.body;

	if (typeof categoryId !== "number") {
		return res.status(401).send('Categoria debe ser un valor numerico');
	}

	Product.findOne({
		where: {id: idProducto},
		include: [{model: Category, where: {id: categoryId}}]
		// where: {
		// 	{id: idProducto} 
		// },
		// include: [{ model: Category }]
	}).then(response => {
		let prod = response;
		console.log(response)
		prod.destroy(); // muy drastico 
		res.status(200)
	}).catch(err => {
		console.log(err)
		return res.status(404).end()
	})
	res.end()
})

//==============================================
//	Busca un producto por nombre o descripcion.
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
			res.json(product)
		})
		.catch(error => {
			res.status(404).send('Producto no encontrado')
		});
});

//=========================================================
//	Ruta para devolver todos los productos de X categoria.
//============================================== ==========
server.get('/products/category/:categoryName', (req, res, next) => {
	Product.findAll({
		include: {
			model: Category,
			where: {name: req.params.categoryName}
		}
	}).then(result => {
		res.status(200).send(result);
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
