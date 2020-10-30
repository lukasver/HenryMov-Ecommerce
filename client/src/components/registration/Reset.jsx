import React, { useState } from 'react';
import './Reset.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


export default function Reset() {

    let history = useHistory();

    const [values, setValues] = useState({
        email: '',
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
        
        axios.post('http://localhost:3001/users/mailValidator/reset', {email: values.email})
            .then(user => {
                window.alert('Verifique su casilla de correo para continuar')
                return user;
                // return user.data
            // }).then(id => {
            //     console.log('id:', id)
            //     return axios.post(`http://localhost:3001/users/${id}/passwordReset`, {password: values.password}, { withCredentials: true }
            //     )
            //     .then(result => {
            //         if(result.status === 200){
            //             window.alert('Contraseña modificada con exito');
            //             history.push('/Login');
            //         }
                // })
            }).catch(err => {
                console.log(err)
            })
    }


    function validate(input) {
        let errors = {};

        if (!input.email) {
            errors.email = 'Este campo es requerido'
        }
        else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(input.email)) {
            errors.email = 'Debe ingresar un mail valido'
        }
        setError(errors)
        return errors;
    }



    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <h3>Cambio de Contraseña</h3>
                        <p>Ingresa el mail para iniciar el <br/>proceso de recuperacion de clave</p>
                        <form className="form-signin" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input name='email' type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" aria-describedby="emailHelp" onChange={handleOnChange} />
                                {error.email && <p className='danger'>{error.email}</p>}
                                
                            </div>
                           
                            {JSON.stringify(error) == '{}' && values.email !== '' ? <button className="adam-button btn-enabled" type='submit'>Confirmar</button>
                                : <button className="adam-button btn-disabled" type='submit' disabled>Confirmar</button>}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}