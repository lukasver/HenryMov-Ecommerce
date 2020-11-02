import React from 'react';
import Sandbag from '../img/sandbag.png';
import './ComponenteError.css';


const ComponenteError = ({data}) => {

	return (
		<div className='container center mt-5 mb-3'>
			<h1 className='cperror'>No hay {data ? data : 'órdenes' } aún...</h1>
			<img src={Sandbag} height="auto" width="auto"/>
		</div>
	)


}


export default ComponenteError;