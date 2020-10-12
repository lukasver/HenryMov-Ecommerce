import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Footer.css';

export default function Footer() {



    return (
        <footer className="page-footer font-small stylish-color-dark bg-dark pt-1">
            <div className="container text-center text-md-left">
                <div className="row">
                    <div className="col-md-3 mx-auto text-muted">
                        <h5 className="font-weight-bold text-muted text-uppercase mt-2 mb-4">Quienes somos</h5>
                        <p>Somos un grupo de estudiantes de Henry dispuestos a dar todo de cada uno para mejorar el futuro nuestro y del mundo</p>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!">Conocenos</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-3 mx-auto">
                        <h5 className="font-weight-bold text-muted text-uppercase mt-2 mb-4">Informacion </h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!">Como comprar</a>
                            </li>
                            <li>
                                <a href="/Preguntas">Preguntas frecuentes</a>
                            </li>
                            <li>
                                <a href="#!">Cambios y devoluciones</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-3 mx-auto">
                 
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-2 mx-auto">
                        <div class="span12">
                            <div class="thumbnail center well well-small text-center text-muted">
                                <h2>Newsletter</h2>
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
            <ul className="list-unstyled list-inline text-center">
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
            <div className="footer-copyright text-center py-3">© 2020 Copyright:
    <a href="https://mdbootstrap.com/"> HenryMov</a>
            </div>
        </footer>
    )
}