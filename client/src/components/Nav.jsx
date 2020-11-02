import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Dark from "../DarkModeToggle"
import Logo from '../img/logoHenry.png'
import SearchBar from './SearchBar.jsx';
import * as action from '../redux/Action';
import axios from 'axios';
import './Nav.css';


function Nav() {
    const dispatch = useDispatch()
    //=============================
    // este es el count del carrito
    let countCart = localStorage.getItem('count')
    //==============================
    let count = useSelector(store => store.countCart)
    let user = useSelector(store => store.loggedIn)
    let id = localStorage.getItem('id')
    let products = JSON.parse(localStorage.getItem('prod'))
    !countCart ? countCart = 0 : countCart = countCart
    const idioma = 'esp'


    let history = useHistory();
    // (handleSelect) cuando se clickea en algun 'a' se filtra con ese nombre y en el componente menu se muestra
    function handleSelect(e) {
        let name = e.target.name
        dispatch(action.deleteFilter())
        dispatch(action.filterbyCategory(name, true))
        history.push('/Menu')
        return;
    }

    useEffect(() => {

    }, [count, idioma])
    function render() {
        dispatch(action.countCart(0))
    }
    render()

    const logout = (e) => {

        dispatch(action.logIn(false))
        dispatch(action.updateCart(products, id))
        localStorage.clear()
        axios.get('http://localhost:3001/auth/logout', { withCredentials: true }).then(logout => {
            return history.push('/')
        })
    }

    const orderUser = (idUser) => {
        return axios.get(`http://localhost:3001/users/${idUser}/orders`)
            .then(order => {
                if (!order.data.length) {
                    return window.location = `http://localhost:3000/order/ /error`;
                } else { return window.location = `http://localhost:3000/order/${idUser}` };
            })
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="col-md-3">
                <Link to='/'>
                    <span className="navbar-brand">
                        <img id="logoHenry" src={Logo} className="d-inline-block align-top" alt="" />
                    </span>
                </Link>
                <button className="navbar-toggler navbar-toggler-nav collapsed" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="col-md-6 barraSuperiorSearch" >
                <SearchBar />
            </div>
            <div className="col-md-3 utilidades">
                <div className="main row">
                    <div className="col-md-5 icon-cart">
                        <Link to='/carrito' className="linkIcons">
                            <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                            {countCart !== 0 && countCart !== null && <span className="cart-counter">{countCart}</span>}
                            <br />
                            {idioma === 'esp' ? <span className="spam-phone">Carrito</span> :
                                <span>Shopping Cart</span>}
                        </Link>
                    </div>
                    <div className="col-md-5 icon-user">
                        <div className="js-utilities-item utilities-item transition-soft d-none d-inline-block" data-store="account-links">
                            <div className="utility-head text-center">
                                {user.image && <img className="roundedAvatar" src={user.image} height="30px" width="30px" alt='' />}
                                {!user.image && <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>}
                                {idioma === 'esp' ? <span className="utility-name transition-soft d-block spam-phone">{user.name ? `Hola, ${user.name}!` : 'Mi Cuenta'}</span> :
                                    <span className="utility-name transition-soft d-block spam-phone">{user.name ? `Hi, ${user.name}!` : 'My account'}</span>}
                            </div>
                            <ul className="js-subutility-list subutility-list ul-mi-cuenta">
                                {localStorage.getItem('role') === 'Responsable' && <li className="subutility-list-item nav-accounts-item nav-accounts-link"><Link to='/admin' title="">Panel</Link></li>}
                                {localStorage.getItem('role') === 'Admin' && <li className="subutility-list-item nav-accounts-item nav-accounts-link"><Link to='/admin' title="">Panel</Link></li>}
                                {localStorage.getItem('email') === null && <div><li className="subutility-list-item nav-accounts-item"><Link to='/Login' title="" className="nav-accounts-link">Iniciar sesión</Link></li>
                                    <li className="subutility-list-item nav-accounts-item nav-accounts-link"><Link to='/Register' title="" >Crear cuenta</Link></li></div>}
                                {localStorage.getItem('email') !== null && <div><li className="subutility-list-item nav-accounts-item"><Link to='/profile' title="" className="nav-accounts-link">Perfil</Link></li>
                                    <li className="subutility-list-item nav-accounts-item"><Link to='/profile' title="" className="nav-accounts-link" onClick={(e) => {
                                        e.preventDefault();
                                        orderUser(localStorage.getItem('id'));
                                    }
                                    }>Mis Ordenes</Link></li>
                                    <li className="subutility-list-item nav-accounts-item nav-accounts-link">
                                        <Link to='/logout' title="" onClick={logout}>Logout</Link></li></div>}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2 icon-mode">
                        <div className="custom-control custom-switch ">
                            <Dark />
                            <label className="custom-control-label " htmlFor="customSwitch1"></label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-12 menuSkate collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link" href="/products">PRODUCTOS</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link " name='Skates' onClick={handleSelect}>SKATES</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={handleSelect} name='Patines' className="nav-link">PATINES</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={handleSelect} name='Hoverboards'>HOVERBOARDS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={handleSelect} name='Zapatillas'>ZAPATILLAS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={handleSelect} name='Indumentaria'>INDUMENTARIA</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={handleSelect} name='Accesorios'>ACCESORIOS</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
