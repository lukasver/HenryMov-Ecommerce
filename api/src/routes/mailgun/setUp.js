const {apiKey, domain} = process.env
const mailGun = require('mailgun-js')({apiKey, domain})

const auth = {
    auth: {
        api_key: apiKey, 
        domain: domain
    }
};

// const transporter = nodeMailer.createTransport(mailGun(auth));

function mailCreator (to, type, data){
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
                        <h2>códido: ${data}</h2>
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
            html:`
                <html>
                    <head>
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
                        <style>

                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <ul className="list-group mb-3 sticky-top ul-carrito">
                                {data.product !== undefined && data.product.map(prod => {
                                    data.subtotal = data.subtotal + (prod.price * prod.count)
                                    data.envio = data.envio + data.subtotal * 0.1
                                    data.total = data.total + (data.subtotal + data.envio)
                                    return (
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div className='row'>
                                                <img src={prod.image} width={60} />
                                                <div class="col-sm-6 col-xs-6">
                                                    <div class="col-xs-12">{prod.name.substring(0, 9) + '...'}</div>
                                                    <div class="col-xs-12"><small>Cantidad:<span>{prod.count}</span></small></div>
                                                </div>
                                            </div>
                                            <span className="text-muted">$ {prod.count * prod.price}</span>
                                        </li>)
                                }
                                )}
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <strong>{data.subtotal.toFixed(2)}</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Envio</span>
                                    <strong>{data.envio.toFixed(2)}</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between bg-light li-total">
                                    <div className="text-success">
                                        <h6 className="my-0 total-carrito">Total:</h6>
                                    </div>
                                    <span className="text-success span-total-num">{$ ${data.total.toFixed(2)}}</span>
                                </li>
                            </ul>
                        </div>
                    </body>
                </html>`
        }
    }
    mailGun.messages().send(mailOptions, (err, data)=>{
        if (err) {
            console.log("Error => ",err)
        } else {
            console.log("Data: \n",data)
        }
    })
}

module.exports = mailCreator;
