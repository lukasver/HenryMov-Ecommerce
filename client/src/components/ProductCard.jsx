import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

//============= ( RECORDAR AGREGAR PARAMETRO PUNTUACION )============
export default function ProductCard({ name, image, price, description, id }) {

    return (
        <div className="card-group">
            <Link to={`/products/${id}`}>
              <div className="card">
                <img className="card-img-top" src={image} alt="imagen producto"/>
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{description}</p>
                  <p className="card-text">{price}</p>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
             </div>
            </Link>
        </div>
    )
}
