const server = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
// const { createToken, authenticateToken, isAdmin } = require ('./auth/authMiddlewares.js')

// ===========================================================================================
//                     MIDDLEWARES DE AUTENTICACIÓN Y PASSPORT CONFIG
// ===========================================================================================


const isLoggedIn = () => {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) return next();
    // return next();
    return res.redirect('http://localhost:3000/login')
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const admin = await User.findOne({ where: { email: req.user.email, [Op.or]: [{ role: "Admin" }, { role: "Responsable" }] } })
    if (!admin) return res.status(403).redirect('http://localhost:3000/')// podría ser tmb un res.status(300).redirect('http://localhost:3000/login')
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: "Unauthorized - Require admin role" })
  }
}


const isSuperAdmin = (req, res, next) => {
  User.findOne({ where: { email: req.user.email, role: "Admin" }})
  .then(usuario => {
    if (!usuario) return res.status(403).redirect('http://localhost:3000/')
    next()
  })
  .catch(error => {
    console.log(error)
    return res.status(401).json({ message: "Unauthorized - Require admin role" })
  })


  // try {
  //   const admin = await User.findOne({ where: { email: req.user.email, role: "Admin" } })
  //   if (!admin) return res.status(403).redirect('http://localhost:3000/')// podría ser tmb un res.status(300).redirect('http://localhost:3000/login')
  //   next()
  // } catch (error) {
  //   console.log(error)
  //   return res.status(401).json({ message: "Unauthorized - Require admin role" })
  // }
}

// ===========================================================================================
//                     RUTAS LOGIN/LOGOUT
// ===========================================================================================

server.post('/login', passport.authenticate('local'), (req, res, next) => {

  if (req.isAuthenticated()) return res.status(200).json(req.user);
  return res.sendStatus(401);

})

server.get('/login', (req, res, next) => {

  req.user ? req.user.password = null : null

  req.isAuthenticated() ? res.status(200).json(req.user) : res.sendStatus(401)

  return
})

server.get('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy()
  req.logout();
  res.clearCookie('connect.sid');
  res.send('ok')
  return
})

server.get('/profile', isLoggedIn(), (req, res, next) => {
  res.json(req.user)
  return
})



// ===========================================================================================
//                     RUTA PROMOVER O BAJAR DE RANGO A USUARIOS
// ===========================================================================================

server.post('/promote/:id', (req, res, next) => {
  User.findOne({
    where: { id: req.params.id }
  }).then(user => {
    user.role = "Responsable"
    return user.save();
  }).then(result => res.status(200).send('Usuario promovido a Responsable'))
    .catch(err => { res.status(400).send(err) })
});

server.post('/demote/:id', (req, res, next) => {
  User.findOne({
    where: { id: req.params.id }
  }).then(user => {
    user.role = "Cliente"
    return user.save();
  }).then(result => res.status(200).send('Usuario pasado a rol Cliente'))
    .catch(err => { res.status(400).send(err) })
});




// ===========================================================================================
//                     RUTAS Login GOOGLE/GITHUB
// ===========================================================================================

server.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

server.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/Login' }), (req, res) => {
  if (req.user) {
    let payload = { id: req.user.id };
    return res.redirect(`http://localhost:3000`);
  }
});

server.get('/github', passport.authenticate('github', { scope: ['user:email', 'read:user'] }));

server.get('/github/callback', passport.authenticate('github', { failureRedirect: 'http://localhost:3000/Login' }), (req, res) => {
  let payload = { id: req.user.id };
  res.redirect(`http://localhost:3000`);
});


module.exports = [ server, isAdmin, isLoggedIn ];
