import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from '../LoadingBar';
import { dateFormat } from '../../utils/utils.js'
import * as action from '../../redux/Action'
import './Profile.css'

const Profile = () => {
	const user = useSelector(store => store.loggedIn)
	const dispatch = useDispatch()

	const [values, setValues] = useState({
		password: ''
	})

	const [error, setError] = useState({});

	const handleOnChange = e => {
		const { name, value } = e.target;
		setValues({
            ...values,
            [name]: value
        });
        setError(validate({
            ...values,
            [name]: value
        }))
	}

	function validate(input){
		let errors = {};

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

	const logout = () => {
		dispatch(action.logIn(false))
		localStorage.removeItem('id')
		localStorage.removeItem('role')
		localStorage.removeItem('email')
		axios.get('http://localhost:3001/auth/logout', { withCredentials: true })
		window.location.replace('http://localhost:3000')
	}

	if (!user) return <LoadingBar done="80" />

	const handleImage = (e) => {
		const imagenUrl = document.getElementById('customFile').files[0] //como lo ves? funcara?

		console.log(imagenUrl)
		const formData = new FormData();
		formData.append('image', imagenUrl)

		axios({
			method: 'post',
			url: `http://localhost:3001/user/${user.id}/image`,
			data: formData,
			config: { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
		})
			.then(data => {
				window.location.reload()
				console.log(data)
			})
			.catch(error => {
				new Error(error)
			})
		return
	}
	let id = localStorage.getItem('id')
	console.log(id)
	const handleSubmit = e => {
	    e.preventDefault();
        axios.post(`http://localhost:3001/users/${id}/passwordReset`, {password: values.password}, { withCredentials: true })
        .then(result => {
            if(result.status === 200){
                window.alert('Contraseña modificada con exito');
                logout();
            }
        }).catch(err => {
            console.log(err)
        })
        
    }

	return (


		<div className="container mt-5 mb-5" id="page-content">
			<div className="padding">
				<div className="row container d-flex justify-content-center">
					<div className="col-xl-6 col-md-12">
						<div className="row user-card-full">
							<div className="col-sm-4 bg-c-lite-green user-profile">
								<div className="card-block text-center text-white">
									<div className="m-b-25"> <img src={user.image} className="img-radius" alt="User-Profile-Image" /> </div>
									<h6>{user.name} {user.lastname}</h6>
									<p >{user.role}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
								</div>
								<div className="custom-file">
									<input type="file" name="image" className="custom-file-input" id="customFile" />
									<label className="custom-file-label" for="customFile">Cambiar Foto</label>
									<button className="mt-1 adam-button" style={{ width: "100%" }} onClick={handleImage}>enviar</button>
								</div>
							</div>
							<div className="col-sm-8">
								<div className="card-block">
									<h3 className="m-b-20 p-b-5 b-b-default f-w-600">Información</h3>
									<div className="row">
										<div className="col-sm-6">
											<p className="m-b-10 f-w-600">Email</p>
											<h6 className="text-muted f-w-400">{user.email}</h6>
										</div>
										<div className="col-sm-6">
											<p className="m-b-10 f-w-600">Teléfono</p>
											<h6 className="text-muted f-w-400">{user.phone}</h6>
										</div>
									</div>
									<h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
									<div className="row">
										<div className="col-sm-6">
											<p className="m-b-10 f-w-600">Cumpleaños</p>
											<h6 className="text-muted f-w-400">{dateFormat(user.birthdate)}</h6>
										</div>
										<div className="col-sm-6">
											<p className="m-b-10 f-w-600"> Fecha Alta </p>
											<h6 className="text-muted f-w-400">{dateFormat(user.creationdate)}</h6>
										</div>
									</div>
									<div className="row mt-5 pt-5 justify-content-center">
										<div className="col-sm-6">
											<button className="adam-button adamcustom" data-toggle="modal" data-target='#modalLoginForm' >Reset password</button>
											<div className="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
												aria-hidden="true">
												<div className="modal-dialog" role="document">
													<div className="modal-content">
														<div className="modal-header text-center">
															<h4 className="modal-title w-100 font-weight-bold">Cambiar Contraseña</h4>
															<button type="button" className="close" data-dismiss="modal" aria-label="Close">
																<span aria-hidden="true">&times;</span>
															</button>
														</div>
														<div className="modal-body mx-3">
															<div className="md-form mb-5">
																<input type="password" name='password' id="defaultForm-pass" className="form-control validate" placeholder='Contraseña Nueva' onChange={handleOnChange}/>
																{error.password && <p className='danger'>{error.password}</p>}
															</div>
															<div className="md-form mb-4">
																<input type="password" name='confirmedPassword' id="defaultForm-conPass" className="form-control validate" placeholder='Confirme Contraseña' onChange={handleOnChange}/>
																{error.confirmedPassword && <p className='danger'>{error.confirmedPassword}</p>}
															</div>
														</div>
														<div className="modal-footer d-flex justify-content-center">
															<button className="btn btn-default" onClick={handleSubmit}>Confirmar</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-6">
											<button onClick={logout} className="adam-button adamcustom">Logout</button>
										</div>
									</div>
									<ul className="social-link list-unstyled m-t-40 m-b-10">
										<li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
										<li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
										<li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}


export default Profile;