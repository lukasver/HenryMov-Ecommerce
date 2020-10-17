import React from 'react';
import ProductCard from './ProductCard.jsx';
import './Catalogue.css';
import loading from '../img/loading.gif';
import { counter } from '../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../redux/Action'

function Catalogue() {
	
	const totalProds = useSelector(store => store.totalProds) //get productos and filter and listado
	const categories = useSelector(store => store.categories) // categories
	const totalProdsFilter = useSelector(store => store.totalProdsFilter)
	const dispatch = useDispatch()
	// const [listado, setListado] = useState([])

	let listado = [];
	// useEffect(()=>{
	// 	setListadoProductos(totalProds)
	// },[totalProds,listadoProductos])
	
	// console.log(categories)
	// =================================================
	//		handle SACA TODOS LOS FILTROS 
	// a travez de getProducts() obtenemos la lista completa de productos 
	// =================================================
	function handle(e){
		e.preventDefault()
		for (let j=0;j<categories.length;j++){
			let elementByLoop = document.getElementById(`selection${j+1}`);
			if (elementByLoop.checked){
				elementByLoop.checked = false;
			}
		}
		dispatch(action.deleteFilter())
	}
	// =================================================
	//		handlecheck busca por categoria
	//	busca segun los filtros seleccionados usando la ruta de /products/category/categoryName 
	//	que tenemos en la parte del backend y luego borra los checkbox sobrantes (ya que por ahora 
	// 	buscamos por 1 categoria, luego) 
	// =================================================
	
	function handlecheck(e){
		let elementByParameter = document.getElementById(e.target.id)
		let name = e.target.name
		dispatch(action.filterbyCategory(name,elementByParameter.checked))
		return
	}
	
	// =================================================

	if (totalProds.length === 0) {
		return <img className="rounded mx-auto d-block" src={loading} />
	} else {
		
		if (totalProdsFilter.length == 0){
			listado = totalProds
		} else{
			listado = totalProdsFilter
		}

		let checkId = counter()
		let checkFor = counter()
		return (
			<div className="container1">
				<div className="main row">
					<div className="col-md-3 sidebar-left">
						<div className="sticky">
							<h2>Categorías:</h2>
							{categories.map(category =>
								<div className="custom-control custom-checkbox categoryList">
									<input value={false} name={category.name} onClick={handlecheck} type="checkbox" className="custom-control-input" id={`selection${checkId()}`} />
									<label className="custom-control-label" for={`selection${checkFor()}`}>{category.name}</label>
								</div>
							)}
							<button onClick={handle} type="button" className="btn btn-primary mt-2">Browse All</button>
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

