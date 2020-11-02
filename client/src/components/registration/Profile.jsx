import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from '../LoadingBar';
import {  dateFormat2 } from '../../utils/utils.js'
import * as action from '../../redux/Action'
import './Profile.css'

const Profile = () => {

	// INFO QUE VIENE DE REDUX Y LOCALSTORAGE SOBRE EL USUARIO

	let id = localStorage.getItem('id')
	let products = JSON.parse(localStorage.getItem('prod'))
	let user = useSelector(store => store.loggedIn)
	const dispatch = useDispatch()

	// ESTADOS LOCALES GENERADOS

	const [imgName, setImgName] = useState('Cargar Imagen')
	const [toogle, setToogle] = useState(false)
	const [modProfile, setModProfile] = useState({
	    name: '',
	    lastname: '',
	    phone: '',
	    birthdate: '',
	    address: ''
	});
	const [values, setValues] = useState({
		password: ''
	})
	const [error, setError] = useState({});

	// USE EFFECT PARA RERENDERIZAR LOS CAMBIOS

	useEffect(()=>{
		setModProfile({
	    name: user.name,
	    lastname: user.lastname,
	    phone: user.phone,
	    birthdate: user.birthdate,
	    address: user.address
		})
		},[toogle, imgName])


	// ===================================
	// ====== FUNCIONES // HANDLERS ======
	// ===================================

	// HANDLER PARA MODIFICAR DATOS DEL PROFILE
	const handleModProfile = (e) => {
		const { name, value } = e.target

		setModProfile({
			...modProfile,
			[name]: value
		})
	}

	// HANDLER PARA EL PASSWORD RESET
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

	// VALIDADOR DE INPUTS PARA EL PASSWORD RESET
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

	// FUNCION PARA DESLOGEAR AL USER Y BORRAR LOS INDICADORES/STORAGE/REDUX/COOKIES
	const logout = () => {
		dispatch(action.logIn(false))
        dispatch(action.updateCart( products, id))
		localStorage.clear()
		axios.get('http://localhost:3001/auth/logout', { withCredentials: true })
		window.location.replace('http://localhost:3000')
	}

	// FUNCION PARA TRASLADAS EL NOMBRE DE LA IMAGEN AL INPUT DE MODIFICAR FOTO DE PERFIL
	const nameImage = (e) => {
		setImgName(e.target.files[0].name.substring(0, 20)+"...")
	}

	// FUNCION QUE ENVÍA LA NUEVA FOTO DE PERFIL A LA DB Y MANEJA ERRORES
	const handleImage = (e) => {
		const imagenUrl = document.getElementById('customFile').files[0] //como lo ves? funcara?
		if (!imagenUrl) {
			document.getElementById('avatar').disabled = true;
			var warning = document.getElementById("sendAvatar")
			if(warning.hasChildNodes()) warning.removeChild(warning.childNodes[0])
			var texto = document.createTextNode("Cargar una imagen...")
			warning.appendChild(texto)
			setTimeout(()=> {warning.removeChild(warning.childNodes[0]); document.getElementById('avatar').disabled = false},2000)
			return
		}
		const formData = new FormData();
		formData.append('image', imagenUrl)

		axios({
			method: 'post',
			url: `http://localhost:3001/user/${user.id}/image`,
			data: formData,
			config: { headers: { 'Content-Type': 'multipart/form-data' }}
		})
			.then(data => {
				window.location.reload()
			})
			.catch(error => {
				new Error(error)
			})
		return
	}


	// FUNCION QUE ENVÍA LA NUEVA PASSWORD A LA DB
	const handleSubmit = e => {
		
		e.preventDefault();
		if(!values.password.length || values.password.length < 8){
			return window.alert('Debe completar los campos')
		}
		else{
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
        
    }

    // FUNCION QUE ENVÍA LOS CAMBIOS DE DATOS DEL PROFILE A LA DB (NO INCLUYE IMG)
	const handleModifySend = async (e) => {
		const rta = await axios.put(`http://localhost:3001/user/${user.id}`, modProfile ,{withCredentials: true})
		if (rta.status === 200) return window.location.reload()
		if (rta.status !== 200) return window.alert('Hubo un error... Intentar más tarde.')
		return
		
	}

	// FUNCIÓN QUE GESTIONA EL CLICK EN EL BOTON PARA MODIFICAR DATOS DEL USUARIO
	const handleModify = (e) => {
		setToogle(!toogle)
	}


	// COMPONENTE LOADING MIENTRAS SE CARGAN TODOS LOS DATOS...
	if (!user) {return <LoadingBar done="80" />}


	return(


		<div className="container mt-5 mb-5" id="page-content">
		    <div className="padding">
		        <div className="row container d-flex justify-content-center">
		            <div className="col-xl-6 col-md-12">
		                <div className="row user-card-full">
		                        <div className="col-sm-4 bg-c-lite-green user-profile">
		                            <div className="card-block text-center text-white">
		                                <div className="m-b-25"> <img src={user.image} className="img-radius" alt="User-Profile"/> </div>
		                                <h6>{!toogle ? `${user.name} ${user.lastname}` : (<form><input className="form-control" onChange={handleModProfile} name='name' value={modProfile.name} type="text" placeholder="Nombre"/><input style={{"margin-top": "5px"}}className="form-control" onChange={handleModProfile} value={modProfile.lastname} name='lastname' type="text" placeholder="Apellido"></input></form>)}</h6>
		                                <p >{user.role}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
		                            </div>
		                            {!toogle && <div className="custom-file">
									  <input type="file" name="image" className="custom-file-input" id="customFile" onChange={nameImage}/>
									  <label className="custom-file-label" for="customFile">{imgName}</label>
									  <button id="avatar" className="mt-1 adam-button" style={{width: "100%"}} onClick={handleImage}>Cambiar Avatar</button>
									  <p style={{color: "white", "-webkit-text-stroke": "0.5px #f9ab1f"}} id="sendAvatar"></p>
									</div>}
		                        </div>
		                        <div className="col-sm-8 data-profile">
		                            <div className="card-block">
		                                <h3 className="m-b-20 p-b-5 b-b-default f-w-600">Información 	 
		                                <a style={{color: "black", cursor: "pointer"}} href='#'className="iconTable"> <i className="far fa-edit" id={user.id} onClick={handleModify}></i></a></h3>
		                                <div className="row">
		                                    <div className="col-sm-6">
		                                        <p className="m-b-10 f-w-600">Email</p>
		                                        <h6 className="text-muted f-w-400">{user.email}</h6>
		                                    </div>
		                                    <div className="col-sm-6">
		                                        <p className="m-b-10 f-w-600">Teléfono</p>
		                                        <h6 className="text-muted f-w-400">{!toogle ? user.phone  : <input onChange={handleModProfile} value={modProfile.phone} name='phone' type="text" className="form-control" placeholder="Actualizar"></input>}</h6>
		                                    </div>
		                                </div>
		                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
		                                <div className="row">
		                                    <div className="col-sm-6">
		                                        <p className="m-b-10 f-w-600">Cumpleaños</p>
		                                        <h6 className="text-muted f-w-400">{!toogle ? dateFormat2(user.birthdate) : <input name='birthdate' type="date" placeholder="Actualizar" value={modProfile.birthdate} className="form-control" onChange={handleModProfile}></input>}</h6>
		                                    </div>
		                                    <div className="col-sm-6">
		                                        <p className="m-b-10 f-w-600"> Fecha Alta </p>
		                                        <h6 className="text-muted f-w-400">{dateFormat2(user.creationdate)}</h6>
		                                    </div>
		                                </div>
		                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
		                                <div className="row">
											<div className="col-sm-12">
												<p className="m-b-10 f-w-600">Dirección</p>
												<p>{!toogle ? user.address : <input name='address' type="text" placeholder="Direccion" value={modProfile.address} className="form-control" onChange={handleModProfile}></input> }</p>
											</div>
		                                </div>
		                                {!toogle && <div className="row pt-2 justify-content-center"> {/* Contenedor de los 2 botones*/}
											<div className="col-sm-6 button-profile">
											<button className="adam-button adamcustom" data-toggle="modal" data-target='#modalLoginForm' >Reset password</button>
											<div className="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
												aria-hidden="true">
												<div className="modal-dialog" role="document">
													<div className="modal-content">
														<div className="modal-header text-center">
															<h4 className="modal-title w-100 font-weight-bold" style={{color: "white"}}>Cambiar Contraseña</h4>
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
															<button className="btn btn-default confirmed" onClick={handleSubmit}>Confirmar</button>
														</div>
													</div>
												</div>
											</div>
										</div>
		                                	<div className="col-sm-6 button-profile">
                							<button onClick={logout} className="adam-button adamcustom">Logout</button>
		                                	</div>
		                                </div>}
		                                {toogle && <button onClick={e => /*(window.confirm('Segur@ que quieres actualizar tus datos?') && */handleModifySend(e)/*)*/} className="adam-button adamcustom">Confirmar Cambios</button>}

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
)}


export default Profile;