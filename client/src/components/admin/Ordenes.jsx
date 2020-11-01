// ========================= IMPORTS =================================================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Ordenes.css';
import { dateFormat } from '../../utils/utils.js';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ComponenteError from '../ComponenteError';


// ========================= COMPONENT =================================================

export default function Ordenes({ getOrders }) {

    // =======================================================
    //      PROTECCION LOGIN FRONT
    // =======================================================
    const pase = localStorage.getItem('role');
    const history = useHistory();
      if (pase !== 'Admin' && pase !== 'Responsable') {
        history.push('/login')
      }
    // =======================================================

    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState([]);
    const [bool, setBool] = useState(false);
    // =======================================================
    //      PAGINACIÓN
    // =======================================================

    const [pageActual, setPageActual] = useState(1);
    const [prodsPorPage] = useState(10);

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(filter.length / prodsPorPage); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastPost = pageActual * prodsPorPage;
    const indexOfFirstPost = indexOfLastPost - prodsPorPage;
    const currentPosts = filter.slice(indexOfFirstPost, indexOfLastPost);

    // =======================================================

    useEffect(() => {
        getOrders()
        .then(a => {
            setOrders(a)
            setFilter(a)
        })
    }, [bool]);


    // =======================================================
    //      HANDLERS
    // =======================================================

    const handleCancel = async (e,id) => {
        const cancel = await axios.put(`http://localhost:3001/orders/cancel/${id}`)
        setBool(!bool)
        cancel.status === 200 ? window.alert('Orden cancelada con éxito') : window.alert('Ocurrió un error...')
        return
    }

    const handleStatus = async (e,id) => {
        const statusNew = await axios.put(`http://localhost:3001/orders/status/${id}`,{status: e.target.name})
        setBool(!bool)
        console.log(statusNew)
        return
    } 

    const handleFilter = (e)=>{
        const {value} = e.target 
        e.preventDefault()
        if(value === 'Todas') {
            setFilter(orders)
        }
        else{
            setFilter(orders.filter(order => order.status === value ))
        }
    }
    return (
        <div className="col-md-10 panel-right row" style={{ paddingTop: '25px' }}>
            <div className="col-md-12 col-lg-12">
                <h2 className="titleOrders">Todas las Ordenes</h2>
                <p />
                <div className='selectContainer'>
                    <h5 className='selectH5'>Filtrar por: </h5>
                    <select onChange={handleFilter} className='selectOrder form-control' name="" id="">
                        <option value="Todas" selected>Todas</option>
                        <option value="Creada">Creadas</option>
                        <option value="Procesando">Procesando</option>
                        <option value="Enviada">Enviada</option>
                        <option value="Cancelada">Canceladas</option>
                        <option value="Completa">Completas</option>
                    </select>
                </div>
                <table className="table table-hover table-dark thfontsize">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Envío</th>
                            <th scope="col">Status</th>
                            <th scope="col">Recibido</th>
                            <th scope="col">Metodo de Pago</th>
                            <th scope="col">F. Compra</th>
                            <th scope="col">Id Usuario</th>
                            <th scope="col">Email</th>
                            <th scope="col">Cambiar Status a:</th>
                            <th scope="col">Cancelar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentPosts.length > 0 && currentPosts.map(dato => {
                                if (dato.status !== 'On Cart') {
                                    return (
                                        <tr key={dato.id} >
                                            <td><Link to={`/order/detail/${dato.id}`}>{dato.id}</Link></td>
                                            <td><Link to={`/order/detail/${dato.id}`}>{dato.shipping}</Link></td>
                                            <td><Link to={`/order/detail/${dato.id}`}>{dato.status}</Link></td>
                                            <td><Link to={`/order/detail/${dato.id}`}>{dato.received}</Link></td>
                                            <td><Link to={`/order/detail/${dato.id}`}>{dato.paymentMethod}</Link></td>
                                            <td><Link to={`/order/detail/${dato.id}`}>{dateFormat(dato.buyDate)}</Link></td>
                                            <td><Link to={`/profile/${dato.userId}`}>{dato.userId}</Link></td>
                                            <td><Link to={`/profile/${dato.userId}`}>{dato.user.email}</Link></td>
                                            <td>
                                            {dato.status === 'Creada' && <button name='Procesando' onClick={(e) => handleStatus(e, dato.id)} className='adam-chng'>Procesando</button>}
                                            {(dato.status === 'Procesando') && <div><button name='Creada' onClick={(e) => handleStatus(e, dato.id)} className='adam-chng mr-1'>Creada</button><button name="Enviada" onClick={(e) => handleStatus(e, dato.id)} className='adam-chng ml-1'>Enviada</button></div>}
                                            {(dato.status === 'Enviada') && <div><button name='Procesando' onClick={(e) => handleStatus(e, dato.id)} className='adam-chng mr-1'>Procesando</button><button name="Completa" onClick={(e) => handleStatus(e, dato.id)} className='adam-chng ml-1'>Completa</button></div>}
                                            {dato.status === 'Completa' && <button name='Procesando' onClick={(e) => (window.confirm('Esta orden ya ha sido completada, seguro quieres volverla a el status anterior?') &&handleStatus(e, dato.id))} className='adam-chng'>Procesando</button>} 
                                            </td>
                                            <td>{dato.status !== 'Cancelada' && <button onClick={(e) => (window.confirm('Seguro desea cancelar esta orden? El cliente será notificado con un e-mail') && handleCancel(e, dato.id))} className='adam-chng'>x</button>}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
                {/* BOTONES DE PAGINACION */}
                <nav>
                    <ul className="pagination d-flex justify-content-center">
                        {pageNumbers.map((numero, i) => (
                            <li key={i} className="page-item">
                                <a onClick={(e) => { e.preventDefault(); setPageActual(numero) }} href="#" className="page-link">{numero}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            {!currentPosts.length && <ComponenteError data='ordenes'/>}
        </div>
    )
}