import React, { useState } from 'react';
import Rating from './Rating'
import './Reviews.css'


//<i classNameName=" fas fa-snowboarding"  ></i>
{/* <label for="input-2" class="control-label">Rate This</label>
<input id="input-2" name="input-2" class="rating rating-loading" data-min="0" data-max="5" data-step="0.1"/> */}

export default function Reviews() {


    return (
        <div className='container'>
            <Rating />
           
        </div>
    )
}