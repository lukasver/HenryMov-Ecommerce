import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../redux/Action'
import './Product.css'


export default function Product({ product }) {
	const [disponible, setDisponible] = useState(true)
	const [render, setRen] = useState(true)
	const count = useSelector(store => store.count)
	const dispatch = useDispatch()
	useEffect(() => {
		stocker(product)
	}, [render, count])
	if (!product) {
		return <div class="spinner-border text-info" role="status">
			<span class="sr-only">Loading...</span>
		</div>
	}


	const { name, image, price, description, id, stock } = product
  
	function handleAdd() {
		render ? setRen(false) : setRen(true)
		product.count = count
		let recoveredData = localStorage.getItem('prod')
		let search = JSON.parse(recoveredData)

		if (!recoveredData) {
			let countCart = 1
			localStorage.setItem('count', countCart)
			dispatch(action.countCart())
			return localStorage.setItem('prod', JSON.stringify([product]))
		}

		let fined = search.find(prod => prod.id == id)
		if (fined) {
			fined.count++
			let cleanData = search.filter((data) => data.id !== product.id)
			cleanData.push(fined)
			return localStorage.setItem('prod', JSON.stringify(cleanData))
		}
		let data = JSON.parse(recoveredData)
		let newProd = product
		data.push(newProd)
		let countCart = data.length
		localStorage.setItem('count', countCart)
		localStorage.setItem('prod', JSON.stringify(data))
		dispatch(action.countCart())
	}
	function stocker(product) {
		let products = JSON.parse(localStorage.getItem('prod'))
		if(products == null){
			return
		} 
		let cleanData = products.filter((data) => data.id == product.id)
		console.log('stocke de clean', cleanData)
		if(cleanData.length != 0){
			return setDisponible(false)
		}
		return 
	}

	return (
		<div className="container">
			<div className="main row single-page">
				<br /><br />
				<div className="col-md-7">
					<img src={image} className="card-img" alt="Product Image" />
				</div>
				<div className="col-md-5 content-rigth">
					<h1 className="h2 h1-md mb-3 js-product-name titulo-producto">{name}</h1>
					<h5>{description}</h5>
					<h3 className="precio-producto">{`$ ${price * count}`}</h3>
										
				{/*BOTON DE AVISO CUANDO NO HAY STOCK*/}
					{stock == 0 && <button className="btn btn-danger" style={{"margin-bottom": "20px"}}>Producto sin Stock 😖 </button>}
					{stock != 0 ? 
						 disponible ? 
						<div className="row buttom-comprar">
						<div className="col-md-4">
							<td><input type="button" class="btn btn-outline-primary" value='-' onClick={() => count > 1 && dispatch(action.removecount())} />
								<input class="btn btn-primary" type="button" value={count} />
								<input type="button" class="btn btn-outline-primary" value='+' onClick={() => dispatch(action.addcount(stock))} />
							</td>
						</div>
						<div className="col-md-8">
							<button type="button" class="btn btn-primary btn-m" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="atencion" onClick={handleAdd} >Agregar a su carrito</button>
							{/* <input type="submit" className="js-addtocart js-prod-submit-form btn btn-primary btn-block mb-4 cart" value="Agregar al carrito" onClick={e=>handleAdd}/> */}
						</div>
						<div class="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
							<div class="modal-dialog modal-dialog-centered" role="document">
								<div class="modal-content">
									<div class="modal-header-title ">
										
										<h6 class="modal-title p-3 mb-2 bg-dark text-white" id="exampleModalLongTitle">Felicitaciones!!!!</h6>
									</div>
									<div className="modal-body alert alert-success ">
										Tu producto se agrego al carrito con exito
										</div>
									<a href="/carrito" type="button" class="btn btn-outline-success"  >Ir al carrito</a>
								</div>
							</div>
						</div>
					</div>
					:
					<div class="alert alert-success" role="alert">
					Este producto ya esta en el carrito  <a type="button" class="btn btn-outline-primary" href='/carrito'>Ir al carrito</a>
					</div>					:null}
					
					{/* <button type="checkbox" class="btn btn-outline-primary far fa-thumbs-up"></button>
					<i class="far fa-thumbs-down"></i> */}

					<p>Local Microcentro - Tacuarí 28 CABA, Buenos Aires. Horario: de Lunes a Viernes de 11 hs a 14.30 hs y de 15.30 hs.</p>
					<div className="form-row mb-4 ">
						<div className="col-11 form-label">
							<div className="mb-1 font-weight-bold">Enviamos a todo el país</div>
							<div>Entregamos a todo el pais por meracdo envios, despachamos dentro de las 24hs de recibida tu compra.</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};
