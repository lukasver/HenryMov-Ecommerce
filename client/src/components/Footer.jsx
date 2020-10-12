import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Footer.css';

export default function Footer() {



    return (
        <footer className="page-footer font-small stylish-color-dark bg-dark pt-4">
            <div className="container text-center text-md-left">
                <div className="row">
                    <div className="col-md-3 mx-auto">
                        <h5 className="font-weight-bold text-uppercase  mb-4">Quienes somos</h5>
                        <p>Somos un grupo de estudiantes de Henry dispuestos a dar todo de cada uno para mejorar el futuro nuestro y del mundo</p>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-2 mx-auto">
                        <h5 className="font-weight-bold text-uppercase  mb-4">Informacion adicional</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!">Como comprar</a>
                            </li>
                            <li>
                                <a href="#!">Preguntas frecuentes</a>
                            </li>
                            <li>
                                <a href="#!">Cambios y devoluciones</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-2 mx-auto">
                        <div class="span12">
                            <div class="thumbnail center well well-small text-center">
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
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-3 mx-auto">
                        <h5 className="font-weight-bold text-uppercase  mb-4">Contacto</h5>
                        <ul className="list-unstyled">
                            <li>
                                <p>
                                    <i class="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                            </li>
                            <li>
                                <p>
                                    <i class="fas fa-envelope mr-3"></i> info@example.com</p>
                            </li>
                            <li>
                                <p>
                                    <i class="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                            </li>
                            <li>
                                <p>
                                    <i class="fas fa-print mr-3"></i> + 01 234 567 89</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr/>
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