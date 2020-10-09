import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import './Catalogue.css';
import loading from '../img/loading.gif';
import { counter } from '../utils/utils';

function Catalogue (props) {
	const [productos, setProductos] = useState(null)
	const [categories, setCategories] = useState(['Scooters','Skates','Windsurf','Bikes'])



// =================================================
//		Carga de productos desde la BD
// =================================================


useEffect(() => {
	axios.get('http://localhost:3001/products')
	.then(productosDB => {
		const {data} = productosDB
		return data
	})
	.then(listadoProductos => {
		setProductos(listadoProductos)
	})
	.catch(err => new Error(err))
},[]) // este array vacío es para cortar el loop de useEffect



// ==================================================
//	Loading Screen hasta que se resuelve la peticion
// ==================================================

if (productos === null) {
	return <img className="rounded mx-auto d-block" src={loading}/>
}

// ==================================================
//	Counters para los checkboxes
// ==================================================

let checkId = counter()
let checkFor = counter()


	return (
			<div className="grid">
					<div className="gridsearch">
						<div className="sticky">
							<h2>Categorias</h2>
							{categories.map(category => 					
								<div class="custom-control custom-checkbox">
					 			 <input type="checkbox" class="custom-control-input" id={`customCheck${checkId()}`}/>
					 			 <label class="custom-control-label" for={`customCheck${checkFor()}`}>{category}</label>
								</div>
								)}
							<button type="button" class="btn btn-dark">Browse All</button>
						</div>
					</div>
					<div className="gridcards">
					{productos.map(prod => 
						<div>
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
				)
}

export default Catalogue;

