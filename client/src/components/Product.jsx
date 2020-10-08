import React from 'react';
import image from '../img/patinetaPrueba.png'
import './Product.css'

export default function Product(props) {
	//const img = image;
	return (
		// <div>
		// 	<img src={image} alt="product image"/>
		// 	<article>
		// 		<h2>hola</h2>				
		// 		<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus excepturi atque alias esse cumque provident nisi velit, adipisci praesentium, laborum eius, perspiciatis facilis vel hic. Libero omnis cum provident voluptatibus?</p>
		// 		<h3>39</h3>
		// 		<h5>Habilitado: Si</h5>
		// 		<h5>10 unidades</h5>
		// 		<h5>1</h5>
		// 	</article> 
		// </div>
		<div className="card mb-3" >
			<div className="row no-gutters">
				<div className="col-md-4">
					<img src={image} className="card-img" alt="Product Image" />
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">Patineta</h5>
						<div >
							<span >$1799</span>
						</div>
						<div className='col'>
							<div className="col-4">
								<div className="form-group js-quantity form-quantity">
									<div className="form-row m-0 align-items-center">
										<span className="js-quantity-down form-quantity-icon btn">
											<svg className="icon-inline icon-w-12 icon-lg" xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 384 512">
												<path d="M368 224H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h352c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z">
												</path>
											</svg>
										</span>
										<div className="form-control-container col">
											<input type="number" className="form-control js-quantity-input form-control-inline"
												autocorrect="off" autocapitalize="off" name="quantity" value="1" min="1"
												aria-label="Cambiar cantidad" />
										</div>
										<span className="js-quantity-up form-quantity-icon btn">
											<svg className="icon-inline icon-w-12 icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
												<path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 
											16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z">
												</path>
											</svg>
										</span>
									</div>
								</div>
							</div>
							<div>
								<input type='submit' className='js-addtocart js-prod-submit-form btn btn-primary btn-block mb-4 cart' value='Agregar al Carrito' />
							</div>
						</div>
						<p className="card-text">
							<span>Description</span>
							<br />
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This content is a little bit longer.
						</p>
						<p className="card-text">
							<small className="text-muted">
								Last updated 3 mins ago
							</small>
						</p>
					</div>


				</div>
			</div>
		</div>
	)
};
