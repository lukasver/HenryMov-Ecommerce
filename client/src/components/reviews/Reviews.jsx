import React, { useState,useEffect } from 'react';
import Rating from './Rating'
import './Reviews.css'
import * as Methods from '../../utils/reviews'
import LoadingBar from '../LoadingBar'
import starRating from './Rating'
import Product from '../Product';
import { useSelector, useDispatch } from "react-redux";
// En resumen lo que hago es crear 2 estados locales (ya que solamente se usaran es este componente) en donde 
// seteo el array de todas las reseñas que obtengo de la base de datos (esto lo hago cuando se monta el componente 
// a travez de Methods.getReviewsProd dentro del useEffect) lo que recibo es un objeto con todas las reseñas y con el promedio
// de los valores de dichas reseñas. Finalmente condiciono el render para que me muestre en todas las reseñas el array de reseñas
// y debajo del titulo del producto el promedio de reseñas (Es decir, llamo 2 veces al componente Reviews en el componente Product)
export default function Reviews({id, value, name}) {
    const [allReviews, setAllReviews] = useState([])
    const [prom, setProm] = useState(0)    
    const starsSelected = useSelector(store => store.starsSelected)

    useEffect(()=>{
        Methods.getReviewsProd(id)
        .then(recurso =>{
            if (!recurso) {
                setAllReviews([]);
                setProm(0)
            }
            else{
                setAllReviews(recurso.products)
                setProm(recurso.promedio)
            }
        })
    },[])

    function handlePost(e){
        e.preventDefault()
        //==================================================================== 
        
        //Validar la sesion de usuario y enviar el id en la variable usuarioId 

        //==================================================================== 

        let usuarioId = 2;
        let title = document.getElementById('title').value;
        let description = document.getElementById('Desc').value;
        let value = starsSelected;
        Methods.addReviews(parseInt(id),
        {
            usuarioId,
            title,
            description,
            value
        })
    }


    if (value === 'reviews'){
        if (allReviews.length){
            return ( <div>

                        <form onSubmit={handlePost} id="formReviews" action="">
                            <h3>Escribe tu reseña</h3>
                            <p>Deja tu calificación</p>
                            <Rating bool={true} />
                            <input id="title" className='inpTitle' placeholder="Escribe un titulo" type="text"/>
                            <textarea id="Desc" placeholder="Escribe una descripción" class="form-control"  rows="4"></textarea>
                            <button id='submitRev' type='submit'>Enviar Reseña</button>
                        </form>
            
                    <div className='reviewsContainer'>
                        <div className='reviewContainer'>

                            <h3>Opiniones sobre {name}</h3>
                            </div>
                                {allReviews.map(review => (
                                <div className='reviewContainer'>
                                    <Rating bool={false} value={review.value} />
                                    <p className='Title'>{review.title}</p>
                                    <p className='Desc' >{review.description}</p>
                                </div>
                                ))}
                        </div>
                </div>
            )
        }
        else {
            return (
                <div className='reviewsContainer'>
                    <h5>No hay opiniones</h5>
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