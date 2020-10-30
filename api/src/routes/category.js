const server = require('express').Router();
const { Category } = require('../db.js');
const auths = require('./auth');

// MIDDLEWARES //
// auths[1]  <<== Esto permite el ingreso a usuarios con role: Admin o Responsable // IMP *NO* INVOCAR AL IMPLEMENTAR!!
// auths[2]() <<== Esto permite el ingreso a cualquier usuario registrado, pero no a guests // IMP INVOCAR AL IMPLEMENTAR!!


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
server.post('/category', auths[1], (req, res, next) => {
	if(!req.body.name) {
    return res.sendStatus(400);
  }
  Category.create(req.body)
    .then(createdCategory => {
		res.status(201).send(createdCategory);
	}).catch(err => {
    res.sendStatus(400);
  });
});

//==============================================
//	Obtener Categoria por ID (unico)
//============================================== 
server.get('/category/:id', (req, res, next) => {
  const { id } = req.params;
  Category.findByPk(id)
    .then(result => {
  	if (!result) {
  		return res.status(404).send('ID no encontrado');
  	}
  	res.status(200).json(result);
  }).catch(err => {
    res.status(400).send('<h1>error...category not found</h1>')})
});

//==============================================
//	Ruta para modificar una categoría.
//============================================== 
server.put('/category/:id', auths[1], (req, res, next) => {

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
server.delete('/category/:id', auths[1], (req, res, next) => {
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
