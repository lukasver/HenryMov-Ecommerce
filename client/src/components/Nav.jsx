import React from 'react';
import Logo from '../img/logoHenry.png'
import SearchBar from './SearchBar.jsx';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav({ onSearch }) {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="col-md-3">
                <Link to='/'>
                    <span className="navbar-brand">
                        <img id="logoHenry" src={Logo} className="d-inline-block align-top" alt="" />
                    </span>
                </Link>
            </div>
            <div className="col-md-6 barraSuperiorSearch" >
                <SearchBar
                    onSearch={onSearch}
                />
            </div>
            <div className="col-md-3">
                <div className="main row">
                    <div className="col-md-4">
                        <Link to='/ayuda'>
                            <a className="linkIcons">
                                <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-chat-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                                <br />
                                <span>Chat</span>
                            </a>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/ayuda'>
                            <a className="linkIcons">
                                <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                                <br />
                                <span>Mi Cuenta</span>
                            </a>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/ayuda'>
                            <a className="linkIcons">
                                <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                                <br />
                                <span>Carrito</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="col-md-12 menuSkate">
                <ul className="nav justify-content-center">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">SKATES</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Completos</a>
                            <a className="dropdown-item" href="#">Tablas</a>
                            <a className="dropdown-item" href="#">Ruedas</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Accesorios</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">LONGBOARDS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">PATINES</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">SKATES ELECTRICOS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">ZAPATILLAS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">INDUMENTARIA</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">ACCESORIOS</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
