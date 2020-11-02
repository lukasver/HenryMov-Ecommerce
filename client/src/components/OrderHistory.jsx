import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../redux/Action';
import { dateFormat } from '../utils/utils.js';
import { useHistory } from "react-router-dom";
import LoadingBar from "./LoadingBar";
import axios from 'axios';
import ComponenteError from './ComponenteError';



const OrderHistory = ({userId}) => {

	// PROTECCION DE LA RUTA PARA QUE EL USER PUEDA VER SÓLO SUS ORDENES //
	const history = useHistory()


    if (localStorage.getItem('role') !== 'Admin' && localStorage.getItem('role') !== 'Responsable') {
	 if (localStorage.getItem('id') !== userId) {
	    history.push('/')
	  }}

	 // TRAIGO HISTORIAL DE ORDENES
	const dispatch = useDispatch()
	const orderHistory = useSelector(store => store.orderHistory)

	const [ordersFiltered, setOrdersFiltered] = useState(orderHistory)
    const [bool, setBool] = useState(0)
    const [canx, setCanx] = useState(false)


	useEffect(() => {
		dispatch(action.orderHistory(userId))
        dispatch(action.orderDetail(userId));
    }, [canx, bool, ordersFiltered]);


    const handleSwitch = (e) => {
        const {value} = e.target
        if (value === 'Todas') {
        	setOrdersFiltered(orderHistory);
        	return
        } else {
        let filtro = orderHistory.filter(orders => orders.status == value)
        console.log(filtro.length === 0)
        if (!filtro.length) {
            setOrdersFiltered([])
            setBool(1)
            } else {
        setOrdersFiltered(filtro)
            }
        }
    }

    const handleCancel = async (e,id,buyDate) => {
        if(window.confirm('Esta seguro que quiere cancelar esta orden? esta acción es irreversible')) {
        const orderCanx = await axios.put(`http://localhost:3001/orders/cancel/${id}`,{userId, buyDate}) 
        window.location.reload();
        return setCanx(!canx)
        }
    }



	if (orderHistory.length === 0) return <LoadingBar/>

    if (!ordersFiltered.length && !bool) {
        setOrdersFiltered(orderHistory)
        setBool(2)
    }

    if (ordersFiltered.length === 1 && (ordersFiltered.filter(x => x.status === 'On Cart').length)) {
        return <ComponenteError/>
    }


	return (
		 <div id="test" className="col-md-12 panel-right row" style={{ paddingTop: '25px' }}>
        <div id="contOrderHistory" className="col-md-12 col-lg-12">
			<div className='ContainerStatus row' style={{position: "absolute", "margin-top": "-10px"}} >
				<label className='FilterTitle col-sm-5'>Filtrar:</label>
				<select id='selector' className='Select form-control col-sm-7' onChange={(e)=>handleSwitch(e)} name="select">
					<option value="Todas" selected>Todas</option>
					<option value="Creada">Creada</option> 
					<option value="Procesando">Procesando</option>
					<option value="Cancelada">Cancelada</option>
					<option value="Completa">Completa</option>
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
                        <th scope="col">N° Pago</th>
                        <th scope="col">Fecha Compra</th>
                        <th scope="col">Cancelar</th>
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
                                        <td><Link to={`/order/detail/${dato.id}`}>{dato.shipping}</Link></td>
                                        <td><Link to={`/order/detail/${dato.id}`}>{dato.status}</Link></td>
                                        <td><Link to={`/order/detail/${dato.id}`}>{dato.received === false ? 'No' : 'Si'}</Link></td>
                                        <td><Link to={`/order/detail/${dato.id}`}>{dato.paymentMethod}</Link></td>
                                        <td><Link to={`/order/detail/${dato.id}`}>{dato.paymentId}</Link></td>
                                        <td><Link to={`/order/detail/${dato.id}`}>{dateFormat(dato.buyDate)}</Link></td>
                                        {(dato.status === 'Procesando' || dato.status === 'Creada') && <td><button onClick={e => handleCancel(e , dato.id, dato.buyDate)} className="adam-chng">cancelar</button></td>}
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
            { ordersFiltered.length < 1 && <ComponenteError data={'ordenes'}/>}
		</div>
		</div>
		)
}

export default OrderHistory;