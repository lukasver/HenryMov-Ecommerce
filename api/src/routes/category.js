const server = require('express').Router();
const { Category} = require('../db.js');

//==============================================
//	Ruta para  Traer las Catgorias.
//==============================================
server.get('/category', (req, res, next) => {	
	Category.findAll()
		.then(category => {
			res.json(category);
		})
		.catch(err => {
			console.log(err);
			next()
		});
});

module.exports = server;
