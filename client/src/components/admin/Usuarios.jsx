// ========================= IMPORTS =================================================
import React, { useEffect, useState } from 'react'
import './Usuarios.css'

// ========================= COMPONENT ===============================================

export default function Usuarios({getUsers}) {

    const [users, setUsers] = useState([])

    // =======================================================
    //      PAGINACIÓN
    // =======================================================

    const [pageActual, setPageActual] = useState(1);
    const [prodsPorPage, setProdsPorPage] = useState(10);

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(users.length / prodsPorPage); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastPost = pageActual * prodsPorPage;
    const indexOfFirstPost = indexOfLastPost - prodsPorPage;
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

    // =======================================================

    useEffect(()=>{
        getUsers().then(a=> setUsers(a))
    },[users])

    return (
        <div className="col-md-10 panel-right row" style={{ paddingTop: '25px' }}>
            <div className="col-md-13 col-lg-13">
                <h2 className="titleUsers">Todos los Usuarios</h2>
                <p/>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Birthdate</th>
                            <th scope="col">Role</th>
                            <th scope="col">Creation date</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            currentPosts.length > 0 && currentPosts.map(dato => {
                                return (
                                    <tr key={dato.id} >
                                    <td>{dato.id}</td>
                                    <td>{dato.name}</td>
                                    <td>{dato.lastname}</td>
                                    <td>{dato.email}</td>
                                    <td>{dato.address}</td>
                                    <td>{dato.phone}</td>
                                    <td>{dato.birthdate}</td>
                                    <td>{dato.role}</td>
                                    <td>{dato.creationdate.toString()}</td>
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





