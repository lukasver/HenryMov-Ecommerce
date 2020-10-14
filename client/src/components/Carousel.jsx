import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../redux/Action'
import './Carousel.css';

export default function Carousel() {
    const totalProds = useSelector(store => store.totalProds)
    const prodcutrandom = useSelector(store => store.prodcutrandom)
    const dispatch = useDispatch()  
    
    
    console.log('estado de componente',prodcutrandom)
    console.log('estado de componente',totalProds)
    dispatch(action.prodcutrandom)
    
    
    return (
        <div className="container">
            <br /><br /><br /><br /><br />
            <h3>Productos Destacados</h3>
            <br />
            <div className="main row">  
           
            
                {/* {prodcutrandom.map(prod =>
                    <div className="card-group col-md-3">
                        <ProductCard
                            key={prod.id}
                            id={prod.id}
                            name={prod.name}
                            description={prod.description}
                            price={prod.price}
                            image={prod.image}
                        />
                    </div>)} */}
            </div>
            <br /><br /><br /><br /><br /><br />
            <h3>Testimonios</h3>
            <br />
            <div className="main row">
                <div className="col-md-6 row test-izq">
                    <div className="col-md-6">
                        <img className="img-testimonio" src="https://www.jovenesprogramadores.cl/wp/wp-content/uploads/2020/07/foto-tertimonio-1.png" />
                    </div>
                    <div className="col-md-6">
                        <br />
                        <h5>Carla Basaul</h5>
                        <p className="perfil">Programmer</p>
                        <p className="test-text">
                            “Supe de ustedes por un amigo. Quiero actualizar y adquirir conocimientos en lenguajes que no conocía o que conocía pero por muchos años no practiqué y ya no recuerdo.
					</p>
                    </div>
                </div>
                <div className="col-md-6 row test-der">
                    <div className="col-md-6">
                        <img className="img-testimonio" src="https://www.jovenesprogramadores.cl/wp/wp-content/uploads/2020/07/yerco.png" />
                    </div>
                    <div className="col-md-6">
                        <br />
                        <h5>Marcos Perez</h5>
                        <p className="perfil">Programmer</p>
                        <p className="test-text">
                            “Gracias por liberar y ofrecer este tipo de cursos en estos tiempos de crisis sanitaria. Es un excelente aporte para el auto aprendizaje guiado”.
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
                        “Supe de ustedes por un amigo. Quiero actualizar y adquirir conocimientos en lenguajes que no conocía o que conocía pero por muchos años no practiqué y ya no recuerdo.
                        Estoy feliz haciendo mi primer curso, lo encuentro muy bueno e interesante, recién terminé el primero. Recomiendo el programa recomiendo 100%”.
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



