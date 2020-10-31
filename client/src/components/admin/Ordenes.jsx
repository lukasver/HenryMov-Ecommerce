// ========================= IMPORTS =================================================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Ordenes.css';
import { dateFormat } from '../../utils/utils.js';
import { useHistory } from "react-router-dom";
import axios from 'axios';


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
    const [bool, setBool] = useState(false);

    // =======================================================
    //      PAGINACIÓN
    // =======================================================

    const [pageActual, setPageActual] = useState(1);
    const [prodsPorPage] = useState(10);

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(orders.length / prodsPorPage); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastPost = pageActual * prodsPorPage;
    const indexOfFirstPost = indexOfLastPost - prodsPorPage;
    const currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);

    // =======================================================

    useEffect(() => {
        getOrders().then(a => setOrders(a))
    }, [bool]);


    // =======================================================
    //      HANDLERS
    // =======================================================

    const handleCancel = async (e,id) => {
        const cancel = await axios.put(`http://localhost:3001/orders/cancel/${id}`)
        setBool(!bool)
        cancel.status === 200 ? window.alert(cancel.data) : window.alert('Ocurrió un error...')
        return
    }

    const handleStatus = async (e,id) => {
        const statusNew = await axios.put(`http://localhost:3001/orders/status/${id}`,{status: e.target.name})
        setBool(!bool)
        console.log(statusNew)
        return
    } 

    return (
        <div className="col-md-10 panel-right row" style={{ paddingTop: '25px' }}>
            <div className="col-md-12 col-lg-12">
                <h2 className="titleOrders">Todas las Ordenes</h2>
                <p />
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
                                            <td><Link to={`/order/detail/${dato.id}`}>{dato.shipping.toString()}</Link></td>
                                            <td><Link to={`/order/detail/${dato.id}`}>{dato.status}</Link></td>
                                            <td><Link to={`/order/detail/${dato.id}`}>{dato.received.toString()}</Link></td>
                                            <td><Link to={`/order/detail/${dato.id}`}>{dato.paymentMethod.toString()}</Link></td>
                                            <td><Link to={`/order/detail/${dato.id}`}>{dateFormat(dato.buyDate)}</Link></td>
                                            <td><Link to={`/order/detail/${dato.id}`}>{dato.userId}</Link></td>
                                            <td><Link to={`/order/detail/${dato.id}`}>{dato.user.email}</Link></td>
                                            <td>
                                            {dato.status === 'Creada' && <button name='Procesando' onClick={(e) => handleStatus(e, dato.id)} className='adam-chng'>Procesando</button>}
                                            {(dato.status === 'Procesando') && <div><button name='Creada' onClick={(e) => handleStatus(e, dato.id)} className='adam-chng mr-1'>Creada</button><button name="Completa" onClick={(e) => handleStatus(e, dato.id)} className='adam-chng ml-1'>Completa</button></div>}
                                            {dato.status === 'Completa' && <button name='Procesando' onClick={(e) => (window.confirm('Esta orden ya ha sido completada, seguro quieres volverla a el status anterior?') &&handleStatus(e, dato.id))} className='adam-chng'>Procesando</button>} 
                                            </td>
                                            <td>{dato.status !== 'Cancelada' && <button onClick={(e) => handleCancel(e, dato.id)} className='adam-chng'>x</button>}</td>
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
        </div>
    )
}