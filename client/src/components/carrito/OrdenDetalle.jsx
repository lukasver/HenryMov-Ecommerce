
import React from 'react';
import {useDispatch, useSelector, useHistory} from 'react-redux';
import * as action from "../../redux/Action"
import './OrdenDetalle.css';

export default function OrdenDetalle() {

    const carrito = useSelector(store => store.carrito)
    const dispatch = useDispatch()
    
    return (
        <div>
            hola
        </div>
    )
}