const {apiKey, domain} = process.env
const mailGun = require('mailgun-js')({apiKey, domain})

const auth = {
    auth: {
        api_key: apiKey, 
        domain: domain
    }
};

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
                        <ul>
                            <h3>Productos</h3>
                            ${dataFront.product.map(prod =>`
                                <div class='container'>
                                    <div class='data'>
                                        <li class='Nombre'>Nombre: ${prod.name}</li> 
                                        <li class='Description'>Description: ${prod.description}</li> 
                                        <li class='Precio'>Precio: $${prod.price}</li>
                                        <li class='Cantidad'>Cantidad: $${prod.count}</li>
                                        <li class='Stock'>Stock: $${prod.stock}</li>
                                    </div>
                                    </div class='images'>
                                        <img class='img' src="${prod.image}" alt="">
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
    mailGun.messages().send(mailOptions, (err, data)=>{
        if (err) {
            console.log('==============================')
            console.log("Error => ",err)
        } else {
            console.log('==============================')
            console.log("Data: \n",data)
            console.log('===============DATA===============')
            console.log(dataFront)
        }
    })
}

module.exports = mailCreator;
