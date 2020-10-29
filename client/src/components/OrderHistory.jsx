import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../redux/Action';
import { dateFormat } from '../utils/utils.js';
import { useHistory } from "react-router-dom";
import LoadingBar from "./LoadingBar";
import axios from 'axios';


const OrderHistory = ({userId}) => {

	// PROTECCION DE LA RUTA PARA QUE EL USER PUEDA VER SÓLO SUS ORDENES //
	const history = useHistory()
	 if (localStorage.getItem('id') !== userId) {
	    history.push('/')
	  }

	 // TRAIGO HISTORIAL DE ORDENES
	const dispatch = useDispatch()
	const orderHistory = useSelector(store => store.orderHistory)
	const orderDetailStore = useSelector(store => store.orderDetail)

	const [ordersFiltered, setOrdersFiltered] = useState(orderHistory)


	useEffect(() => {
		dispatch(action.orderHistory(userId))
        dispatch(action.orderDetail(userId));
    }, [ordersFiltered]);


    const handleSwitch = (e) => {
        const {value} = e.target
        if (value === 'Todas') {
        	setOrdersFiltered(orderHistory);
        	return
        } else {
            console.log(orderHistory)
        setOrdersFiltered(orderHistory.filter(orders => orders.status == value))
        }
    }



	if (orderHistory.length === 0) return <LoadingBar/>
    if (!ordersFiltered.length) setOrdersFiltered(orderHistory)
	return (
		 <div id="test" className="col-md-12 panel-right row" style={{ paddingTop: '25px' }}>
        <div id="contOrderHistory" className="col-md-12 col-lg-12">
			<div className='ContainerStatus row pb-2' style={{top: "0px"}} >
				<label className='FilterTitle col-sm-5'>Filtrar:</label>
				<select className='Select form-control col-sm-7' onChange={(e)=>handleSwitch(e)} name="select">
					<option value="Todas" selected>Todas</option>
					<option value="Created">Created</option> 
					<option value="Processing">Processing</option>
					<option value="Cancelled">Cancelled</option>
					<option value="Fulfilled">Fulfilled</option>
				</select>
			</div>
            <h2 className="titleOrders">Mis Ordenes</h2>
            <p />
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Envío</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Entregada</th>
                        <th scope="col">Metodo de Pago</th>
                        <th scope="col">Fecha Compra</th>
{/*                        <th scope="col">userId</th>*/}
                    </tr>
                </thead>
                <tbody>
                    {
                        ordersFiltered.length > 0 && ordersFiltered.map(dato => {
                            if (dato.status !== 'On Cart') {
                                return (
                                    <tr key={dato.id} >
                                        <td><Link to={`/order/detail/${dato.id}`}>{dato.id}</Link></td>
                                        <td><Link to={`/order/detail/${dato.id}`}>{dato.shipping.toString()}</Link></td>
                                        <td><Link to={`/order/detail/${dato.id}`}>{dato.status}</Link></td>
                                        <td><Link to={`/order/detail/${dato.id}`}>{dato.received.toString()}</Link></td>
                                        <td><Link to={`/order/detail/${dato.id}`}>{dato.paymentMethod.toString()}</Link></td>
                                        <td><Link to={`/order/detail/${dato.id}`}>{dateFormat(dato.buyDate)}</Link></td>
                               { /*        <td><Link to={`/order/${dato.id}`}>{dato.userId}</Link></td>*/}
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
		</div>
		</div>
		)
}

export default OrderHistory;