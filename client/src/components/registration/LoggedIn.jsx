import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './LoggedIn.css';


export default function LoggedIn() {

  const [count, setCount] = useState(0);

  const handleLogin = (e) => {

    e.preventDefault()

    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;


    axios.get(`http://localhost:3001/users/${email}`,  {withCredentials: true})
      .then(res=> {
          if (res.data === 404) {
            window.alert('El usuario no existe')
        }
        else {
          axios.post('http://localhost:3001/users/status', { email })
            .then(status => {
              if (status.data === 'Bloqueado') {
                window.alert('Tu usario ha sido bloqueado. Por favor, cambia tu contraseña');
              } else if (status.data === 'Inactivo') {
                window.alert('Tu usario ha sido desactivado. Por favor, ponte en contacto con atención al cliente');
              } else {
                axios.post('http://localhost:3001/auth/login', { email, password })
                  .then((res) => {
                    console.log('count', count)
                    if (res.status === 200) {
                      localStorage.setItem('id', res.data.id);
                      localStorage.setItem('email', res.data.email);
                      localStorage.setItem('role', res.data.role);
                      window.location = "http://localhost:3000/";
                    }

                  })
                  .catch(err => {
                    console.log('Entro')
                    setCount(count + 1)
                    if (count === 2) {
                      axios.post("http://localhost:3001/users/bloqued", { email })
                        .then(result => {
                          console.log(result)
                          window.alert('Usuario bloqeado')
                        })
                    };
                    console.log(err);

                  });
              }
              return
            })
        }
      })

  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5 form-login">
            <div className="card-body">
              <h5 className="card-title text-center">Inicio de Sesión:</h5>
              <form className="form-signin">
                <div className="form-label-group">
                  <input type="email" id="inputEmail" className="form-control" name='email' placeholder="Email address" required autofocus />
                </div>
                <div className="form-label-group">
                  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                  {count > 0 && count < 3 && <p className='danger'>Te quedan {3 - count} intentos</p>}
                  {count >= 3 && <p className='danger'  >Superaste el maximo de intentos, por favor cambia tu contraseña</p>}
                </div>
                {count >= 3 ? <button className="btn btn-lg btn-block text-uppercase botonlogin" type="submit" disabled>Sign in</button> :
                  <button onClick={handleLogin} className="btn btn-lg btn-block text-uppercase botonlogin" type="submit" id='bloqueado'>Sign in</button>}


                  <hr className="my-4" />
                  <a href='/reset' className='forgotten'>Has olvidado tu contraseña? Click aqui</a>
                  <br /><br />
                  <div className="row">
                    <div className="col-md-6"> <a className="btn btn-lg btn-google btn-block text-uppercase btn-outline" style={{ fontSize: '15px' }} href="http://localhost:3001/auth/google"><img src="https://img.icons8.com/color/16/000000/google-logo.png" alt=''/> Sign in Google</a> </div>
                    <div className="col-md-6"> <a className="btn btn-lg btn-google btn-block text-uppercase btn-outline" style={{ fontSize: '15px' }} href="http://localhost:3001/auth/github"><img src="https://github.githubassets.com/favicons/favicon.png" style={{ width: '16px' }}alt='' /> Sign in GITHUB</a> </div>
                  </div>
                </form> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}