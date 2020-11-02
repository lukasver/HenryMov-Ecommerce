const server = require('express').Router();
const express = require("express");
const app = express();
const mercadopago = require("mercadopago");
const { Product, User, Order, Orderline } = require('../db.js');
const mailCreator = require('./mailgun/setUp.js');

//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken("TEST-4183331195724963-102618-87a5f0dddc6e633ad9bcf4b2cee6df45-25502682");

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


server.get("/payment", function (req, res) {
  res.status(200);
});

server.post("/process_payment", (req, res) => {
  console.log('datos: ', req.body);
  let productos = JSON.parse(req.body.products)
  const payment_cash = {
    transaction_amount: Number(req.body.transactionAmount),
    description: req.body.description,
    payment_method_id: req.body.paymentMethodId,
    payer: {
      email: req.body.email
    }
  }

  const payment_data = {
    transaction_amount: Number(req.body.transactionAmount),
    token: req.body.token,
    description: req.body.description,
    installments: !req.body.installments ? 1 : Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.docType,
        number: req.body.docNumber
      }
    }
  };

  mercadopago.payment.save(req.body.paymentMethodId === 'rapipago' || req.body.paymentMethodId === 'pagofacil' ? payment_cash : payment_data)
    .then(async function (response) {
      let rta = {
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id
      }
      let orden = await Order.findOne({ where: { userId: req.body.userId, status: 'On Cart' } })
      if (orden) await orden.destroy()
      orden = await Order.create({
        userId: req.body.userId
      })
      await productos.forEach(async (orderline) => {
        const { productId, quantity, amount } = orderline;
        // busca x cada orderline que el id de producto exista, y caso que exista updatea la cantidad
        // en la BD en base a lo que compró el cliente 
        console.log('order', orderline)
        const producto = await Product.findByPk(productId)
        if (!producto) {
          return;
        } else {

          let newStock = await producto.get('stock') - quantity
          console.log('nuevo stock ', newStock)

          await Product.update({ stock: newStock }, {
            where: { id: productId }
          })
        }
        //asocia la orderline a la orden 'On Cart'
        await orden.addProducts(productId, { through: { quantity: quantity, amount: amount } })
        return
      })

      let pago = 'Tarjeta de Credito'
      if (req.body.paymentMethodId === 'rapipago') {
        pago = 'Rapipago'
      } else if (req.body.paymentMethodId === 'pagofacil') {
        pago = 'Pagofacil'
      } else if (req.body.paymentMethodId.slice(0, 3) === 'deb') {
        pago = 'Tarjeta de Debito'
      } 
      if (pago === "Rapipago" || pago === "Pagofacil") {
        
        mailCreator(req.body.email, "Mpago",{token:response.body.id, pago})
      }
      await orden.update({
        status: 'Creada',
        paymentId: response.body.id,
        paymentStatus: response.body.status,
        paymentDetail: response.body.status_detail,
        paymentMethod: pago
      })

      if (pago === "Rapipago" || pago === "Pagofacil") {
        return res.sendStatus(200) 
      } else {
        return res.status(302).redirect('http://localhost:3000/payment_success')
      }
      
    })
    .catch(function (error) {
      console.log('ERRORRRR: ', error);
      res.status(response.status).send(error);
    });
});

module.exports = server;