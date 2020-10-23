const server = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { createToken, authenticateToken, isAdmin } = require ('./auth/authMiddlewares.js')

server.post('/login', passport.authenticate('local'), (req,res,next) => {

  console.log('logeado?')
  console.log(req.header)

    res.status(200).send('llegue')


});

 // passport.authenticate('local', { 
 //  successRedirect: '/',
 //  failureRedirect: '/login',
 //  failureFlash: true })
 //  console.log(req.email)
 //  console.log(req.password)

    // const { email, password} = req.body

    // const usuario = await User.findOne({where: {
    // 	email,
    // }})
    // if (!usuario) res.status(400).send('Usuario no existente')

//     // if (!bcrypt.compareSync(password, usuario.password)) res.status(401).send('Contraseña incorrecta')

//     console.log('paseeeee')
//    	// const { TOKEN_SECRET } = process.env
//    	// const successToken = jwt.sign(email, TOKEN_SECRET)
//    	// res.cookie('jwt', successToken)
//     // res.json({accessToken: successToken})
//     res.send('terminado')

// })

module.exports = server;
