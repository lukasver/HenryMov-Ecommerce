const server = require('express').Router();
const { Category } = require('../db.js');

//==============================================
//	Ruta para crear/agregar una categoría.
//============================================== 
server.post('/products/category', (req, res, next) => {
	if(!req.body.name) {
    return res.sendStatus(400);
  }
  Category.create(req.body).then(createdCategory => {
		res.status(201).send(createdCategory);
	});
});

module.exports = server;
