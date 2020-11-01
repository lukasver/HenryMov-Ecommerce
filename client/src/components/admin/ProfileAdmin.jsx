import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBar from '../LoadingBar';
import { dateFormat, dateFormat2 } from '../../utils/utils.js'
import * as action from '../../redux/Action'
import './ProfileAdmin.css'
import { useHistory } from "react-router-dom";



const Profile = ({profileId}) => {


	const pase = localStorage.getItem('role');
	const history = useHistory()
 if (pase !== 'Admin' && pase !== 'Responsable') {
    history.push('/')
  }

	const dispatch = ' '

	const [user, setUser] = useState(false)

	async function getter() {
	const user = await axios.get(`http://localhost:3001/user/${profileId}`, {withCredentials: true})
	await setUser(user.data)
	}

	if(!user) getter()

	useEffect(() => {
	},[user])

	if (!user) return <LoadingBar done="80" />


const handleReactivate = async () => {
    const rta = await axios.put(`http://localhost:3001/user/${profileId}`, {status: "Activo"} ,{withCredentials: true})
	if (rta.status === 200) {
		window.alert('Usuario reactivado con éxito')
		return history.push('/admin/users')}
	if (rta.status !== 200) return window.alert('Hubo un error... Intentar más tarde.')
    return

}

const handleDelete = async () => {
	const rta = await axios.delete(`http://localhost:3001/user/${profileId}`, {status: "Activo"} ,{withCredentials: true})
	console.log(rta)
	if (rta.status === 200) {
		window.alert('Usuario Eliminado definitivamente')
		return history.push('/admin/users')}
	if (rta.status !== 200) return window.alert('Hubo un error... Intentar más tarde.')
    return
}

function goBack() {
    history.goBack()
    return
}


	return(
		<div className="container mt-5 mb-5" id="page-content">
		    <div className="padding">
{/*		    	<button onClick={goBack} className="adam-chng"><i className='fas fa-arrow-circle-left'></i></button>*/}
		        <div className="row container d-flex justify-content-center">
		            <div className="col-xl-6 col-md-12">
		                <div className="row user-card-full">
		                        <div className="col-sm-4 bg-c-lite-green user-profile">
		                            <div className="card-block text-center text-white">
		                                <div className="m-b-25"> <img src={user.image} className="img-radius" alt="User-Profile-Image"/> </div>
		                                <h6>{user.name} {user.lastname}</h6>
		                                <p >{user.role}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
		                            </div>
		                         {/*   <div className="custom-file">
									  <input type="file" name="image" className="custom-file-input" id="customFile"/>
									  <label className="custom-file-label" for="customFile">Cambiar Foto</label>
									  <button className="mt-1 adam-button" style={{width: "100%"}} onClick={handleImage}>enviar</button>
									</div>*/}
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
		                                        <h6 className="text-muted f-w-400">{dateFormat2(user.birthdate)}</h6>
		                                    </div>
		                                    <div className="col-sm-6">
		                                        <p className="m-b-10 f-w-600"> Fecha Alta </p>
		                                        <h6 className="text-muted f-w-400">{dateFormat2(user.creationdate)}</h6>
		                                    </div>
		                                </div>

		                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
		                                {(user.status === "Inactivo") &&
		                                <div className="row">
											<div className="col-sm-12">
												<p className="m-b-10 f-w-600">Dirección</p>
												<p>{user.address}</p>
											</div>
		                                </div>}
		                                {(user.status === "Inactivo") &&
		                       	         <div className="row justify-content-center">
		                                	<div className="col-sm-6">
		                                	<button onClick={handleReactivate} className="adam-button adamcustom">Reactivar</button>
		                                	</div>
		                                	<div className="col-sm-6">
                							<button onClick={e => (window.confirm("Eliminar un usuario de la Base de Datos es una acción irreversible, esta seguro de que desea eliminar al usuario definitivamente?") && handleDelete(e))} className="adam-button adamcustom">Eliminar Definitivo</button>
		                                	</div>
		                                </div>}
{/*
		                                <ul className="social-link list-unstyled m-t-40 m-b-10">
		                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
		                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
		                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
		                                </ul>*/}
		                                <button onClick={goBack} className="adam-button adamcustom">Regresar...</button>
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