
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as action from '../../redux/Action'
import './Carrito.css';

export default function Carrito() {
    const dispatch = useDispatch()
    let product = JSON.parse(localStorage.getItem('prod'))
    

    function subTotal(act) {
        let subtotal = 0
        if (product == null) {
            return 0
        }
        product.map(precio =>
            subtotal = subtotal + precio.price * precio.count,
        )
        let envio = subtotal * 0.1
        let total = subtotal + envio
        switch (act) {
            case 1: return envio;
            case 2: return subtotal;
            case 3: return total;
            default: return;
        }
    }
    const [prodId, setProdId] = useState('')
    const [ren, setRen] = useState(true)

    useEffect(() => {
    }, [ren, prodId])

    function handleDelete(id) {

        ren ? setRen(false) : setRen(true)
        dispatch(action.removecountCart())
        let recoveredData = localStorage.getItem('prod')
        let data = JSON.parse(recoveredData)
        let newData = data.filter((data) => data.id !== id)
        let countCart = newData.length
		localStorage.setItem('count',countCart )
        localStorage.setItem('prod', JSON.stringify(newData))
    }




    return (
        <div>
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">CARRITO HENRY MOV</h1>
                </div>
            </section>

            <div className="container mb-4">
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"> </th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Diponible</th>
                                        <th scope="col" className="text-center">Cantidad</th>
                                        <th scope="col" className="text-right">Precio</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product ?
                                            product.map(prod =>
                                                <tr>
                                                    <td><img src={prod.image} width={80} /> </td>
                                                    <h3 className='titulo'>{prod.name}</h3>
                                                    <td>{prod.availability}</td>
                                                    <td><input className="form-control" type="text" value={prod.count} /></td>
                                                    <td className="text-right">$ {prod.price * prod.count} </td>
                                                    <td className="text-right"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => setProdId(prod.id)}><i className="fa fa-trash"></i> </button> </td>
                                                </tr>
                                            ) : null}
                                    <div class="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title p-3 mb-2 bg-danger text-white" id="exampleModalLabel">IMPORTANTE</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body p-3 mb-2 bg-warning text-dark">
                                                    Te sugerimos que lo pienses...seguro quieres sacar tu producto del carrito?
      </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-outline-danger" data-dismiss="modal" onClick={() => handleDelete(prodId)}>SI</button>
                                                    <button type="button" class="btn btn-outline-success" data-dismiss="modal">NO</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Sub-Total</td>
                                        <td className="text-right">$ {subTotal(2)} </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Envio</td>
                                        <td className="text-right">$ {subTotal(1)} </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><strong>Total</strong></td>
                                        <td className="text-right"><strong>$ {subTotal(3)} </strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col mb-2">
                        <div className="row">
                            <div className="col-sm-12  col-md-6">
                                <a className="btn btn-block btn-light" href='./products'>Continuar comprando</a>
                            </div>
                            <div className="col-sm-12 col-md-6 text-right">
                                <button className="btn btn-lg btn-block btn-success text-uppercase">Pagar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-lg-4 col-xl-3 bg-dark">
                            <h5>About</h5>
                            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                            <p className="mb-0">
                                Somos un grupo de estudiantes de Henry dispuestos a dar todo de cada uno para mejorar el futuro nuestro y del mundo
                </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto bg-dark">
                            <h5>Informations</h5>
                            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                            <ul className="list-unstyled">
                                <li><a href="">Link 1</a></li>
                                <li><a href="">Link 2</a></li>
                                <li><a href="">Link 3</a></li>
                                <li><a href="">Link 4</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto bg-dark">
                            <h5>Others links</h5>
                            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                            <ul className="list-unstyled">
                                <li><a href="">Link 1</a></li>
                                <li><a href="">Link 2</a></li>
                                <li><a href="">Link 3</a></li>
                                <li><a href="">Link 4</a></li>
                            </ul>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 bg-dark">
                            <h5>Contact</h5>
                            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                            <ul className="list-unstyled">
                                <li><i className="fa fa-home mr-2"></i> My company</li>
                                <li><i className="fa fa-envelope mr-2"></i> email@example.com</li>
                                <li><i className="fa fa-phone mr-2"></i> + 33 12 14 15 16</li>
                                <li><i className="fa fa-print mr-2"></i> + 33 12 14 15 16</li>
                            </ul>
                        </div>
                        <div className="col-12 copyright mt-3">
                            <p className="float-left">
                                <a href="#">Back to top</a>
                            </p>
                            <p className="text-right text-muted">created with <i className="fa fa-heart"></i> by <a href="https://t-php.fr/43-theme-ecommerce-bootstrap-4.html"><i>Henry</i></a> | <span>Group 05</span></p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}