import React from 'react';
import { Link } from 'react-router-dom';
import './Panel.css';

export default function MenuAdmin() {

    return (
        <div className="col-md-2 panel-left">
            <ul className="list-group ul-dark">
                <li className="list-group-item">
                    <i className="fas fa-snowboarding"></i>
                    <h4>Henry-Mov</h4>
                    <h5>Admin</h5>
                </li>
                <li className="list-group-item">
                    <Link className="link-admin" to={'/admin/productos'}><h6>Productos</h6></Link>
                </li>
                <li className="list-group-item">
                    <h6>Categorias</h6>
                </li>
                <li className="list-group-item">
                    <h6>Usuarios</h6>
                </li>
            </ul>
        </div>
    )
}