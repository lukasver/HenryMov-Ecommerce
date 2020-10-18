// ========================= IMPORTS =================================================
import React, { useEffect, useState } from 'react'
import './Ordenes.css'

// ========================= COMPONENT =================================================

export default function Ordenes({ getOrders }){
    
    const [orders, setOrders] = useState([])

    // =======================================================
    //      PAGINACIÓN
    // =======================================================

    const [pageActual, setPageActual] = useState(1);
    const [prodsPorPage, setProdsPorPage] = useState(10);

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(orders.length / prodsPorPage); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastPost = pageActual * prodsPorPage;
    const indexOfFirstPost = indexOfLastPost - prodsPorPage;
    const currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);

    // =======================================================

    useEffect(()=>{
        getOrders().then(a=> setOrders(a))
    },[])

    return (
        <div className="col-md-10 panel-right row" style={{ paddingTop: '25px' }}>
            <div className="col-md-11 col-lg-11">
                <h2 className="titleOrders">Todas las Ordenes</h2>
                <p/>
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
                                return (
                                    <tr key={dato.id} >
                                    <td>{dato.id}</td>
                                    <td>{dato.shipping.toString()}</td>
                                    <td>{dato.status}</td>
                                    <td>{dato.received.toString()}</td>
                                    <td>{dato.paymentMethod.toString()}</td>
                                    <td>{dato.buyDate}</td>
                                    <td>{dato.userId}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                 {/* BOTONES DE PAGINACION */}
                <nav>
                    <ul className="pagination d-flex justify-content-center">
                        {pageNumbers.map((numero, i) => (
                        <li key={i} className="page-item">
                         <a onClick={(e) => {e.preventDefault(); setPageActual(numero)}} href="#" className="page-link">{numero}</a>
                        </li>
                    ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}