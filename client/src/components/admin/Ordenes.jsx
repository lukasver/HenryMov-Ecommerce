// ========================= IMPORTS =================================================
import React, { useEffect, useState } from 'react'
// console.log(Orders())

export default function Ordenes({ getOrders }){
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        getOrders().then(a=> setOrders(a))
    },[])

    // getOrders().then(a => console.log(a))
   
    return (
        <div className="col-md-10 panel-right row" style={{ paddingTop: '25px' }}>
            <div className="col-md-11 col-lg-11">
                <h2>Todas las Categorias</h2>
                <p>Elija la categoria a modificar</p>
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
                            orders.length > 0 && orders.map(dato => {
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
            </div>
        </div>
    )
}