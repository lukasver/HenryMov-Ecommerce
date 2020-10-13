import React from 'react';
import ProductCard from './ProductCard.jsx';
import './ContentSearch.css';


function ContentSearch(props) {

    if (props.products.length === 0) {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container-not-found">
                    <h2 className="display-4">Producto no encontrado</h2>
                    <p className="lead">Vuelva a intentar con otra consulta.</p>
                    <img src="https://media0.giphy.com/media/NPKysZyYTbSY8/giphy.gif" alt="Goofy Skeyng"/>
                </div>
            </div>
        )
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