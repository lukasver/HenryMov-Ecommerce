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
    const [productExist, setProductExsits] = useState(false)
    const starsSelected = useSelector(store => store.starsSelected)
    let usuarioId = localStorage.getItem('id');
    
    useEffect(()=>{
        Methods.getReviewsProd(id)
        .then(recurso =>{
            if (!recurso) {
                setAllReviews([]);
                setProm(0)
            }
            else{
                // seteo y ordeno todas las reviews de ese producto
                setAllReviews(recurso.reviews.sort((a, b) => b.value - a.value))
                setProm(recurso.promedio)
            }
        });
        // recibe el id de usuario
        Methods.getProductExists(usuarioId,id).then(response=>setProductExsits(response))

    },[])

    function handlePost(e){
        let title = document.getElementById('title').value;
        let description = document.getElementById('Desc').value;
        let value = starsSelected;
        console.log(allReviews)
        if (title && description && value) {
            Methods.addReviews(parseInt(id),
            {
                usuarioId,
                title,
                description,
                value
            })
        } 
    }

    function form(){
        if (!(allReviews.find(review => review.usuarioId === usuarioId))){
            if (usuarioId && productExist){
                return (
                    <form onSubmit={handlePost} id="formReviews" action="">
                        <h3 className='hello'>Escribe tu reseña</h3>
                        <p>Deja tu calificación</p>
                        <Rating bool={true} />
                        <input id="title" className='inpTitle' placeholder="Escribe un titulo" type="text"/>
                        <textarea id="Desc" placeholder="Escribe una descripción" className="form-control"  rows="4"></textarea>
                        <button id='submitRev' type='submit'>Enviar Reseña</button>
                    </form>
                )
            } 
            else {
                return (
                    <div>
    
                    </div>
                )
            }
        }
        else {
            return (
                <div className='divFormRes' >
                    <h4 className='h4Form hello'>Ya dejaste tu reseña!</h4>
                </div>
            )
        }
    }

    if (value === 'reviews'){
        if (allReviews.length){
            
            return (
                    <div>
                        {form()}
                        <div className='reviewsContainer'>
                            <h3 className='hello'>Opiniones sobre {name}</h3>
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
                <div>
                    {form()}
                    <div className='reviewsContainer'>
                        <h5 className='hello'>No hay opiniones</h5>
                    </div>
                </div>
            )
        }
    }
    if (value === 'prom'){
        return (
            <div className='RatingSpan'>
               <Rating bool={false} value={prom} /> <p className='reviewsSpan'>{allReviews.length} opiniones</p>
            </div>
        )
    }
}