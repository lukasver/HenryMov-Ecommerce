const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../../db.js');


// ===========================================================================================
//       						   MIDDLEWARES DE AUTENTICACIÓN
// ===========================================================================================


// ===================== PASSPORT MIDDLEWARES ========================

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
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id)
  .then((user, err) => {
    done(err, user);
  });
});



// ===================== USER TIENE TOKEN? ========================
const authenticateToken = async (req,res,next) => {
	// const token = req.headers["x-access-token"] // esto sería para verlo por postman o ese header puntual
	const { TOKEN_SECRET } = process.env

	const token = req.cookies.jwt


	try{
	if (!token) return res.status(401).send('Unauthorized: Necesitas un token')
	const decoded = await jwt.verify(token, TOKEN_SECRET)
	if(!decoded) res.status(403).send('Token erroneo')
	const user = await User.findOne({where: {email: decoded}})
	if(!user) res.status(403).send('Usuario no existe')
	req.email = user.email
	next()
	}
	catch( error ) {
		console.log(error)
		res.status(401).json({message: "Unauthorized"})
	}

}

// ===================== USER ES ADMIN?? ========================
const isAdmin = async (req,res,next) => {

	try {
	const admin = await User.findOne({where: {email: req.email, role: "Admin"}})
	console.log(admin)
	if (!admin) res.status(403).send('Usuario no es Administrador')
	next()
	} catch (error) {
		console.log(error)
		res.status(401).json({message: "Unauthorized - Require admin role"})
	}


}


// ===================== FN CREADORA DE TOKEN ========================
const createToken = (email) => {
	return jwt.sign({ email }, process.env.TOKEN_SECRET, {
		expiresIn: 60 * 60 * 24 // espera valor en segundos, no en milisegundos
	});
}

module.exports = {
	authenticateToken,
	isAdmin,
	createToken
}