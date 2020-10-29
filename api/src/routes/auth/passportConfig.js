const bcrypt = require('bcrypt');
const { User } = require('../../db.js');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const config = require('../config.js');

module.exports = function (passport) {
  
    passport.use(
      new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async function(email, password, done) {
    try{  
      const user = await User.findOne({where: { email: email, status: "Activo" }})
        
        if (!user) {return done(null, false, {message: 'Incorrect username'}); }
        if (!await bcrypt.compare(password, user.password)) { return done(null, false, {message: 'Incorrect password'}); }
        // if (!bcrypt.compareSync(password, user.password)) { return done(null, false, {message: 'Incorrect password'}); }
        console.log(user.id)
        return done(null, user);

    } catch (error) {
      return done(error); 
    }
  }))

  passport.serializeUser(function(user, done) {
    // console.log('serializacion', user.id)
    console.log('Serialize ',user.id)
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('Deserialize', id)
    User.findByPk(id).then((user,err) => {
      // console.log('deserializacion', user)
      done(err, user)
    });
  });

//===============================================
//     Estrategia de Google
//===============================================
    passport.use(new GoogleStrategy({
      clientID: config.googleAuth.clientID,
      clientSecret: config.googleAuth.clientSecret,
      callbackURL: config.googleAuth.callbackURL,
      // passReqToCallback: true
      proxy: true
      },
      function(token, refreshToken, profile, done) {
          process.nextTick(async function() {
              const user = profile._json;
              const password = await bcrypt.hash('HenryMov2.0!',9);   
              const birthdate = new Date('2000/10/10');
              User.findOrCreate({
                  where: { email: user.email },
                  defaults: {
                      name: user.given_name,
                      lastname: user.family_name,                      
                      email: user.email,
                      password: password,
                      phone: '0000000000',
                      birthdate: birthdate,
                      image: user.picture
                  }
              })
              .then(res => res[0])
              .then(user => {
                  if(user.status === "Inactivo") return done(false,null) // esto es para evitar el login de un usuario inactivo
                  done(null, user);
              })
              .catch(err => done(err));
          });
      }            
  ));

//===============================================
//     Estrategia de GitHub
//===============================================
  passport.use(new GitHubStrategy({
      clientID: config.githubAuth.clientID,
      clientSecret: config.githubAuth.clientSecret,
      callbackURL: config.githubAuth.callbackURL,
      // passReqToCallback: true,
      },
      function(accessToken, refreshToken, profile, done) {
          process.nextTick(async function() {      
            // console.log('datosssss: ', profile);  
              const user = profile;
              const password = await bcrypt.hash('HenryMov2.0!',9);     
              const birthdate = new Date('2000/10/10');               
              User.findOrCreate({
                  where: { email: user.emails[0].value },
                  defaults: {
                      name: user.displayName,
                      lastname: user.username,
                      email: user.emails[0].value,
                      password: password,
                      phone: '0000000000',
                      birthdate: birthdate,
                      image: user.photos[0].value
                  }
              })
              .then(res => res[0])
              .then(user => {
                  if(user.status === "Inactivo") return done(false,null) // esto es para evitar el login de un usuario inactivo
                  done(null, user);
              })
              .catch(err => done(err));            
          });
      }
  ));
}

