import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../../redux/Action';
import './OrdenDetalle.css';
import { dateFormat } from '../../utils/utils.js';
import { useHistory } from "react-router-dom";

export default function OrdenDetalle({orderId}) {

    const orderDetailStore = useSelector(store => store.orderDetail)

    const history = useHistory();
    const dispatch = useDispatch();

    let total = 0;

    useEffect(() => {
        dispatch(action.orderDetail(orderId));
    }, []);

    function goBack() {
        history.goBack()
        return
    }

    return (
        <div className="container">
            <div className="content-order" style={{position: 'relative'}} >
                <button onClick={goBack}className="backbuttn-2 adam-chng"><i className='fas fa-arrow-circle-left'></i></button>
                <h2>Orden de compra</h2>
                <h3>Datos Personales</h3>
                <br />
                <div className="main row">
                    <div className="datos-personales col-md-6">
                        <ul className="list-group ul-detalle">
                            <li className="list-group-item list-order" style={{ paddingTop: '15px' }}>Nombre: {orderDetailStore.products !== undefined && orderDetailStore.user.name}</li>
                            <li className="list-group-item list-order">Apellido: {orderDetailStore.products !== undefined && orderDetailStore.user.lastname}</li>
                            <li className="list-group-item list-order list-order-bottom" style={{ paddingBottom: '15px' }}>Id Usuario: {orderDetailStore.products !== undefined && orderDetailStore.user.id}</li>
                        </ul>
                    </div>
                    <div className="datos-personales col-md-6">
                        <ul className="list-group ul-detalle">
                            <li className="list-group-item list-order" style={{ paddingTop: '15px' }}>E-mail: {orderDetailStore.products !== undefined && orderDetailStore.user.email}</li>
                            <li className="list-group-item list-order">Fecha de Compra: {orderDetailStore.products !== undefined && dateFormat(orderDetailStore.buyDate)}</li>
                            <li className="list-group-item list-order list-order-bottom" style={{ paddingBottom: '15px', }}>N° de Orden: {orderDetailStore.products !== undefined && orderDetailStore.id}</li>
                        </ul>
                    </div>
                </div>
                <br /><br />
                <table class="table table-hover">
                    <thead>
                        <tr className="list-order-top">
                            <th scope="col">Id</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio Unitario</th>
                            <th scope="col">Precio Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderDetailStore.products !== undefined && orderDetailStore.products.map(dato => {
                                return (
                                    <tr className="hover-list">
                                        <th scope="row">{dato.id}</th>
                                        <td style={{ textAlign: 'left' }}><Link className="link-producto" to={`/products/${dato.id}`} >{dato.name}</Link></td>
                                        <td>{dato.orderline.quantity}</td>
                                        <td>{(dato.orderline.amount / dato.orderline.quantity).toFixed(2)}</td>
                                        <td>{dato.orderline.amount}</td>
                                        <td style={{ display: 'none' }}>{total = total + parseInt(dato.orderline.amount)}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="hover-list-total">
                            <td colspan="3"></td>
                            <td className="total-order" colspan="1">Envío: {total * 0.1}</td>
                            <td className="total-order" colspan="2">TOTAL: {total + (total * 0.1)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}