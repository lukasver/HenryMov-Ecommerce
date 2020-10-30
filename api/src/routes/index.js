const { Router } = require('express');
const express = require('express');
const multer = require('multer');
const path = require('path');

// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const userRouter = require('./user.js');
const orderRouter = require('./order.js');
const newsletter = require('./newsletter.js');
const reviews = require('./reviews.js');
const authRouter = require('./auth.js');
const mpagos = require('./mpagos');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

//Como va  almacenar los archivos multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
})

//En donde va a colocar los archivos multer
router.use(multer({
    storage,
    dest: path.join(__dirname, '../public/uploads'),
    limits: { fileSize: 10000000 }
}).single('image'));

// Static files
// Permite que podamos acceder a esta ruta publica
router.use(express.static(path.join(__dirname, '../public')))

router.use('/', productRouter, categoryRouter, userRouter, orderRouter, reviews, mpagos);
router.use('/newsletter', newsletter);
router.use('/auth', authRouter);

module.exports = router;
