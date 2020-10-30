import React, { useState } from 'react';
import './Verify.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Verify() {

    const history = useHistory();

    const [values, setValues] = useState({
        token: '',
        password: ''
    });

    const [error, setError] = useState({});

    const handleOnChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
        setError(validate({
            ...values,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.get(`http://localhost:3001/users?token=${values.token}`)
            .then(result => {
                return result.data
            }).then(id => {
                return axios.post(`http://localhost:3001/users/${id}/passwordReset`, { password: values.password })
            }).then(result => {
                if (result.status === 200) {
                    window.alert('Contraseña modificada con exito');
                    history.push('/logIn');
                }
            }).catch(err => {
                console.log(err)
            })
    }


    function validate(input) {
        let errors = {};

        if (!input.token) {
            errors.token = 'Este campo es requrido'
        }
        if (!input.password) {
            errors.password = 'Este campo es requrido'
        }
        else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,32}$/).test(input.password)) {
            errors.password = 'La clave es invalida'
        }

        if (!input.password) {
            errors.confirmedPassword = 'Este campo es requrido'
        }

        if (input.password !== input.confirmedPassword) {
            errors.confirmedPassword = 'Las contraseñas no coinciden'
        }
        setError(errors)
        return errors;
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <h4>Ingrese el token de seguridad</h4>
                        <form className="form-signin" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input name='token' type="text" className="form-control" id="token" placeholder="Token" onChange={handleOnChange}/>
                                {/* {error.email && <p className='danger'>{error.email}</p>} */}
                                {/* {!error.email && values.email !== '' && <button className="adam-button verified-user" type='submit' >Verificar usuario</button>} */}
                            </div>
                            <div className="form-group">
                                <input name='password' type="password" className="form-control" placeholder='New Password' id="exampleInputPassword1" onChange={handleOnChange} />
                                {error.password && <p className='danger'>{error.password}</p>}
                            </div>
                            <div className="form-group">
                                <input name='confirmedPassword' type="password" className="form-control" placeholder='Confirmed New Password' id="exampleInputPassword1" onChange={handleOnChange} />
                                {error.confirmedPassword && <p className='danger'>{error.confirmedPassword}</p>}
                            </div>
                            <button  className="adam-button btn-enabled" type='submit'>Confirmar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}