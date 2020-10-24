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
      
      if (!user) {return done(null, false, {message: 'Incorrect username'}); }
      if (!bcrypt.compareSync(password, user.password)) { return done(null, false, {message: 'Incorrect password'}); }
      return done(null, user);

  } catch (error) {
    return done(error); 
  }
}))

passport.serializeUser(function(user, done) {
  // console.log('serializacion', user.id)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id).then((user,err) => {
    // console.log('deserializacion', user)
    done(err, user)
  });
})

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
 if (!admin) res.status(403).send('<h1>Unauthorized</h1>')// podría ser tmb un res.status(300).redirect('http://localhost:3000/login')
 next()
 } catch (error) {
   console.log(error)
   res.status(401).json({message: "Unauthorized - Require admin role"})
 }


}

// ===========================================================================================
//                     RUTAS LOGIN/LOGOUT
// ===========================================================================================

server.post('/login', passport.authenticate('local'), (req,res,next) => {
  
  if(req.isAuthenticated()) return res.status(200).json(req.user);
  return res.sendStatus(401);

})

server.get('/logout', isLoggedIn(), (req,res,next) => {
  

  req.logout();
  res.clearCookie('connect.sid');
  return
})

server.get('/profile', [isLoggedIn(), isAdmin], (req,res,next) => {
  console.log('logggg', req.user);
  res.json(req.user)
  return
})



server.post('/promote/:id', [isLoggedIn(), isAdmin], (req, res, next) => {
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
