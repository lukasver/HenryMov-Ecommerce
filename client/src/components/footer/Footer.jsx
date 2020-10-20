import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Footer.css';
import diego from '../../img/diego.png';
import lucas from '../../img/lucas.png';
import cristian from '../../img/cristian.png';
import fede from '../../img/fede.png';
import seba from '../../img/seba.png';
import ariel from '../../img/ariel.png';
import { newsletterAdd, newsletterDel } from '../../utils/utils.js'

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
                        <h4 className="font-weight-bold text-muted text-uppercase mt-2 mb-4 tituloH5 h5-center">Webft05 <b className="webft05">G5</b></h4>
                        <div className="row">
                            <div className="col-md-4 div-img-4">
                                <a className="crsrlnk" href='https://www.linkedin.com/in/diegotolaba09/' target="_blank"><img className="img-footer" src={diego} /></a>
                            </div>
                            <div className="col-md-4 div-img-4">
                                <a className="crsrlnk" href='https://www.linkedin.com/in/lverdiell/' target="_blank"><img className="img-footer" src={lucas}/></a>
                            </div>
                            <div className="col-md-4 div-img-4">
                               <a className="crsrlnk" href='https://www.linkedin.com/in/cristian-lucatti/' target="_blank"><img className="img-footer" src={cristian} /></a>
                            </div>
                            <div className="col-md-4">
                                <a className="crsrlnk" href='https://www.linkedin.com/in/federico-calder%C3%B3n-8146a71b0/' target="_blank"><img className="img-footer" src={fede} /></a>
                            </div>
                            <div className="col-md-4">
                                <a className="crsrlnk" href='https://www.linkedin.com/in/sebastian-ariel-levin-656a84b0/' target="_blank"><img className="img-footer" src={seba} /></a>
                            </div>
                            <div className="col-md-4">
                                <a className="crsrlnk" href='https://github.com/ArielR135' target="_blank"><img className="img-footer" src={ariel} /></a>
                            </div>
                        </div>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-2 mx-auto">
                        <div className="span12">
                            <div className="thumbnail center well well-small text-center text-muted">
                                <h5 className="tituloH5">Newsletter</h5>
                                <p>Suscribite y recibi las mejores ofertas</p>
                                <form>
                                    <input type="email" id="Newsletter" class="form-control" placeholder="your@email.com"/>
{/*                                   <span className="add-on"><i className="icon-envelope"></i></span>*/}
                                  {/*   <div className="input-prepend"></div>*/}
                                    {/*<br />*/}
                                    <input onClick={newsletterAdd} type="button" value="Subscribe Now!" className="news-button" data-target='#pop-up' data-toggle='modal'/>
                                    <div className="modal fade" id="pop-up" role="dialog" aria-labelledby="suscripcion" aria-hidden="true">
                                         <div className="modal-dialog" role="document">
                                             <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                             <span className='close' aria-hidden="true">&times;</span>
                                                         </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>Te has suscrito con éxito!.</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div onClick={newsletterDel}  style={{cursor: "pointer", "margin-top": "5px"}} data-target='#pop-updel' data-toggle='modal'>or Unsuscribe...</div>
                                        <div className="modal fade" id="pop-updel" role="dialog" aria-labelledby="desuscripcion" aria-hidden="true">
                                         <div className="modal-dialog" role="document">
                                             <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                             <span className='close' aria-hidden="true">&times;</span>
                                                         </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>Lamentamos que te vayas :(</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                        <i className="fab fa-instagram"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-li mx-1">
                        <i className="fab fa-linkedin-in"> </i>
                    </a>
                </li>

            </ul>
            <div className="footer-copyright text-center py-3 copyright">© Copyright 2020 - Todos los derechos reservados a
                <a href="http://localhost:3000/"> HenryMov 🚀</a>
            </div>
        </footer>
    )
}