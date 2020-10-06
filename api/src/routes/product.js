const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
//========================================
		//Falta invocar next si hay error
//========================================		
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
		res.status(404).send(<h1>error...product not found</h1>)
	})
})
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
