const server = require('express').Router();
const { User } = require('../db.js');

//==============================================
//	Ruta para traer todods los usuarios.
//==============================================
server.get('/user', (req, res, next) => {
    User.findAll()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(404).send(err);
            next()
        });
});

//=============================================
//  Ruta para encotrar usuarios por id
//=============================================
server.get('/user/:id', (req, res, next) => {
    const { id } = req.params;
    User.findByPk(id)
        .then(result => {
            if(!result){
                return res.status(404).send('Usuario no encontrado')
            }
            res.status(200).json(result)
        })
        .catch(err => {
            return res.status(400).send(err)
        })
})

//==============================================
//	Ruta para crear/agregar un usuario.
//============================================== 
server.post('/user', (req, res, next) => {
    const { name, lastname, email, address, phone, password, birthdate } = req.body
    if(!name) {
        return res.status(400).send("Faltan datos");
    }
    User.create({
        name,
        lastname,
        email,
        address,
        phone,
        password,
        birthdate
    }).then(createdUser => {
            res.status(200).send(createdUser);
    }).catch(err => {
            res.status(400).json(err.errors[0].message);
            next()
        });
});

//===============================================
//     Ruta para modificar usuario.
//===============================================
server.put('/user/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, lastname, email, address, phone, password, birthdate } = req.body
    User.update({
        name,
        lastname,
        email,
        address,
        phone,
        password,
        birthdate
    }, {
        where: {
            id: id
        }
    }).then(modified => {
        if(modified[0] === 0){
            return res.status(404).send('Usuario no encontrado')
        }
        res.status(200).send('Usuario modificado con exito')
    })
})

//==============================================
//  Ruta para eliminar usuario
//==============================================
server.delete('/user/:id', (req, res, next) => {
    const { id } = req.params;
    User.destroy({
        where: {
            id: id
        }
    }).then(deleted => {
        if(deleted === 0){
            return res.status(404).send('Usuario no encontrado');
        }
        res.status(200).send('Usuario eliminado con exito')
    })
    }
)
module.exports = server;