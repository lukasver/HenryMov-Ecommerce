const server = require('express').Router();
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
// const { createToken, authenticateToken, isAdmin } = require ('./auth/authMiddlewares.js')
// const { userSignUp, userLogin, getCookies, clearCookies } = require('./auth/index.js');


// server.post('/login', userLogin)
// server.post('/signup', userSignUp)

// server.get('/setcookies', getCookies)
// server.get('/clearcookies', clearCookies)




//==============================================
//	Ruta para traer todods los usuarios.
//==============================================
server.get('/user', /*[authenticateToken, isAdmin],*/ (req, res, next) => {
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
server.get('/user/:id',/*[authenticateToken, isAdmin] ,*/ (req, res, next) => {
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
    const { name, lastname, email, address, phone, password, birthdate } = req.body;

    if(!name) {
        return res.status(400).send("Faltan datos");
    }
    console.log(req.body)
    User.create({
        name,
        lastname,
        email,
        address,
        phone,
        password,
        birthdate
    }).then(createdUser => {
        const token = createToken(createdUser.id)
        res.cookie('jwt', token).send(createdUser); // solo manipulable por http y dura 1 dia

    }).catch(err => {
            res.status(400).json(err.errors[0].message);
            next()
        });
});

//===============================================
//     Ruta para modificar usuario.
//===============================================
server.put('/user/:id'/*,[authenticateToken, isAdmin]*/, (req, res, next) => {
    const { id } = req.params;
    const { name, lastname, email, address, phone, password, birthdate } = req.body;
    User.update({
        name,
        lastName,
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
server.delete('/user/:id'/*,[authenticateToken, isAdmin]*/, (req, res, next) => {
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

//===================================================
//  Ruta para encontrar usuario por email
//===================================================
server.get('/users', (req, res) => {
    const { email } = req.query;
    User.findOne({
        where: {
            email
        }
    }).then(user => {
        if(!user){
            return res.status(404).send('Usuario no encontrado')
        }
        console.log(user.id)
        return res.status(200).json(user.id);
    }).catch(err => {
        res.status(400).send(err)
    })
})

//===================================================
//  Ruta para encontrar resetear la contraseña
//===================================================
server.post('/users/:id/passwordReset', (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    User.findOne({
        where: {
            id: id
        }
    })
    .then(async result => {
        if(!result){
            return res.status(404).send('Usuario no encontrado')
        }
        console.log('password before', result.password)
        result.password = await bcrypt.hash(password, 9)
        console.log('password after', result.password)
        return res.status(200).send('Contraseña cambiada con exito')
    }).catch(err => {
        return res.status(400).send(err)
    })
})

module.exports = server;