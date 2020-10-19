import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard'

// Este componente renderiza lo anteriormente filtrado por handleSelect en el componente nav
export default function Menu() {
    const products = useSelector(store => store.totalProdsFilter)

    if (products.length === 0) {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container-not-found">
                    <h2 className="display-4 text-primary">Producto no encontrado</h2>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="main row">
                    {
                        products.map(prod =>
                            <div className="card-group col-md-3" key={prod.id}>
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
