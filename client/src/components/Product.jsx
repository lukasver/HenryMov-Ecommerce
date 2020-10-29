import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../redux/Action';
import Reviews from './reviews/Reviews';
import { handleAdd , stocker} from '../utils/product';
import './Product.css';
import { useHistory } from "react-router-dom";



export default function Product({ product }) {
	const count = useSelector(store => store.count)
	const [disponible, setDisponible] = useState(true)
	const [render, setRen] = useState(true)
	const dispatch = useDispatch()
	const history = useHistory()
	
	useEffect(() => {
		 product && first()
	}, [ render,disponible])
	
	if (!product) { 
		return <div className="spinner-border text-info" role="status">
			<span className="sr-only">Loading...</span>
		</div>
	}
			const { name, image, price, description, id, stock } = product


	function goBack() {
		history.goBack()
		return
	}

	function first(){
		setDisponible(stocker(product))
	}
	

	function complete(){
		handleAdd(product,dispatch, count)
		setDisponible(stocker(product))
		render ? setRen(false) : setRen(true)
	}

	return (
		<div className="container">
			<div className="main row single-page">
				<br /><br />
				<div className="col-md-7">
					<img src={image} className="card-img" alt="Product Image" />
				</div>
				<div className="col-md-5 content-rigth">
					<button onClick={goBack}className="backbuttn adam-chng"><i className='fas fa-arrow-circle-left'></i></button>
					<h1 className="h2 h1-md mb-3 js-product-name titulo-producto">{name}</h1>
					{/* Llamo al componente Reviews para mostrar el promedio de puntaje de reviews del producto */}
					<Reviews id={product.id} value='prom' /* MANDAR VALUE */ />
					<h5>{description}</h5>
					<h3 className="precio-producto">{`$ ${price * count}`}</h3>

					{/*BOTON DE AVISO CUANDO NO HAY STOCK*/}

					{stock === 0 && <button className="btn btn-danger" style={{ "margin-bottom": "20px" }}>Producto sin Stock 😖 </button>}
					{stock !== 0 ?
						disponible !== false ?
							<div className="row buttom-comprar">
								<div className="col-md-4">
									<td><input type="button" class="btn btn-outline-primary" value='-' onClick={() => count > 1 && dispatch(action.removecount())} />
										<input class="btn btn-primary" type="button" value={count} />
										<input type="button" class="btn btn-outline-primary" value='+' onClick={() => dispatch(action.addcount(stock))} />
									</td>
								</div>
								<div className="col-md-8">
									<button type="button" class="btn btn-primary btn-m" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="atencion" onClick={()=>complete()} >Agregar a su carrito</button>
									{/* <input type="submit" className="js-addtocart js-prod-submit-form btn btn-primary btn-block mb-4 cart" value="Agregar al carrito" onClick={e=>handleAdd}/> */}
								</div>
								<div class="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
									<div class="modal-dialog modal-dialog-centered" role="document">
										<div class="modal-content">
											<div class="modal-header-title ">
												<button type="button" className="close mr-3" data-dismiss="modal" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
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
							</div> : null}

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
			<div className='reviews'>
				{/* Llamo al componente reviews para cargar todas las reviews del producto */}
				{<Reviews key={product.id} id={product.id} name={product.name} value='reviews' />}
			</div>
		</div>
	)
};