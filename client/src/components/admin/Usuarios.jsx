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





