import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBar from '../LoadingBar';
import { dateFormat } from '../../utils/utils.js'
import * as action from '../../redux/Action'
import './Profile.css'

const Profile = () => {

const [toogle, setToogle] = useState(false)

useEffect(()=>{

	},[toogle])

const user = useSelector(store => store.loggedIn)
const dispatch = useDispatch()

const logout = () => { 
    dispatch(action.logIn(false))
    localStorage.removeItem('id')
	localStorage.removeItem('role')
	localStorage.removeItem('email')
    axios.get('http://localhost:3001/auth/logout', {withCredentials:true})
    window.location.replace('http://localhost:3000')
}

if (!user) {return <LoadingBar done="80" />}


	const handleImage = (e) => {
        const imagenUrl = document.getElementById('customFile').files[0] //como lo ves? funcara?

        console.log(imagenUrl)
        const formData = new FormData(); 
        formData.append('image', imagenUrl) 

        axios({
            method: 'post',
            url: `http://localhost:3001/user/${user.id}/image`,
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data'}, withCredentials: true }
        })
        .then(data => { 
        	window.location.reload()
        	console.log(data)})
        .catch(error =>{
        	new Error(error)
        })
    return
	}

	const handleModifySend = (e) => {
		
	}

	const handleModify = (e) => {
		setToogle(!toogle)
		console.log(toogle)
	}


	return(


		<div className="container mt-5 mb-5" id="page-content">
		    <div className="padding">
		        <div className="row container d-flex justify-content-center">
		            <div className="col-xl-6 col-md-12">
		                <div className="row user-card-full">
		                        <div className="col-sm-4 bg-c-lite-green user-profile">
		                            <div className="card-block text-center text-white">
		                                <div className="m-b-25"> <img src={user.image} className="img-radius" alt="User-Profile-Image"/> </div>
		                                <h6>{!toogle ? `${user.name} ${user.lastname}` : (<form><input type="text" placeholder="Nombre"/><input type="text" placeholder="Apellido"></input></form>)}</h6>
		                                <p >{user.role}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
		                            </div>
		                            {!toogle && <div className="custom-file">
									  <input type="file" name="image" className="custom-file-input" id="customFile"/>
									  <label className="custom-file-label" for="customFile">Cambiar Foto</label>
									  <button className="mt-1 adam-button" style={{width: "100%"}} onClick={handleImage}>enviar</button>
									</div>}
		                        </div>
		                        <div className="col-sm-8">
		                            <div className="card-block">
		                                <h3 className="m-b-20 p-b-5 b-b-default f-w-600">Información 	 
		                                <a style={{color: "black", cursor: "pointer"}} className="iconTable"> <i className="far fa-edit" id={user.id} onClick={handleModify}></i></a></h3>
		                                <div className="row">
		                                    <div className="col-sm-6">
		                                        <p className="m-b-10 f-w-600">Email</p>
		                                        <h6 className="text-muted f-w-400">{user.email}</h6>
		                                    </div>
		                                    <div className="col-sm-6">
		                                        <p className="m-b-10 f-w-600">Teléfono</p>
		                                        <h6 className="text-muted f-w-400">{!toogle ? user.phone  : <input type="text" placeholder="Actualizar"></input>}</h6>
		                                    </div>
		                                </div>
		                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
		                                <div className="row">
		                                    <div className="col-sm-6">
		                                        <p className="m-b-10 f-w-600">Cumpleaños</p>
		                                        <h6 className="text-muted f-w-400">{!toogle ? dateFormat(user.birthdate) : <input type="text" placeholder="Actualizar"></input>}</h6>
		                                    </div>
		                                    <div className="col-sm-6">
		                                        <p className="m-b-10 f-w-600"> Fecha Alta </p>
		                                        <h6 className="text-muted f-w-400">{!toogle ? dateFormat(user.creationdate) : <input type="text" placeholder="Actualizar"></input>}</h6>
		                                    </div>
		                                </div>
		                                {!toogle && <div className="row mt-5 pt-5 justify-content-center">
		                                	<div className="col-sm-6">
		                                	<Link to="/reset"><button className="adam-button adamcustom">Reset password</button></Link>
		                                	</div>
		                                	<div className="col-sm-6">
                							<button onClick={logout} className="adam-button adamcustom">Logout</button>
		                                	</div>
		                                </div>}
		                                {toogle && <button onClick={handleModifySend} className="adam-button adamcustom">Confirmar Cambios</button>}

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