import React, {useState} from 'react';
import { counter } from '../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import ProductCard from './ProductCard.jsx';
import LoadingBar from './LoadingBar.jsx';
import * as action from '../redux/Action';
import './Catalogue.css';

function Catalogue() {
	
	const totalProds = useSelector(store => store.totalProds) //get productos and filter and listado
	const categories = useSelector(store => store.categories) // categories
	const totalProdsFilter = useSelector(store => store.totalProdsFilter)
	const dispatch = useDispatch()


	// =================================================
	//	 PAGINACION
	// =================================================

	const [pageActual, setPageActual] = useState(1); // pagina mostrando actualmente
    const prodsPorPage =12  // cantidad de items por página

    const indexOfLastProd = pageActual * prodsPorPage; // indice primer prod de la página
    const indexOfFirstProd = indexOfLastProd - prodsPorPage; // indice último prod de la página
    let currentProds = totalProds.slice(indexOfFirstProd, indexOfLastProd) // productos a mostrar por página

	let pageNumbers = [] // mapea la cantida de botones a mostrar según el número de páginas requerido
    for (let i = 1; i <= Math.ceil(totalProdsFilter.length ? totalProdsFilter.length / prodsPorPage : totalProds.length / prodsPorPage); i++) {
        pageNumbers.push(i);
    }

	// =================================================
	//	 FILTRADO POR CATEGORÍAS
	// =================================================
	
	let categorias = [];
	
	function ValidatedCategories(){
		// categoriesIds son todos los id's de las categorias asignadas a productos
		// show es el array con todas las categorias asignadas a productos que retorna la funcion
		let show = [];
		let categoriesIds = [];
		
		totalProds.map(x=>{
			x.categories.map(cat =>{
				if (!categoriesIds.includes(cat.id)){
					categoriesIds.push(cat.id)
				}
			})
			return
		})
		// ordena categoriesIds de menor a mayor
		categoriesIds.sort((a, b) => a - b)
		
		categories.map(category =>{
			if (categoriesIds.includes(category.id)) show.push(category)	
			return 
		});
		return show
	}

	// =================================================
	//	 LOADING e INFO A MOSTRAR EN PRIMER RENDERIZADO
	// =================================================

	if (!totalProds.length) {
		return <LoadingBar done="75"/>

	} else {
		
		if (totalProdsFilter.length){ // Si hay productos filtrados, muestro esos productos en base al número de páginas
			currentProds = totalProdsFilter.slice(indexOfFirstProd, indexOfLastProd)
		} 

		if (!ValidatedCategories().length){
			 categorias = categories;
		} else {
			categorias = ValidatedCategories()
		}

	// =================================================
	//		handle SACA TODOS LOS FILTROS 
	// a travez de getProducts() obtenemos la lista completa de productos 
	// =================================================
	function handle(e){
		e.preventDefault()
		for (let j=0;j<categorias.length;j++){
			let elementByLoop = document.getElementById(`selection${j+1}`);
			if (elementByLoop.checked){
				elementByLoop.checked = false;
			}
		}
		dispatch(action.deleteFilter())
		setPageActual(1)
	}

	
	function handleFilter(){
		let filtered = [];
		for (let j=0;j<categorias.length;j++){
			let elementByLoop = document.getElementById(`selection${j+1}`);
			if (elementByLoop.checked){
				filtered.push(categorias[j].name)
			}
		}
		setPageActual(1)
		dispatch(action.filterbyCategories(filtered))
	}

	// =================================================


		
		let checkId = counter()
		let checkFor = counter()
		return (
			<div className="container1">
				<div className="main row">
					<div className="col-md-3 sidebar-left">
						<div className="sticky">
							<h2>Categorías:</h2>
							{categorias.map(category =>
								<div className="custom-control custom-checkbox categoryList" key={category.id}>
									<input value={false} name={category.name} /*onClick={handlecheck} */ type="checkbox" className="custom-control-input" id={`selection${checkId()}`} />
									<label className="custom-control-label" htmlFor={`selection${checkFor()}`}>{category.name}</label>
								</div>
							)}
							<button onClick={handleFilter} type="button" className="btn btn-primary mt-2 arglbtn">Filtrar</button>
							<p/>
							<button onClick={handle} type="button" className="btn btn-primary mt-3">Mostrar todo</button>
						</div>
					</div>
					<div className="col-md-9 row border-left">
						{currentProds.map(prod =>
							<div key={prod.id} className="card-group col-md-3">
								<ProductCard
									key={prod.id}
									id={prod.id}
									name={prod.name}
									description={prod.description}
									price={prod.price}
									image={prod.image}
									count={prod.count}
									stock={prod.stock}
								/>
							</div>)}
						{/* BOTONES DE PAGINACION */}
		              	<nav className="col-md-12 row pagcenter">
		                    <ul className="pagination">
		                        {pageNumbers.map((numero, i) => (
		                        	<li key={i} className="page-item">
		                         		<a onClick={(e) => {e.preventDefault(); setPageActual(numero)}} className="page-link">{numero}</a>
		                        	</li>
		                   		 ))}
		                    </ul>
		                </nav>
		                {/* FIN BOTONES DE PAGINACION */}
					</div>
				</div>

			</div>
		)
	}
}

export default Catalogue;

