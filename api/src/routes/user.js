const server = require('express').Router();
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auths = require('./auth');
const passport = require('passport');

// MIDDLEWARES //
// auths[1]()  <<== Esto permite el ingreso a usuarios con role: Admin o Responsable
// auths[2]() <<== Esto permite el ingreso a cualquier usuario registrado, pero no a guests

//==============================================
//	Ruta para traer todods los usuarios.
//==============================================
server.get('/user', auths[1],(req, res, next) => {

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

server.get('/user/:id', auths[1],(req, res, next) => {
    const { id } = req.params;
    User.findByPk(id)
        .then(result => {
            if (!result) {
                return res.status(404).send('Usuario no encontrado')
            }
            result.password=null
            res.status(200).json(result)
        })
        .catch(err => {
            return res.status(400).send(err)
        })
})

//==============================================
//	Ruta para crear/agregar un usuario.
//============================================== 
server.post('/user' ,async (req, res, next) => {

    const { name, lastname, email, address, phone, password, birthdate } = req.body;
    const hashedPassword = await bcrypt.hash(password,9)
    if(!name) {
        return res.status(400).send("Faltan datos");
    }
    User.create({
        name,
        lastname,
        email,
        address,
        phone,
        password: hashedPassword,
        birthdate
    }).then(createdUser => {
        return res.status(200).json(createdUser)
    }).catch(err => {
            return res.status(400).json(err.errors[0].message);
            next()
        });
});


//===============================================
//     Ruta para modificar usuario.
//===============================================
server.put('/user/:id', (req, res, next) => {


    // if (req.user.role !== 'Admin' || req.user.id !== req.params.id) return res.send('<h1>Unauthorized</h1>')
    const { id } = req.params;

    console.log(id)
    console.log(req.body)

    const { name, lastname, email, address, phone, birthdate} = req.body;

    User.update({
        name,
        lastname,
        email,
        address,
        phone,
        birthdate,
    }, {
        where: {
            id: id
        }
    }).then(modified => {
        console.log(modified)
        if (modified[0] === 0) {
            console.log('llegue aca??')
            return res.status(404).send('Usuario no encontrado')
        }
        res.status(200).send('Usuario modificado con exito')
    })
})

//===============================================
//     Ruta para modificar imagen de usuario.
//===============================================

server.post('/user/:id/image', (req, res, next) => {
    const { id } = req.params;
    let { image } = req.body;

    if (image == undefined || image == '') image = `http://localhost:3001/uploads/${req.file.originalname}`

    User.findOne({
        where: { id: id }
    }).then(usuario => {
        console.log(usuario)
        usuario.image = image
        return usuario.save()
    }).then(newUsuario => res.status(200).send('Usuario actualizado'))
        .catch(error => res.status(404).send('Usuario no encontrado'))

})




//==============================================
//  Ruta para eliminar usuario
//==============================================
server.delete('/user/:id'/*,[authenticateToken, auths]*/, (req, res, next) => {
    const { id } = req.params;
    User.destroy({
        where: {
            id: id
        }
    }).then(deleted => {
        if (deleted === 0) {
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
        if (!user) {
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
server.post('/users/:id/passwordReset', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (password.length < 8) return res.send(400).send('Password no cumple requisitos')
   
    try {
        const usuario = await User.findOne({ where: {id}})
        const hashedPassword = await bcrypt.hash(password, 9)

        await usuario.update({password: hashedPassword})

        if (!usuario) return res.sendStatus(404)

        return res.sendStatus(200)

    } catch (error) {

        return res.sendStatus(401)
    }

    
})





module.exports = server;