const server = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const { createToken, authenticateToken, isAdmin } = require ('./auth/authMiddlewares.js')

// ===========================================================================================
//                     MIDDLEWARES DE AUTENTICACIÓN Y PASSPORT CONFIG
// ===========================================================================================

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function(email, password, done) {
  try{  
   const user = await User.findOne({where: { email: email }})
    console.log(user)
      
      if (!user) {return done(null, false, {message: 'Incorrect username'}); }
      if (!bcrypt.compareSync(password, user.password)) { return done(null, false, {message: 'Incorrect password'}); }
      return done(null, user);

  } catch (error) {
    return done(error); 
  }
}))

passport.serializeUser(function(user, done) {
  console.log('serializacion', user.id)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id).then((user,err) => {
    console.log('deserializacion', user)
    done(err, user)
  });
})

function authenticationMiddleware () {  
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

      if (req.isAuthenticated()) return next();
      res.redirect('/login')
  }
}

// ===========================================================================================
//                     RUTAS LOGIN/LOGOUT
// ===========================================================================================

server.post('/login', passport.authenticate('local'), (req,res,next) => {
  
  req.isAuthenticated() ? res.sendStatus(200) : res.sendStatus(401)

  return
})

server.post('/logout', passport.authenticate('local'), (req,res,next) => {
  
  req.isAuthenticated() ? res.sendStatus(200) : res.sendStatus(401)

  return
})






server.post('/promote/:id', (req, res, next) => {
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
