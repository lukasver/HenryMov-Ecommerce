// ========================= IMPORTS =================================================
import React, { useEffect, useState } from 'react'
import './Usuarios.css'

// ========================= COMPONENT ===============================================

export default function Usuarios({getUsers}) {

    const [users, setUsers] = useState([])

    useEffect(()=>{
        getUsers().then(a=> setUsers(a))
    },[])

    return (
        <div className="col-md-10 panel-right row" style={{ paddingTop: '25px' }}>
            <div className="col-md-13 col-lg-13">
                <h2 className="titleUsers">Todos los Usuarios</h2>
                <p/>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">name</th>
                            <th scope="col">lastname</th>
                            <th scope="col">email</th>
                            <th scope="col">address</th>
                            <th scope="col">phone</th>
                            <th scope="col">birthdate</th>
                            <th scope="col">role</th>
                            <th scope="col">creationDate</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            users.length > 0 && users.map(dato => {
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
            </div>
        </div>
    )
}





