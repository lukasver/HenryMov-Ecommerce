import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import './Catalogue.css';
import loading from '../img/loading.gif';
import { counter } from '../utils/utils';

function Catalogue(props) {
	// const [productos, setProductos] = useState(null)
	const [categories, setCategories] = useState(['Scooters', 'Skates', 'Windsurf', 'Bikes'])

	if (props.listado.length === 0) {
		return <img className="rounded mx-auto d-block" src={loading} />
	} else {


		// =================================================
		//		Styled components
		// =================================================

		// =================================================
		//		Carga de productos desde la BD
		// =================================================

		// useEffect(() => {
		// 	axios.get('http://localhost:3001/products')
		// 	.then(productosDB => {
		// 		const {data} = productosDB
		// 		return data
		// 	})
		// 	.then(listadoProductos => {
		// 		setProductos(listadoProductos)
		// 	})
		// 	.catch(err => new Error(err))
		// },[]) // este array vacío es para cortar el loop de useEffect

		// handleBrowseAll = () => {
		// 	console.log('hola')
		// }



		// ==================================================
		//	Loading Screen hasta que se resuelve la peticion
		// ==================================================

		// if (props === null) {
		// 	return <img className="rounded mx-auto d-block" src={loading}/>
		// } 

		// ==================================================
		//	Counters para los checkboxes
		// ==================================================

		let checkId = counter()
		let checkFor = counter()


		return (
			<div className="container">
				<div className="main row">
					<div className="col-md-3">
						<div className="sticky">
							<h2>Categorías:</h2>
							{categories.map(category =>
								<div className="custom-control custom-checkbox">
									<input type="checkbox" className="custom-control-input" id={`selection${checkId()}`} />
									<label className="custom-control-label" for={`selection${checkFor()}`}>{category}</label>
								</div>
							)}
							<button type="button" className="btn btn-primary">Browse All</button>
						</div>
					</div>
					<div className="col-md-9 row">
						{props.listado.map(prod =>
							<div className="card-group col-md-3">
								<ProductCard
									key={prod.id}
									id={prod.id}
									name={prod.name}
									description={prod.description}
									price={prod.price}
									image={prod.image}
								/>
							</div>)}
					</div>
				</div>

			</div>
		)
	}
}

export default Catalogue;

