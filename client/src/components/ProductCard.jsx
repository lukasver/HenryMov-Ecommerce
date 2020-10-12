import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard(props) {
  const { name, image, price, description, id } = props;

  return (
    <div className="card">
      <Link className="titulo-link" to={`/products/${id}`}>
        <img className="card-img" src={image} alt="imagen producto" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">{`$ ${price}`}</p>
        </div>
      </Link>
    </div>
  )
}
