import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../redux/Action'
import ProductCard from './ProductCard'
import LoadingBar from './LoadingBar.jsx'

// Este componente renderiza lo anteriormente filtrado por handleSelect en el componente nav
export default function Menu() {
    const products = useSelector(store => store.totalProdsFilter)

    // =======================================================
    //      PAGINACIÓN
    // =======================================================

    const [pageActual, setPageActual] = useState(1);
    const [prodsPorPage, setProdsPorPage] = useState(8);
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(products.length / prodsPorPage); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastPost = pageActual * prodsPorPage;
    const indexOfFirstPost = indexOfLastPost - prodsPorPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

    // =======================================================

    if (currentPosts.length === 0) {

        return (
            <LoadingBar done="80"/>
        )
    } else {
        return (
                <div className="container mb-4">
                    <div className="main row">
                        {
                            currentPosts.map(prod =>
                                <div className="card-group col-md-3">
                                    <ProductCard
                                        key={prod.id}
                                        id={prod.id}
                                        name={prod.name}
                                        description={prod.description}
                                        price={prod.price}
                                        image={prod.image}
                                        count={prod.count}
                                        stock={prod.stock}
                                    />
                                </div>)
                        }
                    </div>
                     {/* BOTONES DE PAGINACION */}
                    <nav className="mt-4">
                        <ul className="pagination d-flex justify-content-center">
                            {pageNumbers.map((numero, i) => (
                            <li key={i} className="page-item">
                             <a onClick={(e) => {e.preventDefault(); setPageActual(numero)}} href="#" className="page-link">{numero}</a>
                            </li>
                        ))}
                        </ul>
                    </nav>
                </div>
        )
    }
}
