import React, { useState } from "react";
import "./Rating.css";


export default function StarRating ({bool, value}) {
    
const totalStars = 5
const [starsSelected, selectStar] = useState(0);
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
              onClick={() => selectStar(index + 1)}
            />
          ))}
          <p>
            {starsSelected} of {totalStars} stars
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
