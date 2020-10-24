const server = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const { createToken, authenticateToken, isAdmin } = require ('./auth/authMiddlewares.js')

// ===========================================================================================
//                     MIDDLEWARES DE AUTENTICACIÓN Y PASSPORT CONFIG
// ===========================================================================================



const isLoggedIn = () => {  
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

      if (req.isAuthenticated()) return next();
      return next();
      //res.redirect('http://localhost:3000/login')
  }
}

const isAdmin = async (req,res,next) => {
console.log('adad: ', req.user.email);
 try {
 const admin = await User.findOne({where: {email: req.user.email, role: "Admin"}})
 if (!admin) return res.status(403).send('<h1>Unauthorized</h1>')// podría ser tmb un res.status(300).redirect('http://localhost:3000/login')
 next()
 } catch (error) {
   console.log(error)
   return res.status(401).json({message: "Unauthorized - Require admin role"})
 }


}

// ===========================================================================================
//                     RUTAS LOGIN/LOGOUT
// ===========================================================================================

server.post('/login', passport.authenticate('local'), (req,res,next) => {
  
  if(req.isAuthenticated()) return res.status(200).json(req.user);
  return res.sendStatus(401);

})

server.get('/login', (req,res,next) => {

  req.user ? req.user.password = null : null
  
  req.isAuthenticated() ? res.status(200).json(req.user) : res.sendStatus(401)

  return
})

server.get('/logout', isLoggedIn(), (req,res,next) => {
  
  req.session.destroy()
  req.logout();
  res.clearCookie('connect.sid');
  res.send('ok')
  return
})

server.get('/profile', isLoggedIn(), (req,res,next) => {
  
  res.json(req.user)
  return
})



server.post('/promote/:id',/* [isLoggedIn(), isAdmin], */(req, res, next) => {
  User.update({role: 'Admin'}, {
    where: {id: req.params.id}
  }).then(result => {
    console.log(result)
    if (result[0] === 0) {
      return res.status(404).send('ID no encontrado');
    }
    return res.status(200).send('Usuario promovido a Admin');
  }).catch(err => {res.status(400).send(err)})
});


module.exports = server;
