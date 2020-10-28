import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './LoggedIn.css';

export default function LoggedIn() {
  
  const [count, setCount] = useState(0);
  
  const handleLogin = (e) => {
    
    e.preventDefault()
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    
    
    axios.post('http://localhost:3001/auth/login', {email, password})
    .then((res,err) => {
      if (res.status === 200) {
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('role', res.data.role);
        window.location="http://localhost:3000/";
      }})
    .catch(error => {
      setCount(count + 1)
      if(count === 3){
        axios.put('http://localhost:3001/user/bloqued', {email: email})
        .then(result=> {
          const message = document.getElementById('bloqueo')
          if(result.status === 401){
            message.innerHTML = 'Tu usuario ha sido bloqueado, por favor cambia tu clave'
          }
        })
      };
      console.log(error);
      // if (error) {
      //   if(count === 3){
      //     window.alert('Has llegado al limite de intentos. Por favor, resetea tu contraseña')
          
      //   }
      //   if(count > 0 && count < 3){
      //     window.alert(`Email y/o Contraseña incorrecta. Te quedan ${ 3 - count } intentos`)
      //   }
      // } 
    });
    return 
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5 form-login">
            <div class="card-body">
              <h5 class="card-title text-center">Inicio de Sesión:</h5>
              <form class="form-signin">
                <div class="form-label-group">
                  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
                </div>
                <div class="form-label-group">
                  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                  {count > 0 && count < 3 && <p className='danger'>Te quedan {3 - count} intentos</p>}
                  {count >= 3 && <p className='danger' id='bloqueo' >Superaste el maximo de intentos, por favor cambia tu contraseña</p>}
                </div>
                {count >= 3 ? <button onClick={handleLogin} className="btn btn-lg btn-block text-uppercase botonlogin" type="submit" disabled>Sign in</button> :
                <button onClick={handleLogin} className="btn btn-lg btn-block text-uppercase botonlogin" type="submit" >Sign in</button>}
                
                {console.log(count)}
                <hr className="my-4" />
                <a href='/reset' className='forgotten'>Has olvidado tu contraseña? Click aqui</a>
                <br/><br/>
                <div className="row">
                  <div className="col-md-6"> <a className="btn btn-lg btn-google btn-block text-uppercase btn-outline" style={{ fontSize: '15px' }} href="http://localhost:3001/auth/google"><img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Sign in Google</a> </div>
                  <div className="col-md-6"> <a className="btn btn-lg btn-google btn-block text-uppercase btn-outline" style={{ fontSize: '15px' }} href="http://localhost:3001/auth/github"><img src="https://github.githubassets.com/favicons/favicon.png" style={{ width: '16px' }} /> Sign in GITHUB</a> </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}