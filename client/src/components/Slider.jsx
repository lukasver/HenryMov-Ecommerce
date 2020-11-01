import React from 'react';
import './Slider.css';

export default function Slider() {

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
{/*                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>*/}
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100 img-fluid" height="auto" width="100%"  src="https://cdn.newsapi.com.au/image/v1/4696b23c07ea1ebe8ba5a64eead85ba7" alt="First slide" />
                    <div className="carousel-caption d-none d-md-block">
                      {/*  <h1 className="tituloSlider">Plantillas Footprint</h1>*/}
{/*                      https://c.pxhere.com/photos/39/a3/courier_night_panning_warsaw_poland_colorful_delivery_city-651366.jpg!d
https://www.lookoutpro.com/wp-content/uploads/2020/02/patinetes_electricos_urbano_portadas.jpg*/}                        
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 img-fluid" height="auto" width="100%" src="https://www.thebalancesmb.com/thmb/7D8sMsr1q42HoNnTTDvRiKjAglc=/2121x1414/filters:fill(auto,1)/electric-scooter-4714047c12fd44f5aeb07b23d5e3e25e.jpg" alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 img-fluid" height="auto" width="100%"  src="https://i.blogs.es/2a8e3f/peugeot-ef01_1/1366_2000.jpg" alt="Third slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 img-fluid" height="auto" width="100%"  src="http://cdn.shopify.com/s/files/1/0034/7504/6445/articles/ninebot_es2_electric_kick_scooter_man_and_women_riding_2f08c33f-7e84-4792-8878-0d0ac7fca425_1080x.jpg" alt="fourth slide" />
                </div>
{/*                <div className="carousel-item">
                    <img className="d-block w-100" height="860" width="auto"  src="http://www.ovrik.com/wp-content/uploads/2016/09/Peugeot-Cycles-eF01-Photos-Reveal-004.jpg" alt="fourth slide" />
                </div>*/}
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

