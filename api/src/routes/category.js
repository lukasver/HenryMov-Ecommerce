const server = require('express').Router();
const { Category } = require('../db.js');

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
