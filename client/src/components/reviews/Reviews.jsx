import React, { useState,useEffect } from 'react';
import Rating from './Rating'
import './Reviews.css'
import * as Methods from '../../utils/reviews'
import LoadingBar from '../LoadingBar'
import starRating from './Rating'

//<i classNameName=" fas fa-snowboarding"  ></i>
{/* <label for="input-2" class="control-label">Rate This</label>
<input id="input-2" name="input-2" class="rating rating-loading" data-min="0" data-max="5" data-step="0.1"/> */}

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