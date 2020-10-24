const bcrypt = require('bcrypt');
const { User } = require('../../db.js');
const LocalStrategy = require('passport-local');

module.exports = function (passport) {
    passport.use(
      new LocalStrategy({
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
}

