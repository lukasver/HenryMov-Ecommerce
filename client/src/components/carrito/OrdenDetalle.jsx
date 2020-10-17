
import React from 'react';
import { useDispatch, useSelector, useHistory } from 'react-redux';
import './OrdenDetalle.css';

export default function OrdenDetalle() {

    const [order, setOrder] = useState([])

    useEffect(() => {
        getOrders().then(a => setOrders(a))
    }, [])

    return (
        <div className="container">
            <div className="content-order">
                <h2>Orden de compra</h2>
                <h3>Datos Personales</h3>
                <br />
                <div className="main row">
                    <div className="datos-personales col-md-6">
                        <ul className="list-group ul-detalle">
                            <li className="list-group-item list-order" style={{ paddingTop: '15px' }}>Nombre:</li>
                            <li className="list-group-item list-order">Apellido:</li>
                            <li className="list-group-item list-order list-order-bottom" style={{ paddingBottom: '15px' }}>Id Usuario:</li>
                        </ul>
                    </div>
                    <div className="datos-personales col-md-6">
                        <ul className="list-group ul-detalle">
                            <li className="list-group-item list-order" style={{ paddingTop: '15px' }}>E-mail:</li>
                            <li className="list-group-item list-order">Fecha de Compra:</li>
                            <li className="list-group-item list-order list-order-bottom" style={{ paddingBottom: '15px', }}>N° de Orden:</li>
                        </ul>
                    </div>
                </div>
                <br /><br />
                <table class="table table-hover">
                    <thead>
                        <tr className="list-order-top">
                            <th scope="col">Id</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio Unitario</th>
                            <th scope="col">Precio Total</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            order.length > 0 && order.map(dato => {
                                return (
                                    <tr className="hover-list">
                                        <th scope="row">{order.id}</th>
                                        <td>{order.id}</td>
                                        <td>{order.id}</td>
                                        <td>{order.id}</td>
                                        <td>{order.id}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="hover-list">
                            <td colspan="3"></td>
                            <td className="total-order" colspan="3">TOTAL: </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}