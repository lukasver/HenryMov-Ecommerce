import React from 'react'
import './Register.css'


export default function Register(){




    return (
        <div className="contenido">
        <div className="row">
        <div className="col-md-8 offset-md-2">
            <form>
                <div className="form-heading tect-center">
                    <div className="title">Registrate</div>
                    <p className="title-description">¿Ya tienes una cuenta?
                    <a href="#">Inicia sesion</a>
                    </p>
                    <div className="social-line">
                    <a href="#">
                        <i className="fa fa-facebook-square">::before</i>
                    </a>
                    <a href="#">
                        <i className="fa fa-twitter">::before</i>
                    </a>
                    <a href="#">
                        <i className="fa fa-google-plus">::before</i>
                    </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="floatin-label">Nombre</label>
                        <input type="text"/>
                    </div>
                    <div className="col-md-6">
                        <label className="floatin-label">Apellido</label>
                        <input type="text"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="floatin-label">Usuario</label>
                        <input type="text"/>
                    </div>
                    <div className="col-md-6">
                        <label className="floatin-label label-required"> Email</label>
                        <input type="email"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="floatin-label">Contraseña</label>
                        <input type="password"/>
                    </div>
                    <div className="col-md-6">
                        <label className="floatin-label">Confirme contraseña</label>
                        <input type="password"/>
                    </div>
                </div>
                <div className="row">
                <div className="col-md-12">
                    <input className="checkbox"/>
                    <label>Acepto
                    <a href="#">terminos y condiciones</a>
                    </label>
                    </div>
                </div>
                <div className="col-md-12">
                    <button className="adam-button">Crear cuenta</button>
                </div>
            </form>
        </div>
    </div>
    </div>
    )
} 