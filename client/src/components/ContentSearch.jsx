import React from 'react';
import ProductCard from './ProductCard.jsx';
import './ContentSearch.css';
import loading from '../img/loading.gif';

function ContentSearch(props) {
    if (props.listado === null) {
        return <img className="rounded mx-auto d-block" src={loading} />
    } else {
        return (
            <div className="container">
                <div className="main row">
                    {
                        props.products.map(prod =>
                            <div className="card-group col-md-3">
                                <ProductCard
                                    key={prod.id}
                                    id={prod.id}
                                    name={prod.name}
                                    description={prod.description}
                                    price={prod.price}
                                    image={prod.image}
                                />
                            </div>)
                    }
                </div>
            </div>
        )
    }
}

export default ContentSearch;