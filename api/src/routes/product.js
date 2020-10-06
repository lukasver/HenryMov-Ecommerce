const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

//------- Searchs any product by name or description--------// 
server.get('/search', (req, res, next) => {
	const { product } = req.query;
	Product.findAll({
		where: {
			$or: [{
				name: {
					$iLike: '%' + product + '%'
				}
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

module.exports = server;
