
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as action from '../../redux/Action'
import './Carrito.css';

export default function Carrito() {
    const dispatch = useDispatch()
    let product = JSON.parse(localStorage.getItem('prod'))
    let user= localStorage.getItem('id')
    const count = useSelector(store => store.count)
    const [prodId, setProdId] = useState('')
    const [render, setRender] = useState(true)
    let history = useHistory();

    useEffect(() => {
    }, [render, count])
   
    
    if (product != null) {
        product.sort(function (a, b) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        })
    }


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
            case 1: return envio.toFixed(2);
            case 2: return subtotal;
            case 3: return total.toFixed(2);
            default: return;
        }
    }
  

    function aumentar(prod) {
        render ? setRender(false) : setRender(true)
        if (prod.count < prod.stock) {
            prod.count = prod.count + 1
            let recoveredData = localStorage.getItem('prod')
            let data = JSON.parse(recoveredData)
            let newData = data.filter((data) => data.id !== prod.id)
            newData.push(prod)
            localStorage.setItem('prod', JSON.stringify(newData))
        }
        return
    }
    function disminuir(prod) {
        render ? setRender(false) : setRender(true)
        if (prod.count === 1) {
            return
        }
        prod.count = prod.count - 1
        let recoveredData = localStorage.getItem('prod')
        let data = JSON.parse(recoveredData)
        let newData = data.filter((data) => data.id !== prod.id)
        newData.push(prod)
        localStorage.setItem('prod', JSON.stringify(newData))

    }
    function handleDelete(id) {
        render ? setRender(false) : setRender(true)
        dispatch(action.removecountCart())
        let recoveredData = localStorage.getItem('prod')
        let data = JSON.parse(recoveredData)
        let newData = data.filter((data) => data.id !== id)
        let countCart = newData.length
        localStorage.setItem('count', countCart)
        localStorage.setItem('prod', JSON.stringify(newData))
    }
    function deleteAllProd() {
        render ? setRender(false) : setRender(true)
        dispatch(action.removecountCart())
        dispatch(action.deletedCart(user))
        let countCart = 0
        let newData = []
        localStorage.setItem('count', countCart)
        localStorage.setItem('prod', JSON.stringify(newData))
    }

    
    function handleUser(){
        render ? setRender(false) : setRender(true)
      history.push('/checkout') 
    }



    return (
        <div>
            <section className="text-center mb-4 mt-4">
                <div className="container">
                    <h1 className="jumbotron-heading">CARRITO HENRY MOV</h1>
                </div>
            </section>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-12 cart-mobile">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"> </th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Diponible</th>
                                        <th scope="col" className="text-center">Cantidad</th>
                                        <th scope="col" className="text-right">Precio Unit</th>
                                        <th scope="col" className="text-right">Precio Final</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product &&
                                        product.map(prod =>
                                            <tr>
                                                <td><Link className="titulo-link" to={`/products/${prod.id}`} ><img className="img-phone" src={prod.image} width={80} alt="" /></Link> </td>
                                                <h5 className='card-title w-auto p-3' >{prod.name.substring(0, 30) + '...'}</h5>
                                                <td>{prod.count < prod.stock ? <div class="alert alert-success" role="alert">
                                                   Stock Disponible
                                            </div> : <div class="alert alert-danger" role="alert">
                                                        Stock maximo</div>}</td>
                                                <td className="column-count">
                                                    <input type="button" class="btn btn-outline-primary count-cant-cart" value='-' onClick={() => { disminuir(prod) }} />
                                                    <input class="btn btn-primary count-cant-cart" type="button" value={prod.count} />
                                                    <input type="button" class="btn btn-outline-primary count-cant-cart" value='+' onClick={() => { aumentar(prod) }} />
                                                </td>
                                                <td class="text-right">$ {prod.price} </td>
                                                <td class="text-right">$ {prod.price * prod.count} </td>
                                                <td class="text-right"><button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#exampleModal" onClick={() => setProdId(prod.id)}><i className="fa fa-trash"></i> </button> </td>
                                            </tr>
                                        )}
                                    <div class="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog bg-dark" role="document">
                                            <div class="modal-content ">
                                                <div class="modal-header bg-dark">
                                                    <h5 class="card-header bg-danger text-white " id="exampleModalLabel">IMPORTANTE</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <div class="spinner-grow text-danger close" aria-hidden="true" role="status">
                                                            <span class="sr-only" aria-hidden="true">&times;</span>
                                                        </div>
                                                    </button>
                                                </div>
                                                <div class="modal-body p-3 mb-2 text-dark">
                                                    Te sugerimos que lo pienses...seguro quieres sacar tu producto del carrito?</div>
                                                <div class="modal-footer bg-dark" >
                                                    <button type="button" class="btn btn-outline-danger" data-dismiss="modal" onClick={() => handleDelete(prodId)}> SI  </button>
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
                            <div className="col-sm-4  col-md-3">
                                {product !== null && product.length !== 0 && <button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal1" >Vaciar el carrito</button>}
                            </div>
                            <div class="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header bg-dark">
                                            <h5 class="card-header bg-danger text-white " id="exampleModalLabel1">IMPORTANTE</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <div class="spinner-grow text-danger" aria-hidden="true" role="status">
                                                    <span class="sr-only " aria-hidden="true">&times;</span>
                                                </div>

                                            </button>
                                        </div>
                                        <div class="modal-body p-3 mb-2  text-dark">
                                            <p>Estas por vaciar todo tu carrito...</p><p>deseas continuar?</p>
                                        </div>
                                        <div class="modal-footer bg-dark">
                                            <button type="button" class="btn btn-outline-danger" data-dismiss="modal" onClick={() => deleteAllProd()}> SI  </button>
                                            <button type="button" class="btn btn-outline-success" data-dismiss="modal">NO</button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="col-sm-4  col-md-3">
                                <a className="btn btn-block btn-light" href='./products'>Continuar comprando</a>
                            </div>
                           { user != null ? <div className="col-sm-12 col-md-6 text-right">
                                <button className="btn btn-lg btn-block btn-success text-uppercase" onClick={()=>handleUser()} >Pagar</button>
                            </div>:
                              <div className="col-sm-12 col-md-6 text-right">
                              <button className="btn btn-lg btn-block btn-success text-uppercase" data-toggle="modal" data-target="#exampleModal2" >Pagar</button>
                          </div>
                            }

                                <div class="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header bg-dark">

                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body p-3 mb-2 ">
                                            Debes iniciar sesion para finalizar tu compra
                                        </div>
                                        <div class="modal-footer bg-dark">
                                            <a href="/register" type="button" class="btn btn-outline-primary">Registrate</a>
                                            <a href="/login" type="button" class="btn btn-outline-success">Iniciar sesion</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}