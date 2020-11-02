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
                    
                </head>
                <body>
                    <div class='allContainer'>
                        <ul style="background: black;padding: 35px 70px;text-align:center;">
                            <h3 style="color: #dedede; font-size: 28px; font-weight: 500;">Detalle de Productos</h3>
                            ${dataFront.product.map(prod =>`
                                <div class='container' style='display: flex; background: linear-gradient(135deg, #fad961 0%,#f76b1c 100%);'>                                    
                                    <div class='images' style="width: 10% !important; float: left !important;">
                                        <img class='img' width='70%' src="${prod.image}" alt="" style="padding: 20px;">
                                    </div>
                                    <div class='data' style="width: 90% !important; padding: 20px; font-weight: 600; font-size: 14px; list-style-type: circle; text-align: left; width: 75%;">
                                        <li class='Nombre'>Nombre: ${prod.name}</li> 
                                        <li class='Description'>Description: ${prod.description}</li> 
                                        <li class='Precio'>Precio: $${prod.price}</li>
                                        <li class='Cantidad'>Cantidad: ${prod.count}</li>
                                    </div>
                                </div>
                        `)}
                            <h4 style="text-align: right; color: #dedede; font-size: 26px;">Total a pagar: $${dataFront.total.toFixed(2)}</h4>
                            <br/><br/>
                            <div style="text-align: center">
                                <img class="img" src="https://periconoticias.com.ar/logoHenryMov.png" alt="" style="padding: 20px;width:200px;height:80px;padding-bottom: 0px !important;">
                                <h3 style="color: #dedede;font-size: 28px;font-weight: 500;margin-top: 0px !important;">¡Gracias por su compra!</h3>
                            </div><br><br><br/>
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
                        <h1> Gracias por su compra! </h1>
                        <hr/>
                        <p>Para proceder con el pago dicte el siguiente código al operador de ${dataFront.pago}<p/>
                        <h2>código de pago: ${dataFront.token}</h2>
                    </div>
                </body>
            </html>`
        }
    }
    if (type === "mailCancel"){
        mailOptions = {
            from: "henrymov.g05@gmail.com",
            to,
            subject: "Cancelacion de Orden",
            html:
            `<html>
                <head>
                </head>
                <body>
                    <div>
                        <p>${dataFront}<p/>
                        
                    </div>
                </body>
            </html>`
        };
    }
    if (type === "mailReset"){
        mailOptions = {
            from: "henrymov.g05@gmail.com",
            to,
            subject: "Cambio de Clave",
            html:
            `<html>
                <head>
                </head>
                <body>
                    <div>
                        <p>${dataFront}<p/>
                    </div>
                </body>
            </html>`
        };
    }

    mailGun.messages().send(mailOptions, (err, data)=>{
        if (err) {
            console.log("Error => ",err)
        } else {
        }
    })
}

module.exports = mailCreator;
