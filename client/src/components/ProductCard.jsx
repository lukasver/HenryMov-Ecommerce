import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

//============= ( RECORDAR AGREGAR PARAMETRO PUNTUACION )============
export default function ProductCard(props) {
  const { name, image, price, description, id } = props;

  return (
    <div className="container">
      <div className="main row">
              <div className="card-group  col-md-9">
                <div className="card">
                  <img className="card-img-top" src={image} alt="imagen producto" />
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">{`$ ${price}`}</p>
                  </div>
                </div>
              </div>
      </div>
    </div>

  )
}
