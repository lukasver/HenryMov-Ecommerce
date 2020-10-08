const server = require('express').Router();
const { Product } = require('../db.js');
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

server.get('/product/:id', (req, res, next) => {
	//=============================================
	//  Obtener por producto por id (unico) (fijarse si funciona sin 'id:id')
	//=============================================
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

module.exports = server;
