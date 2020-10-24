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
  });

//===============================================
//     Estrategia de Google
//===============================================
    passport.use(new GoogleStrategy({
      clientID: config.googleAuth.clientID,
      clientSecret: config.googleAuth.clientSecret,
      callbackURL: config.googleAuth.callbackURL,
      passReqToCallback: true,
      proxy: true
      },
      function(req, token, refreshToken, profile, done) {
          process.nextTick(async function() {
              console.log(profile);
              const user = profile._json;
              const password = 'hola1234';
              let hashedPassword = await bcrypt.hash(password, 10);                  
              User.findOrCreate({
                  where: { email: user.email },
                  defaults: {
                      name: user.given_name,
                      lastName: user.family_name,
                      email: user.email,
                      password: hashedPassword,
                      otherAuth: 'yes'
                  }
              })
              .then(res => res[0])
              .then(user => {
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
      passReqToCallback: true,
      scope: ['user:email', 'read:user']
      },
      function(accessToken, refreshToken, params, profile, cb) {
          process.nextTick(async function() {              
              console.log(params);
              const user = profile;
              const password = 'hola1234';
              let hashedPassword = await bcrypt.hash(password, 10);                  
              User.findOrCreate({
                  where: { email: user.emails[0].value },
                  defaults: {
                      name: user.displayName || user.username,
                      lastName: user.username,
                      email: user.emails[0].value,
                      password: hashedPassword,
                      otherAuth: 'yes'
                  }
              })
              .then(res => res[0])
              .then(user => {
                  cb(null, user);
              })
              .catch(err => cb(err));            
          });
      }
  ));
}

