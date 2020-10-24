import React, { useState } from 'react';
import './Reset.css';
import axios from 'axios';


export default function Reset() {

    const [values, setValues] = useState({
        email: '',
        password: ''
        });

    const [error, setError] = useState({});

    const handleOnChange = e => {
        const { name, value } = e.target;
        console.log(values)
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
        //console.log(values.email)
        axios.get(`http://localhost:3001/users?email=${values.email}` )
        .then(user => {
            console.log('user:',user)
            return user.data
        }).then(id => {
            console.log('id:',id)
            axios.post(`http://localhost:3001/users/${id}/passwordReset`, values.password)
            .then(result => {
                console.log('result:', result)
                return result
            })
        })
        .catch(err => {
            console.log(err)
        })
    }


    function validate(input){
        let errors = {};

        if(!input.email){
            errors.email = 'Este campo es requerido'
        }
        else if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(input.email)){
            errors.email = 'Debe ingresar un mail valido'
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
                        <h4>Cambio de Contraseña</h4>
                        <form className="form-signin" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input name='email' type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" aria-describedby="emailHelp" onChange={handleOnChange}/>
                                {error.email && <p className='danger'>{error.email}</p>}
                                {/* {!error.email && values.email !== '' && <button className="adam-button verified-user" type='submit' >Verificar usuario</button>} */}
                            </div>
                            <div className="form-group">
                                <input name='password' type="password" className="form-control" placeholder='New Password' id="exampleInputPassword1" onChange={handleOnChange}/>
                                {error.password && <p className='danger'>{error.password}</p>}
                            </div>
                            <div className="form-group">
                                <input name='confirmedPassword' type="password" className="form-control" placeholder='Confirmed New Password' id="exampleInputPassword1" onChange={handleOnChange}/>
                                {error.confirmedPassword && <p className='danger'>{error.confirmedPassword}</p>}
                            </div>
                            {JSON.stringify(error) == '{}' && values.email !== '' ? <a href='/' className="adam-button btn-enabled" type='submit'>Confirmar</a> 
                            : <button  className="adam-button btn-disabled" type='submit' disabled>Confirmar</button>}
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}