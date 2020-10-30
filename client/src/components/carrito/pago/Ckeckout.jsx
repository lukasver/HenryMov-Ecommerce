import React from 'react'
import Henry from '../../../img/logoHenry.png'
import './Checkout.css'


export default function Checkout() {
    let countCart = localStorage.getItem('count')
    let product = JSON.parse(localStorage.getItem('prod'))
    let subtotal = 0
    let envio = 0
    let total = 0

    return (
        <div className="container">
    <div className="py-5 text-center">
        <img className="d-block mx-auto mb-4" src={Henry} />
        <h2>Datos de envio y pago</h2>
    </div>
    <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-dark">Tu carrito</h2><a className="text-warning stretched-link" href='./carrito'><small>editar</small></a>
    <span className="badge badge-secondary badge-pill">{countCart}</span>
            </h4>
            <ul className="list-group mb-3 sticky-top">
                {product !== undefined && product.map(prod => {
                    subtotal = subtotal + (prod.price * prod.count)
                    envio = envio + subtotal * 0.1
                    total = total + (subtotal+ envio)
                    return (
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div className='row'>
                    <img src={prod.image} width={60}/>
                    {/* <h6 className="my-0">{prod.name}</h6>
                    <small className="text-muted">Cantidad :{prod.count}</small> */}
                    <div class="col-sm-6 col-xs-6">
                        <div class="col-xs-12">{prod.name.substring(0,9) + '...'}</div>
                        <div class="col-xs-12"><small>Cantidad:<span>{prod.count}</span></small></div>
                    </div>
                    </div>
                    <span className="text-muted">$ {prod.count * prod.price}</span>
                </li>)}
                )}
                <li className="list-group-item d-flex justify-content-between">
                    <span>Subtotal</span>
                    <strong>{subtotal.toFixed(2)}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Envio</span>
                    <strong>{envio.toFixed(2)}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                        <h6 className="my-0">Total</h6>
                    </div>
                    <span className="text-success">{total.toFixed(2)}</span>
                </li>
            
                
            </ul>
        </div>
        <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Direccion de envio</h4>
            <form className="needs-validation" novalidate="">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label for="firstName">Nombres</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Patrick"  required=""/>
                        <div className="invalid-feedback"> Valid first name is required. </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label for="lastName">Apellidos</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Sherman"  required=""/>
                        <div className="invalid-feedback"> Valid last name is required. </div>
                    </div>
                </div>
                {/* <div className="mb-3">
                    <label for="username">Usuario</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">@</span>
                        </div>
                        <input type="text" className="form-control" id="username" placeholder="Username" required=""/>
                        <div className="invalid-feedback" data-style="width: 100%;"> Your username is required. </div>
                    </div>
                </div> */}
                <div className="mb-3">
                    <label for="email">Email <span className="text-muted"></span></label>
                    <input type="email" className="form-control" id="email" placeholder="you@example.com"/>
                    <div className="invalid-feedback"> Please enter a valid email address for shipping updates. </div>
                </div>
                <div className="mb-3">
                    <label for="address">Dirección</label>
                    <input type="text" className="form-control" id="address" placeholder="Calle Wallaby 42" required=""/>
                    <div className="invalid-feedback"> Please enter your shipping address. </div>
                </div>
                <div className="mb-3">
                    <label for="address2">Dirección 2 <span className="text-muted">(Opcional)</span></label>
                    <input type="text" className="form-control" id="address2" placeholder="Av. Siempre Viva 742"/>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <label for="country">Pais</label>
                        <select className="custom-select d-block w-100" id="country" required="">
                            <option value="">Elige...</option>
                            <option>Argentina</option>
                            <option>Brasil</option>
                            <option>Bolibia</option>
                            <option>Chile</option>
                            <option>Peru</option>
                            <option>Uruguay</option>
                        </select>
                        <div className="invalid-feedback"> Please select a valid country. </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label for="state">Provincia</label>
                        <select className="custom-select d-block w-100" id="state" required="">
                            <option value="">Elige...</option>
                            <option>Buenos Aires</option>
                            <option>Catamarca</option>
                            <option>Chaco</option>
                            <option>Chubut</option>
                            <option>Córdoba</option>
                            <option>Corrientes</option>
                            <option>Entre Ríos</option>
                            <option>Formosa</option>
                            <option>Jujuy</option>
                            <option>La Pampa</option>
                            <option>La Rioja</option>
                            <option>Mendoza</option>
                            <option>Misiones</option>
                            <option>Neuquén</option>
                            <option>Río Negro</option>
                            <option>Salta</option>
                            <option>San Juan</option>
                            <option>San Luis</option>
                            <option>Santa Cruz</option>
                            <option>Santa Fe</option>
                            <option>S. del Estero</option>
                            <option>T. del Fuego</option>
                            <option> Tucumán</option>


                        </select>
                        <div className="invalid-feedback"> Please provide a valid state. </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label for="zip">Codigo postal</label>
                        <input type="text" className="form-control" id="zip" placeholder="5000" required=""/>
                        <div className="invalid-feedback"> Zip code required. </div>
                    </div>
                </div>
                <hr className="mb-4"/>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="same-address"/>
                    <label className="custom-control-label" for="same-address">La direccion de envio es la misma de la de facturación</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="save-info"/>
                    <label className="custom-control-label" for="save-info">Guarde esta información para la próxima vez</label>
                </div>
                <hr className="mb-4"/>
                <h4 className="mb-3">Metodo de pago</h4>
                <div className="row my-3">
                    <div className="custom-control custom-radio">
                        <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked="" required=""/>
                        <label className="custom-control-label" for="credit">Tarjeta de credito</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required=""/>
                        <label className="custom-control-label" for="debit">Tarjeta de debito</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required=""/>
                        <label className="custom-control-label" for="paypal">PayPal</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label for="cc-name">Name on card</label>
                        <input type="text" className="form-control" id="cc-name" placeholder="" required=""/>
                        <small className="text-muted">Full name as displayed on card</small>
                        <div className="invalid-feedback"> Name on card is required </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label for="cc-number">Credit card number</label>
                        <input type="text" className="form-control" id="cc-number" placeholder="" required=""/>
                        <div className="invalid-feedback"> Credit card number is required </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <label for="cc-expiration">Expiration</label>
                        <input type="text" className="form-control" id="cc-expiration" placeholder="" required=""/>
                        <div className="invalid-feedback"> Expiration date required </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label for="cc-cvv">CVV</label>
                        <input type="text" className="form-control" id="cc-cvv" placeholder="" required=""/>
                        <div className="invalid-feedback"> Security code required </div>
                    </div>
                </div>
                <hr className="mb-4"/>
                <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
            </form>
        </div>
    </div>
    <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">© 2017-2019 Company Name</p>
        <ul className="list-inline">
            <li className="list-inline-item"><a href="#">Privacy</a></li>
            <li className="list-inline-item"><a href="#">Terms</a></li>
            <li className="list-inline-item"><a href="#">Support</a></li>
        </ul>
    </footer>
</div>
    )
}