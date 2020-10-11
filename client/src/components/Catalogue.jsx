import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import './Catalogue.css';
import loading from '../img/loading.gif';
import { counter } from '../utils/utils';

function Catalogue({categories, listado, filterbyCategory, getProducts}) {
	
	
	
	// =================================================
	//		handle SACA TODOS LOS FILTROS 
	// a travez de getProducts() obtenemos la lista completa de productos 
	// =================================================
	function handle(){
		for (let j=0;j<categories.length;j++){
			let elementByParameter = document.getElementById(`selection${j+1}`)	
			if (!!elementByParameter.checked){
				elementByParameter.checked = false
			}
		}
		getProducts()
	}
	// =================================================
	//		handlecheck busca por categoria
	//	busca segun los filtros seleccionados usando la ruta de /products/category/categoryName 
	//	que tenemos en la parte del backend y luego borra los checkbox sobrantes (ya que por ahora 
	// 	buscamos por 1 categoria) 
	// =================================================

	function handlecheck(e){			
		let elementByParameter = document.getElementById(e.target.id)
		for (let j=0;j<categories.length;j++){
			let elementByLoop = document.getElementById(`selection${j+1}`); 
			if (elementByLoop.checked){
				filterbyCategory(categories[j].name)
			}
			if( elementByLoop !== elementByParameter){
				elementByLoop.checked = false
			}
		}
	}
	
	// =================================================

	if (listado.length === 0) {
		return <img className="rounded mx-auto d-block" src={loading} />
	} else {

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
									<input onClick={handlecheck} type="checkbox" className="custom-control-input" id={`selection${checkId()}`} />
									<label className="custom-control-label" for={`selection${checkFor()}`}>{category.name}</label>
								</div>
							)}
							<button onClick={handle} type="button" className="btn btn-primary">Browse All</button>
						</div>
					</div>
					<div className="col-md-9 row">
						{listado.map(prod =>
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

