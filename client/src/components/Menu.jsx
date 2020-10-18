import React from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../redux/Action'
import ProductCard from './ProductCard'

export default function Menu(){
    const products = useSelector(store => store.totalProdsFilter)

    // useEffect(()=>{
        
    // },[products])

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
