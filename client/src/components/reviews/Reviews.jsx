import React, { useState,useEffect } from 'react';
import Rating from './Rating'
import './Reviews.css'
import * as Methods from '../../utils/reviews'
import LoadingBar from '../LoadingBar'
import starRating from './Rating'
import Product from '../Product';

// En resumen lo que hago es crear 2 estados locales (ya que solamente se usaran es este componente) en donde 
// seteo el array de todas las reseñas que obtengo de la base de datos (esto lo hago cuando se monta el componente 
// a travez de Methods.getReviewsProd dentro del useEffect) lo que recibo es un objeto con todas las reseñas y con el promedio
// de los valores de dichas reseñas. Finalmente condiciono el render para que me muestre en todas las reseñas el array de reseñas
// y debajo del titulo del producto el promedio de reseñas (Es decir, llamo 2 veces al componente Reviews en el componente Product)
export default function Reviews({id, value}) {
    const [allReviews, setAllReviews] = useState([])
    const [prom, setProm] = useState(0)

    useEffect(()=>{
        Methods.getReviewsProd(id)
        .then(recurso =>{
            setAllReviews(recurso.products)
            setProm(recurso.promedio)
        })
    },[])

    if (value === 'reviews'){
        if (typeof allReviews !== 'object'){
            return (
                <div className='reviewsContainer'>
                    <h5>No hay opiniones</h5>
                </div>
            )
        }
        
        else{
            return (
                <div className='reviewsContainer'>
                    {allReviews.map(review => (
                    <div className='reviewContainer'>
                        <Rating bool={false} value={review.value} />
                        <h2>{review.title}</h2>
                        <p>{review.description}</p>
                    </div>
                    ))}
                </div>
            )
        }
    }
    if (value === 'prom'){
        return (
            <div className=''>
               <Rating bool={false} value={prom} />
            </div>
        )
    }
}