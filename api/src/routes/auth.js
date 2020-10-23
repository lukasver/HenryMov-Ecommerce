const server = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { createToken, authenticateToken, isAdmin } = require ('./auth/authMiddlewares.js')

server.post('/login', passport.authenticate('local'), (req,res,next) => {
  

  res.send('logeado')
  return
})

module.exports = server;
