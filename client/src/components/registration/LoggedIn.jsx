import React from 'react';
import axios from 'axios';
import './LoggedIn.css';  

export default function LoggedIn() {

  const handleLogin = (e) => {

    e.preventDefault()
    const email = document.getElementById("inputEmail").value
    const password = document.getElementById("inputPassword").value

    axios.post('http://localhost:3001/auth/login', {email, password}, {withCredentials: true})
    .then(res => {
      if (res.status === 200) {
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('role', res.data.role);
        window.location="http://localhost:3000/"
      }})
    return
    }

    return (
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5 form-login">
          <div class="card-body">
            <h5 class="card-title text-center">Inicio de Sesión:</h5>
            <form class="form-signin">
              <div class="form-label-group">
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
                {/*<label for="inputEmail">Email</label>*/}
              </div>

              <div class="form-label-group">
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
               {/* <label for="inputPassword">Password</label>*/}
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                <label class="custom-control-label" for="customCheck1" style={{"martin-top": "50px"}}>Recordar password</label>
              </div>
              <button onClick={handleLogin} class="btn btn-lg btn-block text-uppercase botonlogin" type="submit">Sign in</button>
              <hr class="my-4"/>
              <a href='/reset' className='forgotten'>Has olvidado tu contraseña? Click aqui</a>
              <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
              <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}
