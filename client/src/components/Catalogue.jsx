import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import './Catalogue.css';
import loading from '../img/loading.gif';
import { counter } from '../utils/utils';
import styled from 'styled-components';

function Catalogue (props) {
	const [productos, setProductos] = useState(null)
	const [categories, setCategories] = useState(['Scooters','Skates','Windsurf','Bikes'])



// =================================================
//		Styled components
// =================================================

const Button = styled.button`
  background: black;
  color: white;
  border-radius: 3px;
  border: 2px solid orange;
  margin: 0 1em;
  padding: 0.25em 1em;
  border-radius: 5px;

  &:hover {
  	 background: orange;
 	 color: black;
 	 border: 2px solid black;
  }
`

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

// handleBrowseAll = () => {
// 	console.log('hola')
// }



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
							<h2>Categorías:</h2>
							{categories.map(category => 					
								<div className="custom-control custom-checkbox">
					 			 <input type="checkbox" className="custom-control-input" id={`selection${checkId()}`}/>
					 			 <label className="custom-control-label" for={`selection${checkFor()}`}>{category}</label>
								</div>
								)}
							<Button type="button">Browse All</Button>
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

