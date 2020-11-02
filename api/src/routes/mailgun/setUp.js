const {apiKey, domain} = process.env
const mailGun = require('mailgun-js')({apiKey, domain})

// const transporter = nodeMailer.createTransport(mailGun(auth));

function mailCreator (to, type, dataFront){
    let mailOptions;

    if (type === "Register"){
        mailOptions = {
            from: "henrymov.g05@gmail.com",
            to,
            subject: "Confirmación de cuenta",
            html:
            `<html>
                <head>
                </head>
                <body>
                    <div>
                        <p>Coloque el siguiente código en el formulario<p/>
                        <h2>códido: ${dataFront}</h2>
                    </div>
                </body>
            </html>`
        };
    }

    if (type === "Checkout"){
        mailOptions = {
            from: "henrymov.g05@gmail.com",
            to,
            subject: "Detalle de compra",
            html:
            `<html>
                <head>
                    <style>
                    .container{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }
                    .images{
                        width: 50%;
                    }

                    </style>
                </head>
                <body>
                    <div class='allContainer'>
                        <ul>
                            <h3>Productos</h3>
                            ${dataFront.product.map(prod =>`
                                <div class='container' style='display:flex; flex-direction:row; align-items:center'>
                                    <div class='data'>
                                        <li class='Nombre'>Nombre: ${prod.name}</li> 
                                        <li class='Description'>Description: ${prod.description}</li> 
                                        <li class='Precio'>Precio: $${prod.price}</li>
                                        <li class='Cantidad'>Cantidad: $${prod.count}</li>
                                        <li class='Stock'>Stock: $${prod.stock}</li>
                                    </div>
                                    </div class='images'>
                                        <img class='img' width='50%' src="${prod.image}" alt="">
                                    </div>
                                </div>
                        `)}
                            <h4>Total a pagar: ${dataFront.total.toFixed(2)}</h4>
                        </ul>
                    </div>
                </body>
            </html>`
        }
    }
//{token:response.body.id, pago}
    if (type === "Mpago"){
        mailOptions = {
            from: "henrymov.g05@gmail.com",
            to,
            subject: "Verificacion de pago",
            html:`
            <html>
                <head>
                </head>
                <body>
                    <div>
                        <p>Dicte el siguiente código al operador de ${dataFront.pago}<p/>
                        <h2>códido: ${dataFront.token}</h2>
                    </div>
                </body>
            </html>`
        }
    }

    mailGun.messages().send(mailOptions, (err, data)=>{
        if (err) {
            console.log("Error => ",err)
        } else {
        }
    })
}

module.exports = mailCreator;
