const server = require('express').Router();
const { Category } = require('../db.js');

//==============================================
//	Ruta para traer las categorias.
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

//==============================================
//	Ruta para crear/agregar una categoría.
//============================================== 
server.post('/category', (req, res, next) => {
	if(!req.body.name) {
    return res.sendStatus(400);
  }
  Category.create(req.body)
    .then(createdCategory => {
		res.status(201).send(createdCategory);
	}).catch(err => {
    res.sendStatus(400);
  })
  ;
});

//==============================================
//	Ruta para modificar una categoría.
//============================================== 
server.put('/category/:id', (req, res, next) => {

	if(!req.body.name) {
    return res.sendStatus(400);
  }
  Category.update(req.body, {
  	where: {id: req.params.id}
  }).then(result => {
  	if (result[0] === 0) {
  		return res.status(404).send('ID no encontrado');
  	}
  	res.status(200).send('Categoria modificada');
  }).catch(err => {res.status(400).send('ERROR - es posible que la categoría que este creando ya exista')})
});

//==============================================
//	Ruta para eliminar una categoría.
//============================================== 
server.delete('/category/:id', (req, res, next) => {
  Category.destroy({
  	where: {id: req.params.id}
  }).then(deletedCategory => {
     if (deletedCategory === 0) {
        return res.status(404).send('ID no encontrado');
      }
  	 res.status(200).send('Categoria borrada con exito');
  }).catch(err =>{
      console.log(err);
      res.status(400).end()
    });
});

module.exports = server;
