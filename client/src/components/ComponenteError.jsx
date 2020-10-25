import React from 'react';
import Sandbag from '../img/sandbag.png';
import './ComponenteError.css';


const ComponenteError = () => {

	return (
		<div className='container center mt-5 mb-3'>
			<h1 className='cperror'>No hay órdenes aún...</h1>
			<img src={Sandbag} height="auto" width="auto"/>
		</div>
	)







}


export default ComponenteError;