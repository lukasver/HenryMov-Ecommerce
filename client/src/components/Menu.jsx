import React from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../redux/Action'
import ProductCard from './ProductCard'
import LoadingBar from './LoadingBar.jsx'

// Este componente renderiza lo anteriormente filtrado por handleSelect en el componente nav
export default function Menu(){
    const products = useSelector(store => store.totalProdsFilter)

    // useEffect(()=>{
        
    // },[products])
    if (products.length === 0) {
        return (
            <LoadingBar done="80"/>
        )
    } else {
        return (
                <div className="container mb-4">
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
