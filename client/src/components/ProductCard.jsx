import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'

//============= ( RECORDAR AGREGAR PARAMETRO PUNTUACION )============
export default function ProductCard(props) {
    const p = {
        name: 'Longboard Sector 9 Lacey C/detalles Exhibicion',
        price: '$2000',
        image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg',
        description: 'Tablas con detalles ESTÉTICOS con hasta 50% de descuento. '
    }

    return (
        <div>
            <div className="card">
                <div className="thumbnail"><img className="left" src={p.image} /></div>
                <div className="right">
                    <h1>{p.name}</h1>
                    <div className="author">
                        <h2>No electrico</h2>
                        <h2>4 ruedas</h2>
                    </div>
                    <div className="author">
                    </div>
                    <div className="separator"></div>
                    <p>{p.description}</p>
                </div>
                <h5>{p.price}</h5>
             
                <div className="fab"><i className="fa fa-arrow-down fa-3x"> </i></div>
            </div>

            {/* <div classNameName="card mb-3">
                    <div classNameName="row no-gutters">
                        <div classNameName="col-md-4">
                        <Link to={`/`}>
                            <img src={p.image} classNameName="card-img" alt="..." />
                        </Link>
                        </div>
                        <div classNameName="col-md-8">
                            <div classNameName="card-body">
                            <Link to={`/`}>
                                <h4 classNameName="title">{p.name}</h4>
                            </Link>
                                <p classNameName="card-text">{p.description}</p>
                                <p classNameName="card-text"><small classNameName="text-muted">{p.price}</small></p>
                            </div>
                        </div>
                    </div>
                </div> */}
            {/* <div div classNameNameName="row row-cols-1 row-cols-md-2">
                    <div classNameNameName="col mb-4">
                        <div classNameNameName="card">
                            <img src={p.image} classNameNameName="card-img-top" alt="..." />
                            <div classNameNameName="card-body">
                                <h5 classNameNameName="card-title">{p.name}</h5>
                                <p classNameNameName="card-text">{p.description}</p>
                                <p classNameNameName="card-text">{p.price}</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            {/* <div classNameNameName="media">
                    <div classNameNameName="media-body">
                        <h5 classNameNameName="mt-0 mb-1">{name}</h5>
                        <p classNameNameName="card-text">{description}</p>
                        <p classNameNameName="card-text">{price}</p>
                    </div>
                    <img src={image} classNameNameName="ml-3" alt="..." />
                </div> */}


        </div >
    )
}