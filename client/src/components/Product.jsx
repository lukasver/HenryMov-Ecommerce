import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../redux/Action'
import './Product.css'


export default function Product({ product }) {

	useEffect(()=>{
		
	},[])
	const count = useSelector(store => store.count)
	const dispatch = useDispatch()

	if (!product) { return <h1>Loading...</h1> }

	const { name, image, price, description, id } = product

	function counter() {
		product.count = count
	}
	
	function handleAdd() {
		
		
		let recoveredData = localStorage.getItem('prod')
		let search = JSON.parse(recoveredData)
	
		if (!recoveredData) {
			dispatch(action.countCart())
			let countCart = 1
			localStorage.setItem('count',countCart )
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
		dispatch(action.countCart())
		let countCart = data.length
		
		localStorage.setItem('prod', JSON.stringify(data))
		return localStorage.setItem('count',countCart )
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
					<h2>{description}</h2>
					<h3 className="precio-producto">{`$ ${price * count}`}</h3>
					<div className="row buttom-comprar">
						<div className="col-md-4">
							<div className="input-group mb-2 mr-sm-2">
								<div className="input-group-prepend">
									<button className="btn btn-outline-secondary buttom-left" type="button" onChange={counter()} onClick={() => {
										if (count === 1) {
											return 1
										}
										dispatch(action.removecount())
									}}>-</button>
								</div>
								<input type="text" className="form-control cantidades" id="inlineFormInputGroupUsername2" placeholder="0" value={count} />
								<div className="input-group-prepend">
									<button className="btn btn-outline-secondary buttom-right" type="button" onClick={() => dispatch(action.addcount())} onChange={counter()}>+</button>
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<button type="button" class="btn btn-primary btn-m" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="atencion" onClick={handleAdd} >Agregar a su carrito</button>
							{/* <input type="submit" className="js-addtocart js-prod-submit-form btn btn-primary btn-block mb-4 cart" value="Agregar al carrito" onClick={e=>handleAdd}/> */}
						</div>
						<div class="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
							<div class="modal-dialog modal-dialog-centered" role="document">
								<div class="modal-content">
									<div class="modal-header-title ">
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
										<h6 class="modal-title p-3 mb-2 bg-primary text-white" id="exampleModalLongTitle">Felicitaciones!!!!</h6>
									</div>
									<div className="modal-body alert alert-success ">
										Tu producto se agrego al carrito con exito
										</div>

								</div>
							</div>
						</div>
					</div>
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
