const server = require('express').Router();
const { User } = require('../db.js');

server.post('/auth/promote/:id', (req, res, next) => {
  User.update({role: 'Admin'}, {
  	where: {id: req.params.id}
  }).then(result => {
  	console.log('RESULT:', result);
  	if (result[0] === 0) {
  		return res.status(404).send('ID no encontrado');
  	}
  	res.status(200).send('Usuario promovido a Admin');
  }).catch(err => {res.status(400).send(err)})
});

module.exports = server;