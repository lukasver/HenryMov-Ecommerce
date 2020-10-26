import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../redux/Action'
import ProductCard from './ProductCard'
import LoadingBar from './LoadingBar.jsx'
import Carousel from './Carousel'
import { useHistory } from "react-router-dom";

// Este componente renderiza lo anteriormente filtrado por handleSelect en el componente nav
export default function Menu() {
    const products = useSelector(store => store.totalProdsFilter)
    const [reload, setReload] = useState(false)
    const history = useHistory()

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

    useEffect(()=>{

    },[reload])

    if (currentPosts.length === 0) {

        return (
            <div>
            <LoadingBar done="75"/> {/*// El carousel queda bastante feo al mostrarlo por medio segundo en el UX*/}
            {reload && history.push('/')}
            </div>
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
