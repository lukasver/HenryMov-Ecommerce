import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

//============= ( RECORDAR AGREGAR PARAMETRO PUNTUACION )============
export default function ProductCard(props) {
  return (
    <div className="container">
      <div className="main row">
        {
          props.products.map(producto => {
            return (
              <div className="card-group  col-md-3">
                <div className="card">
                  <img className="card-img-top" src={producto.image} alt="imagen producto" />
                  <div className="card-body">
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text">{producto.description}</p>
                    <p className="card-text">{`$ ${producto.price}`}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>

  )
}
