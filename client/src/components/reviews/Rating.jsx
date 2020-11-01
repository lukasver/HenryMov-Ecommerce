import React from "react";
import "./Rating.css";
import * as action from '../../redux/Action'
import { useSelector, useDispatch } from "react-redux";

export default function StarRating ({bool, value}) {

// Este componente simplemente se encarga de mostrar las estrellas, de esta forma parseo el valor 
// de la reseña en estrellas

const totalStars = 5
// const [starsSelected, selectStar] = useState(0);
const starsSelected = useSelector(store => store.starsSelected)
const dispatch = useDispatch()

     const Star = ({ selected = false, onClick = f => f }) => (
        <div className={selected ? "star selected" : "star"} onClick={onClick} />
        );
  
    if(bool){
      return (
        <div className="star-rating">
          {[...Array(totalStars)].map((n, index) => (
            <Star
              key={index}
              selected={index < starsSelected}
              onClick={() => dispatch(action.selectStar(index + 1))}
            />
          ))}
          <p>
            {starsSelected} de {totalStars} estrellas
          </p>
        </div>
    )
  } else{
        return (
          <div className="star-rating">
            {[...Array(totalStars)].map((n, index) => (
              <Star
                key={index}
                selected={index < value}
              />
            ))}
          </div>
      )

  }  
}
