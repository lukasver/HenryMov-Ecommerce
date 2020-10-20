// ========================= IMPORTS =================================================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Ordenes.css';
import { dateFormat } from '../../utils/utils.js';

// ========================= COMPONENT =================================================

export default function Ordenes({ getOrders }) {

    const [orders, setOrders] = useState([])

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
    }, []);    

    return (
        <div className="col-md-10 panel-right row" style={{ paddingTop: '25px' }}>
            <div className="col-md-11 col-lg-11">
                <h2 className="titleOrders">Todas las Ordenes</h2>
                <p />
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">shipping</th>
                            <th scope="col">status</th>
                            <th scope="col">received</th>
                            <th scope="col">paymentMethod</th>
                            <th scope="col">buyDate</th>
                            <th scope="col">userId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentPosts.length > 0 && currentPosts.map(dato => {
                                if (dato.status !== 'On Cart') {
                                    return (
                                        <tr key={dato.id} >
                                            <td><Link to={`/order/${dato.id}`}>{dato.id}</Link></td>
                                            <td><Link to={`/order/${dato.id}`}>{dato.shipping.toString()}</Link></td>
                                            <td><Link to={`/order/${dato.id}`}>{dato.status}</Link></td>
                                            <td><Link to={`/order/${dato.id}`}>{dato.received.toString()}</Link></td>
                                            <td><Link to={`/order/${dato.id}`}>{dato.paymentMethod.toString()}</Link></td>
                                            <td><Link to={`/order/${dato.id}`}>{dateFormat(dato.buyDate)}</Link></td>
                                            <td><Link to={`/order/${dato.id}`}>{dato.userId}</Link></td>
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