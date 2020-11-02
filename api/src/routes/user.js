const server = require('express').Router();
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auths = require('./auth');
const passport = require('passport');
const mailCreator = require('./mailgun/setUp.js');
const cryptoString = require('crypto-random-string');

// MIDDLEWARES //
// auths[1]  <<== Esto permite el ingreso a usuarios con role: Admin o Responsable // IMP *NO* INVOCAR AL IMPLEMENTAR!!
// auths[2]() <<== Esto permite el ingreso a cualquier usuario registrado, pero no a guests // IMP INVOCAR AL IMPLEMENTAR!!

//==============================================
//	Ruta para traer todods los usuarios.
//==============================================
server.get('/user', auths[1], (req, res, next) => {

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

server.get('/user/:id', auths[1], (req, res, next) => {
    const { id } = req.params;
    User.findByPk(id)
        .then(result => {
            if (!result) {
                return res.status(404).send('Usuario no encontrado')
            }
            result.password = null
            res.status(200).json(result)
        })
        .catch(err => {
            return res.status(400).send(err)
        })
})

//==============================================
//	Ruta para crear/agregar un usuario.
//============================================== 
server.post('/user', async (req, res, next) => {

    const { name, lastname, email, address, phone, password, birthdate } = req.body;
    const hashedPassword = await bcrypt.hash(password, 9)
    if (!name) {
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
server.put('/user/:id', auths[2](), (req, res, next) => {
    
    const { id } = req.params;

    const { name, lastname, email, address, phone, birthdate, status } = req.body;

    User.update({
        name,
        lastname,
        email,
        address,
        phone,
        birthdate,
        status,
    }, {
        where: {
            id: id
        }
    }).then(modified => {
        console.log(modified)
        if (modified[0] === 0) {
            return res.status(404).send('Usuario no encontrado')
        }
        res.status(200).send('Usuario modificado con exito')
    })
})

//===============================================
//     Ruta para modificar imagen de usuario.
//===============================================

server.post('/user/:id/image', auths[2](), (req, res, next) => {

    const { id } = req.params;
    let { image } = req.body;

    if (image == undefined || image == '') image = `http://localhost:3001/uploads/${req.file.originalname}`

    User.findOne({
        where: { id: id }
    }).then(usuario => {
        usuario.image = image
        return usuario.save()
    }).then(newUsuario => res.status(200).send('Usuario actualizado'))
        .catch(error => res.status(404).send('Usuario no encontrado'))

})




//==============================================
//  Ruta para eliminar usuario
//==============================================
server.delete('/user/:id', auths[1], (req, res, next) => {

    
    // if(!req.isAuthenticated()) return res.sendStatus(401)
    // if(!req.user.role === 'Cliente') return res.sendStatus(401)

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
//  Ruta para encontrar usuario por token
//===================================================
server.get('/users', (req, res) => {
    const { token } = req.query;
    User.findOne({
        where: {
            passwordResetToken: token
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send('Usuario no encontrado')
        }

        return res.status(200).json(user.id);
    }).catch(err => {
        res.status(400).send(err)
    })
})

//===================================================
//  Ruta para enviar email de recuperacion de clave
//===================================================
server.post('/users/mailValidator/reset', async (req, res) => {
    const { email } = req.body;
        
        console.log(email)
    try {
        const user = await User.findOne({ where:{ email } })

        const token = await cryptoString({ length: 6, type: 'numeric' });
      
        console.log(token)
        if (!user) {
            return res.status(404).send('Usuario no encontrado')
        }
        user.passwordResetToken = token;
        user.save();
        console.log(user)

        const mailReset = 
            `Este menesaje se envio por pedido de un resteto de clave: 
            Haz click en el siguiente link http://localhost:3000/verify
            He introduce el token de seguridad: ${token}
            Si no has sido tu, ponte en contacto con atencion al cliente`
        
            await mailCreator(user.email, "mailReset", mailReset);
    
            return res.status(200).send('Email enviado con exito')

        }

    catch(err){
        return res.status(500).send(err)
    }

})
//===================================================
//  Ruta para resetear la contraseña
//===================================================
server.post('/users/:id/passwordReset', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    
    if (password.length < 8) return res.send(400).send('Password no cumple requisitos')

    try {
        const usuario = await User.findOne({ where: { id } })

        if (!usuario) {
            return res.sendStatus(404)
        }
        usuario.status = "Activo";
        usuario.save();
        const hashedPassword = await bcrypt.hash(password, 9)
        await usuario.update({ password: hashedPassword })
        return res.sendStatus(200)

    } catch (error) {

        return res.sendStatus(401)
    }

})

//===============================================
//  Ruta para restrignir el logeo a un usuario que no recuerda su contraseña
//===============================================
server.post('/users/bloqued', (req, res) => {

    const { email } = req.body;

    User.findOne({
        where: {
            email
        }
    }).then(modified => {
        if (!modified) {
            return res.status(404).send('Usuario no encontrado')
        }
        modified.status = "Bloqueado";
        modified.save();

        res.status(200).send('Usuario bloqueado')
    })
})

//======================================
// Ruta para devolver status de usuario
//======================================
server.post('/users/status', (req, res) => {
    const { email } = req.body;
    console.log('email:', email)
    User.findOne({
        where: {
            email
        }
    }).then(user => {

     
        if(!user){
           return res.status(404).send('Usuario no encontrado')

        }
        console.log(user.status)
        return res.status(200).send(user.status)
    })
    // .catch(err => {
    //     return res.status(400).send(err)
    // })
})

server.post('/users/mailValidation', (req, res) =>{
    const {to, type, data} = req.body
    if (!to || !data) res.send(`Error, datos erroneos`)
    mailCreator(to, type, data)
    // console.log(`
    // Mail sent...
    // from: henrymov.g05@gmail.com
    // to: ${to}
    // type: ${type}
    // data: ${data}
    // `) 
    res.send("mail sent")
})

//================================================
// Ruta para verificar que un usuario existe
//================================================
server.get('/users/:email', async (req, res) => {
    const { email } = req.params;
    
    try {
        const user = await User.findOne({ where: { email } })
        if(!user){
            
            return res.send("404");
        }
        return res.status(200).send('Usuario encontrado');

    } catch (error) {
       
        return res.sendStatus(404) 
    }
    
        
   
});

module.exports = server;