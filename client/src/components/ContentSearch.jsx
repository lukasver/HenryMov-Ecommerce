import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './ContentSearch.css';

function ContentSearch() {
    const products = useSelector(store => store.products)

    const [randomDes, setRandomDes] = useState([]);

    useEffect(() => {
        let arrayDes = [];
        let value;
        axios.get("http://localhost:3001/products")
            .then((products) => {
                for (let i = 0; i < 4; i++) {
                    value = Math.floor(Math.random() * products.data.length);
                    arrayDes.push(products.data[value]);
                    products.data.splice(value, 1);
                }
                setRandomDes(arrayDes)
            })
            .catch((err) => new Error(err));
    }, [products])

    if (products.length === 0) {
        return (
            <div className="container">
                <div className="main row">
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container-not-found">
                            <h2 className="display-4 text-primary">Producto no encontrado</h2>
                            <h3 className="display-5">Te puede interesar:</h3>
                            <div className="main row">
                                {randomDes.map(prod =>
                                    <div className="card-group col-md-3">
                                        <ProductCard
                                            key={prod.id}
                                            id={prod.id}
                                            name={prod.name}
                                            description={prod.description}
                                            price={prod.price}
                                            image={prod.image}
                                        />
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    } else {
        return (
            <div className="container">
                <div className="main row">
                    {
                        products.map(prod =>
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