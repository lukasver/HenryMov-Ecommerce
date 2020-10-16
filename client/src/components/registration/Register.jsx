import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'


export default function Register() {
    const [values, setValues] = useState({
        name: '',
        lastName: '',
        address: '',
        email: '',
        phone: '',
        birthDate: '',
        password: '',
        confirmedPassword: ''
    });

    const [error, setErrors] = useState({});

    const handleOnChange = e => {
        const { name, value } = e.target;
        
        setValues({
            ...values,
            [name]: value
        })
        setErrors(validate({
            ...values,
            [name]: value
        }));
    }

    const handleSubmit = e => {
        const { name } = e.target;
        e.preventDefault();
        setErrors(validate({
            ...values,
            [name]: ''
        }))
        
    }


    function validate(input) {
        let errors = {};
        
        if (!input.name) {
            errors.name = 'Este campo es requerido';
        }
        else if(!(/^[a-zA-Z]+$/).test(input.name)){
            errors.name = 'El nombre solo puede contener letras'
        }
        
        else if(input.name.length < 3){
            errors.name = 'El nombre debe contener como minimo 3 letras';
        }

        if (!input.lastName) {
            errors.lastName = 'Este campo es requerido';
        }

        else if(!(/^[a-zA-Z]+$/).test(input.lastName)){
            errors.lastName = 'El apellido solo puede contener letras'
        }

        else if(input.lastName.length < 2){
            errors.lastName = 'El nombre debe contener como minimo 2 letras';
        }
        
        if(!input.email){
            errors.email = 'Este campo es requerido';
        }

        else if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(input.email)){
            errors.email = 'El mail debe ser valido'
        }

        if(!(/^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/).test(input.birthDate)){
            errors.birthDate = 'La fecha de nacimiento no es valida'
        }
        if(!input.password){
            errors.password = 'Este campo es requrido'
        }
        else if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,32}$/).test(input.password)){
            errors.password = 'La clave es invalida'
        }
        if(!input.password){
            errors.confirmedPassword = 'Este campo es requrido'
        }

        if(input.password !== input.confirmedPassword){
            errors.confirmedPassword = 'Las contraseñas no coinciden'
        }
        
        return errors;
    }

    return (
        <div className="contenido">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <form  onSubmit={handleSubmit}>
                        <div className="form-heading tect-center">
                            <div className="title">Registrate</div>
                            <p className="title-description">¿Ya tienes una cuenta?
                            <Link to='/logIn'>Inicia sesion</Link>
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                
                                <input
                                    onChange={handleOnChange}
                                    name='name'
                                    type="text"
                                    id='Nombre'
                                    placeholder='Ingrese su nombre' />
                                {error.name && <p className='danger'>{error.name}</p>}
                            </div>
                            <div className="col-md-6">
                                
                                <input 
                                onChange={handleOnChange}
                                name='lastName' 
                                type="text" 
                                id='Apellido' 
                                placeholder='Ingrese su apellido' />
                                {error.lastName && <p className='danger'>{error.lastName}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <input name='address' type="text" id='Direccion' placeholder='Av. Siempreviva 134' />
                            </div>
                            <div className="col-md-6">
                                <input 
                                onChange={handleOnChange}
                                name='email' 
                                type="email" 
                                id='Email' 
                                placeholder='homerjsimpson@gmail.com' />
                                {error.email && <p className='danger'>{error.email}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <input name='phone' type="text" id='Telefono' placeholder='11-4568-5467' />
                            </div>
                            <div className="col-md-6">
                                <input 
                                onChange={handleOnChange}
                                name='birthDate' 
                                type="text" 
                                id='Fecha de Nacimiento' 
                                placeholder='12/05/1956' />
                                {error.birthDate && <p className='danger'>{error.birthDate}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                               
                                <input
                                onChange={handleOnChange} 
                                name='password' 
                                type="password" 
                                id='Contraseña' 
                                placeholder='**************' />
                                {error.password && <p className='danger'>{error.password}</p>}
                            </div>
                            <div className="col-md-6">
                               
                                <input
                                onChange={handleOnChange} 
                                name='confirmedPassword' 
                                type="password" 
                                id='Confirme Contraseña' 
                                placeholder='**************' />
                                {error.confirmedPassword && <p className='danger'>{error.confirmedPassword}</p>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <button className="adam-button" type='submit'>Crear cuenta</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

