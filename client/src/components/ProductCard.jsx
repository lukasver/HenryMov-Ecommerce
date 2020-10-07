import React from 'react';
import { Link } from 'react-router-dom';

//============= ( RECORDAR AGREGAR PARAMETRO PUNTUACION )============
export function ProductCard({ name, price, image}){
    return (
        <div>
            <Link to={`/product/${id}`}>
                <div>
                <h3>{name}</h3>
                </div>
                <div>
                <img>{image}</img>
                <h4>{price}</h4>
                </div>
            </Link>
        </div>
    )
}