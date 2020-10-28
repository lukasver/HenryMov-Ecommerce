const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors')
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require('passport');
const { conn } = require('./db.js');
require('./db.js');
require('./routes/auth/passportConfig.js')(passport);
const server = express();

// var allowlist = ['http://localhost:3000', 'http://localhost:3001'];

// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

server.name = 'API';
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials : true
}
server.use(cors(corsOptions));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser(process.env.COOKIE));
server.use(session({
    secret: process.env.COOKIE,   // SETEAR ESTE SECRET CON EL MISMO QUE COOKIEPARSER!!
    store: new SequelizeStore({db: conn}),
		resave: false, 
		saveUninitialized: false,
    cookie: {secure: false}
  }));
server.use(passport.initialize());
server.use(passport.session());

server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // 'http://localhost:3000' update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  next();
});


server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
