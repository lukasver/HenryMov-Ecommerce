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

//==============================================
//	Ruta para modificar una categoría.
//============================================== 
server.put('/products/category/:id', (req, res, next) => {
	if(!req.body.name) {
    return res.sendStatus(400);
  }
  Category.update(req.body, {
  	where: {id: req.params.id}
  }).then(result => {
  	if (result.length < 1) {
  		return res.sendStatus(404);
  	}
  	res.sendStatus(200);
  });
});

//==============================================
//	Ruta para eliminar una categoría.
//============================================== 
server.delete('/products/category/:id', (req, res, next) => {
  Category.destroy({
  	where: {id: req.params.id}
  }).then(deletedCategory => {
  	res.sendStatus(200);
  });
});

module.exports = server;
