import React, { useState } from 'react';
import slider1 from '../img/slider1.jpg';
import slider2 from '../img/slider2.jpg';
import slider3 from '../img/slider3.jpg';
import './Slider.css';

export default function Slider() {

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src={slider1} alt="First slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <h1 className="tituloSlider">Plantillas Footprint</h1>
                        <button className="btn btn-dark">Ver más</button>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={slider2} alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={slider3} alt="Third slide" />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
}
