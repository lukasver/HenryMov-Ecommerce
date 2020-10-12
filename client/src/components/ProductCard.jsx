import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard(props) {
  const { name, image, price, description, id } = props;

  return (
    <div className="card">
      <img className="card-img-top" src={image} alt="imagen producto" />
      <div className="card-body">
        <Link className="titulo-link" to={`/products/${id}`}>
          <h5 className="card-title">{name}</h5>
        </Link>
        <Link className="titulo-link" to={`/product/put/${id}`}>
        </Link>
        <p className="card-text">{description}</p>
        <p className="card-text">{`$ ${price}`}</p>
      </div>
    </div>
  )
}
