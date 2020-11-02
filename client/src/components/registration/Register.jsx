import React, { useState } from 'react'

import { Link} from 'react-router-dom'

import './Register.css'
import axios from 'axios'
import { useEffect } from 'react';
import PasswordStrenghtMeter from './PasswordStrenghtMeter'


export default function Register() {
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        address: '',
        email: '',
        phone: '',
        birthdate: '',
        password: ''
    });

    const [error, setErrors] = useState({});
    const [verify, setVerify] = useState('');
    const [userCreated, setUserCreated] = useState(0);

    const [confirmationCode, setConfirm] = useState(Math.floor(Math.random()*10000).toString());


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
    const handleOnChangeVerify = e => {
        setVerify(e.target.value)
    }
    const handleMail = (e) => {
        e.preventDefault()
        axios
        .post('http://localhost:3001/users/mailValidation', {
            to:values.email,
            type: "Register",
            data: `${confirmationCode}`
        })

        return
    }
    const handleSubmit = e => {
        e.preventDefault()
        const { name } = e.target;
        axios.post(`http://localhost:3001/user`, values)
            .then(values => {
                setUserCreated(1)
                return values
            })
            .catch(error => {
                setUserCreated(2)
            })
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
        else if (typeof input.name !== 'string') {
            errors.name = 'El nombre solo puede contener letras'
        }
        else if (input.name.length < 3) {
            errors.name = 'El nombre debe contener como minimo 3 letras';
        }

        else if (!(/^[a-zA-Z ]*$/).test(input.name)) {
            errors.name = 'El nombre no puede contener numeros'
        }

        if (!input.lastname) {
            errors.lastname = 'Este campo es requerido';
        }

        if (!input.email) {
            errors.email = 'Este campo es requerido';
        }
        else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(input.email)) {
            errors.email = 'El mail debe ser valido'
        }

        if (!input.password) {
            errors.password = 'Este campo es requrido'
        }
        else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,32}$/).test(input.password)) {
            errors.password = 'La clave es invalida'
        }

        if (!input.birthdate) {
            errors.birthdate = 'Este campo es requerido'
        }
        if (!input.password) {
            errors.confirmedPassword = 'Este campo es requrido'
        }

        if (input.password !== input.confirmedPassword) {
            errors.confirmedPassword = 'Las contraseñas no coinciden'
        }
        setErrors(errors)
        return errors;
    }

    useEffect(() => {
        // axios.get(`http`)
    }, [confirmationCode, userCreated])

    return (
        <div className="container" style={{ width: "1600px" }}>
            <div className="row">
                <div className="col-md-10 offset-md-1">

                    <form onSubmit={handleMail}>
                        <div className="form-heading tect-center">
                            <div className="title-description registfont">nuevo usuario</div>
                            <p className="title-description" style={{ color: "white" }}>¿Ya tienes una cuenta?
                            <Link to='/logIn'> Inicia sesion</Link>
                            </p>
                        </div>

                        <div className="row form-group">
                            <h4 className="page-header col-md-12">Nombre y Apellido</h4>
                            <div className="col-md-6">
                                <input
                                    className="user"
                                    onChange={handleOnChange}
                                    name='name'
                                    type="text"
                                    id='Nombre'
                                    placeholder='Ingrese su nombre'
                                />
                                {error.name && <p className='danger'>{error.name}</p>}
                            </div>
                            <div className="col-md-6">
                                <input
                                    className="user"
                                    onChange={handleOnChange}
                                    name='lastname'
                                    type="text"
                                    id='Apellido'
                                    placeholder='Ingrese su apellido'
                                />
                                {error.lastname && <p className='danger'>{error.lastname}</p>}
                            </div>
                        </div>
                        <div className="row form-group">
                            <h4 className="page-header col-md-6">Dirección</h4>
                            <h4 className="page-header col-md-6">E-mail</h4>
                            <div className="col-md-6">
                                <input
                                    className="user"
                                    onChange={handleOnChange}
                                    name='address'
                                    type="text"
                                    id='Direccion'
                                    placeholder='Av. Siempreviva 134'
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    className="user"
                                    onChange={handleOnChange}
                                    name='email'
                                    type="email"
                                    id='Email'
                                    placeholder='homerjsimpson@gmail.com'
                                />
                                {error.email && <p className='danger'>{error.email}</p>}
                            </div>
                        </div>
                        <div className="row form-group">
                            <h4 className="page-header col-md-6">Teléfono</h4>
                            <h4 className="page-header col-md-6">Fecha de Nacimiento</h4>
                            <div className="col-md-6">
                                <input
                                    onChange={handleOnChange}
                                    className="user"
                                    name='phone'
                                    type="text"
                                    id='Telefono'
                                    placeholder='11-4568-5467'
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    className="form-control  form-nacimiento"
                                    onChange={handleOnChange}
                                    name='birthdate'
                                    type="date"
                                    id='Fecha de Nacimiento'
                                    placeholder='12/05/1956'
                                />
                                {error.birthdate && <p className='danger'>{error.birthdate}</p>}
                            </div>
                        </div>
                        <div className="row form-group mb-1 ">
                            <h4 className="page-header col-md-6">Contraseña</h4>
                            <h4 className="page-header col-md-6">Repita contraseña</h4>
                            <div className="col-md-6">
                                <input
                                    className="user shadow-none mb-1 "
                                    onChange={handleOnChange}
                                    name='password'
                                    type="password"
                                    id='Contraseña'
                                />
                                {error.password && <p className='danger'>{error.password}</p>}
                                {!!values.password  && <PasswordStrenghtMeter password={values.password}/>}
                                
                            </div>
                            <div className="col-md-6">
                                <input
                                    className="user"
                                    onChange={handleOnChange}
                                    name='confirmedPassword'
                                    type="password"
                                    id='Confirme Contraseña'
                                    />
                                {error.confirmedPassword && <p className='danger'>{error.confirmedPassword}</p>}
                                    
                            </div><br /><br /><br />
                            <div className="col-md-12">
                                <label className="inputref">Mínimo 8 caracteres:</label><br />
                                <label className="inputref">Debe contener al menos: 1 caractér mayúscula, especial y número </label><br />
                            </div>
                        </div>
                        <div className="col-md-12">

                       
                        {JSON.stringify(error) === '{}' && values.name !== '' ? <button  className="adam-button " type='submit' data-target='#pop-up' data-toggle='modal' >Crear cuenta</button> : <button  className="adam-button btn-disabled" type='submit' data-target='#pop-up' data-toggle='modal' disabled>Crear cuenta</button>}

                        </div>

                        <br /><br />

                    </form>
                    <div className="modal fade" id="pop-up" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span className='close' aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Te enviamos el codigo de verificaion a tu email<br />
                                    Completa el campo y presiona "Verificar"
                                    </p>
                                </div>
                                <div className="modal-footer">

                                   
                                    <form onSubmit={handleSubmit}>    
                                        {!userCreated && <input id='codeConfirm' placeholder='Ingresa el codigo' onChange={handleOnChangeVerify} type="text"/>}
                                        {verify === confirmationCode && !userCreated && <button className="adam-button" type='submit'>Verificar</button>} <p/>
                                        {userCreated&& <a className="adam-button" href='/logIn'>Inicia sesion aqui</a>} <p/>
                                        {userCreated === 2 && <a style={{color:"white"}}>El usuario {values.email} ya existe</a>}

                                        {/* {console.log('verify: ',verify,'\nconfirmation Code:', confirmationCode)} */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

