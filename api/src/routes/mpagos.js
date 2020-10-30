const server = require('express').Router();
const express = require("express");
const app = express();
const mercadopago = require("mercadopago");

//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken("TEST-4183331195724963-102618-87a5f0dddc6e633ad9bcf4b2cee6df45-25502682");

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

server.get("/payment", function (req, res) {    
  res.status(200);
}); 

server.post("/process_payment", (req, res) => {
    console.log('========>>>>>>>>>>>>> ', req.body)
    var payment_data = {
        transaction_amount: Number(req.body.transactionAmount),
        token: req.body.token,
        description: req.body.description,
        installments: Number(req.body.installments),
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
    
      mercadopago.payment.save(payment_data)
        .then(function(response) {
          res.status(response.status).json({
            status: response.body.status,
            status_detail: response.body.status_detail,
            id: response.body.id
          });
        })
        .catch(function(error) {
            console.log('ERRORRRR: ',error);
          res.status(response.status).send(error);
        });
    });

module.exports = server;