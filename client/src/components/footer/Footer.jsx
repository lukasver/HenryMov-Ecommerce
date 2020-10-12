import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Footer.css';
import diego from '../../img/diego.png';
import lucas from '../../img/lucas.png';
import cristian from '../../img/cristian.png';
import fede from '../../img/fede.png';
import seba from '../../img/seba.png';
import ariel from '../../img/ariel.png';

export default function Footer() {
    return (
        <footer className="page-footer font-small stylish-color-dark bg-dark pt-1 footer">
            <div className="container text-center text-md-left">
                <div className="row">
                    <div className="col-md-3 mx-auto text-muted">
                        <h5 className="font-weight-bold text-muted text-uppercase mt-2 mb-4 tituloH5">Quienes somos</h5>
                        <p className="textoDatos">Somos un grupo de estudiantes de Henry dispuestos a dar todo de cada uno para mejorar el futuro nuestro y del mundo</p>
                        <ul className="list-unstyled">
                            <li>
                                <a className="menus" href="#!">Conocenos</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-3 mx-auto">
                        <h5 className="font-weight-bold text-muted text-uppercase mt-2 mb-4 tituloH5">Informacion </h5>
                        <ul className="list-unstyled">
                            <li>
                                <a className="menus" href="#!">Como comprar</a>
                            </li>
                            <li>
                                <a className="menus" href="/Preguntas">Preguntas frecuentes</a>
                            </li>
                            <li>
                                <a className="menus" href="#!">Cambios y devoluciones</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-3 mx-auto div-webft">
                        <h5 className="font-weight-bold text-muted text-uppercase mt-2 mb-4 tituloH5 h5-center">Webft05 <b className="webft05">G5</b></h5>
                        <div className="row">
                            <div className="col-md-4 div-img-4">
                                <img className="img-footer" src={diego} />
                            </div>
                            <div className="col-md-4 div-img-4">
                                <img className="img-footer" src={lucas} />
                            </div>
                            <div className="col-md-4 div-img-4">
                                <img className="img-footer" src={cristian} />
                            </div>
                            <div className="col-md-4">
                                <img className="img-footer" src={fede} />
                            </div>
                            <div className="col-md-4">
                                <img className="img-footer" src={seba} />
                            </div>
                            <div className="col-md-4">
                                <img className="img-footer" src={ariel} />
                            </div>
                        </div>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-2 mx-auto">
                        <div className="span12">
                            <div className="thumbnail center well well-small text-center text-muted">
                                <h5 className="tituloH5">Newsletter</h5>
                                <p>Subscribete y recibe ofertas semanales</p>
                                <form action="" method="post">
                                    <div className="input-prepend"><span className="add-on"><i className="icon-envelope"></i></span>
                                        <input type="text" id="" name="" placeholder="your@email.com" />
                                    </div>
                                    <br />
                                    <input type="submit" value="Subscribe Now!" className="btn-floating btn-fb mx-1" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="list-unstyled list-inline text-center lista-redes">
                <li className="list-inline-item">
                    <a className="btn-floating btn-fb mx-1">
                        <i className="fab fa-facebook-f"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-tw mx-1">
                        <i className="fab fa-twitter"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-gplus mx-1">
                        <i className="fab fa-google-plus-g"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-li mx-1">
                        <i className="fab fa-linkedin-in"> </i>
                    </a>
                </li>

            </ul>
            <div className="footer-copyright text-center py-3 copyright">© Copyright 2020 - Todos los derechos reservados a
                <a href="http://localhost:3000/"> HenryMov</a>
            </div>
        </footer>
    )
}