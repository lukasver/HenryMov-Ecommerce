import React, { useEffect,useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import './Carousel.css';

export default function Carousel() {

    const [randomDes, setRandomDes] = useState([]);

    useEffect(() => {
        let arrayDes = [];
        let value;
        axios.get("http://localhost:3001/products")
            .then((products) => {
                for (let i = 0; i < 4; i++) {
                    value = Math.floor(Math.random() * products.data.length);
                    arrayDes.push(products.data[value]);
                    products.data.splice(value, 1);
                }
                setRandomDes(arrayDes)
            })
            .catch((err) => new Error(err));
    }, [])

return (
    <div className="container">
        <br /><br /><br /><br /><br />
        <h3>Productos Destacados</h3>
        <br />
        <div className="main row">
            {randomDes && randomDes.map(prod =>
                <div className="card-group col-md-3" key={prod.id}>
                    <ProductCard
                        key={prod.id}
                        id={prod.id}
                        name={prod.name}
                        description={prod.description}
                        price={prod.price}
                        image={prod.image}
                        count={prod.count}
                    />
                </div>)}
        </div>
        <br /><br /><br /><br /><br /><br />
        <h2> X-TREME SPORT </h2>
        <br />
        <div className="main row testimonial-video">
            <div className="col-md-6 row test-izq">
                <div className="col-md-6">
                <div className="embed-responsive embed-responsive-4by3">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/XEUzbeu2foY?start=23" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
                <div className="col-md-6">
                    <br />
                    <h5>X-Games 2019</h5>
                    <p className="perfil">Vancouver - Canada</p>
                    <p className="test-text">
                        “Tentate viendo los skates más cool de los X-Games 2019!“
					</p>
                </div>
            </div>
            <div className="col-md-6 row test-der">
                <div className="col-md-6">
                    <img className="img-testimonio" src="https://media.2oceansvibe.com/wp-content/uploads/2020/08/tony-hawk.jpg"/>
                </div>
                <div className="col-md-6">
                    <br />
                    <h5>Tony Hawk</h5>
                    <p className="perfil">Skate Legend</p>
                    <p className="test-text">
                        “Desde que conocí Henry-mov, compro todos mis skate con ellos 🤘. You rock guys!!”.
					</p>
                </div>
            </div>
        </div>
        <br /><br /><br />
        <div className="main row">
            <div className="col-md-12 test-izq testimonial-cuadro">
                <img className="img-testimonial" src="https://www.jovenesprogramadores.cl/wp/wp-content/uploads/2020/07/comillas.png" />
                <br /><br />
                <h5 className="titulo-testimonial">
                    “Supe de ustedes por un amigo. Estaba buscando un scooter eléctrico para movilizarme de casa al trabajo, pero no encontraba ningún lugar de confianza para comprarlo.
                    Me animé y lo compre en Henry-Mov! No puedo estar más féliz con el producto y servicio!, los recomiendo 100%”.
					</h5>
                <br />
                <h3 className="h3-testimonial">Consuelo Contreras</h3>
            </div>
        </div>
        <br /><br /><br />
        <div className="row">
            <div className="col-md-6">

            </div>
        </div>
    </div>
);
}



