import React, { useState} from 'react';
import axios from 'axios';
import './Footer.css';
import diego from '../../img/diego.png';
import lucas from '../../img/lucas.png';
import cristian from '../../img/cristian.png';
import fede from '../../img/fede.png';
import seba from '../../img/seba.png';


export default function Footer() {

const [email,setEmail] = useState('');
const [error,setError] = useState(true); 

function handleError(value) {
    if(!(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/).test(value))  {
      setError('Ingresar un Email válido');
      console.log(error)
    } else {
      setError('');
    }
    setEmail(value);
    console.log(email)
  }

function newsletterAdd(e) {
  e.preventDefault();
  
  const mail = document.getElementById("Newsletter").value
  axios.post("http://localhost:3001/newsletter/suscribe", {email: mail})
  .then(res => {
    document.getElementById("Newsletter").value = ''
  })
  .catch(err => {
    document.getElementById("Newsletter").value = ''
    console.log(err)
  })
  return;
}

function newsletterDel(e) {
  e.preventDefault();
  
  const mail = document.getElementById("Newsletter").value
  axios.put("http://localhost:3001/newsletter/unsuscribe", {email: mail})
  .then(res => {
    document.getElementById("Newsletter").value = '';
  })
  .catch(err => {
    document.getElementById("Newsletter").value = ''
    console.log(err)
  })
  return;
}

    return (
        <footer className="page-footer font-small stylish-color-dark bg-dark pt-1 footer">
            <div className="container text-center text-md-left">
                <div className="row">
                    <div className="col-md-3 mx-auto text-muted">
                        <h5 className="font-weight-bold text-muted text-uppercase mt-2 mb-4 tituloH5">Quienes somos</h5>
                        <p className="textoDatos">Somos un grupo de estudiantes de Henry dispuestos a dar todo de cada uno para mejorar el futuro nuestro y del mundo</p>
                        <ul className="list-unstyled">
                            <li>
                                <a className="menus"  href="/Under">Conocenos</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-3 mx-auto">
                        <h5 className="font-weight-bold text-muted text-uppercase mt-2 mb-4 tituloH5">Informacion </h5>
                        <ul className="list-unstyled">
                            <li>
                                <a className="menus"  href="/under">Como comprar</a>
                            </li>
                            <li>
                                <a className="menus" href="/under">Preguntas frecuentes</a>
                            </li>
                            <li>
                                <a className="menus"  href="/under">Cambios y devoluciones</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-3 mx-auto div-webft">
                        <h4 className="font-weight-bold text-muted text-uppercase mt-2 mb-4 tituloH5 h5-center">Webft05<b className="webft05"> G5</b></h4>
                        <div className="row">
                            <div className="col-md-4 div-img-4 linkedin-footer-img">
                                <a className="crsrlnk" href='https://www.linkedin.com/in/diegotolaba09/' target="_blank" rel='noopener'><img className="img-footer" src={diego} alt='Diego' /></a>
                            </div>
                            <div className="col-md-4 div-img-4 linkedin-footer-img">
                                <a className="crsrlnk" href='https://www.linkedin.com/in/lverdiell/' target="_blank" rel='noopener'><img className="img-footer" src={lucas} alt='Lucas'/></a>
                            </div>
                            <div className="col-md-4 div-img-4 linkedin-footer-img">
                               <a className="crsrlnk" href='https://www.linkedin.com/in/cristian-lucatti/' target="_blank" rel='noopener'><img className="img-footer" src={cristian} alt='Cristian' /></a>
                            </div>
                            <div className="col-md-4 linkedin-footer-img" style={{top: "10px", left: "40px"}}>
                                <a className="crsrlnk" href='https://www.linkedin.com/in/federico-calder%C3%B3n-8146a71b0/' target="_blank" rel='noopener'><img className="img-footer" src={fede} alt='Fede'/></a>
                            </div>
                            <div className="col-md-4 linkedin-footer-img" style={{top: "10px", left: "40px"}}>
                                <a className="crsrlnk" href='https://www.linkedin.com/in/sebastian-ariel-levin-656a84b0/' target="_blank" rel='noopener'><img className="img-footer" src={seba} alt='Sebas'/></a>
                            </div>
                        </div>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-2 mx-auto newsletter-footer">
                        <div className="span12">
                            <div className="thumbnail center well well-small text-center text-muted">
                                <h5 className="tituloH5">Newsletter</h5>
                                <p>Suscribite y recibi las mejores ofertas</p>
                                <form>
                                    <input onChange={(e) => handleError(e.target.value)} value={email} type="email" id="Newsletter" className="form-control" placeholder="your@email.com"/>
                                    <input onClick={(e) => newsletterAdd(e)} type="button" value="Subscribe Now!" className="news-button" data-target='#pop-up' data-toggle='modal'/>

                                <div className="modal fade" id="pop-up" role="dialog" aria-labelledby="suscripcion" aria-hidden="true">
                                         <div className="modal-dialog" role="document">
                                             <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                             <span className='close' aria-hidden="true">&times;</span>
                                                         </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {!error ? <p>Te has suscrito con éxito!.</p> : <p style={{color: "red"}}>Debes ingresar un e-mail válido</p>}
                                                    </div>
                                                    <div className="modal-footer">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            
                                    <div onClick={newsletterDel}  style={{cursor: "pointer", "marginTop": "5px"}} data-target='#pop-updel' data-toggle='modal'>or Unsuscribe...</div>
                                        <div className="modal fade" id="pop-updel" role="dialog" aria-labelledby="desuscripcion" aria-hidden="true">
                                         <div className="modal-dialog" role="document">
                                             <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                             <span className='close' aria-hidden="true">&times;</span>
                                                         </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {!error ? <p>Te has desuscrito con éxito. <br/>Lamentamos que te vayas 😔</p> : <p style={{color: "red"}}>Debes ingresar un e-mail válido</p>}

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
                    <a className="btn-floating btn-fb mx-1" href="http://localhost:3000/">
                        <i className="fab fa-facebook-f"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-tw mx-1" href="http://localhost:3000/">
                        <i className="fab fa-twitter"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-gplus mx-1" href="http://localhost:3000/">
                        <i className="fab fa-instagram"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-li mx-1" href="http://localhost:3000/">
                        <i className="fab fa-linkedin-in"> </i>
                    </a>
                </li>

            </ul>
            <div className="footer-copyright text-center py-3 copyright">© Copyright 2020 - Todos los derechos reservados a
                <a href="http://localhost:3000/"> HenryMov </a>
            </div>
        </footer>
    )
}