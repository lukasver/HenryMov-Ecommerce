import React from 'react';
import { Link } from 'react-router-dom';

//============= ( RECORDAR AGREGAR PARAMETRO PUNTUACION )============
export default function ProductCard({ name, image, price, description }) {

    return (
        <div>
            <Link to={`/`}>
                <div div className="row row-cols-1 row-cols-md-2">
                    <div className="col mb-4">
                        <div className="card">
                            <img src={image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{name}</h5>
                                <p className="card-text">{description}</p>
                                <p className="card-text">{price}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="media">
                    <div className="media-body">
                        <h5 className="mt-0 mb-1">{name}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">{price}</p>
                    </div>
                    <img src={image} className="ml-3" alt="..." />
                </div> */}

            </Link>

        </div>
    )
}