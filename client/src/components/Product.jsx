import React, { useState } from 'react';


import './Product.css'


export default function Product({ product }) {

	const [count, setCount] = useState(1);

	if(!product) {return <h1>Loading...</h1>}

	//const img = image;
	const { name, image, price, description, id} = product
	//console.log(props.product)

	
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
									<button className="btn btn-outline-secondary buttom-left" type="button" onClick={() => {
										if(count === 1) {
											return 1
										}
										setCount(count - 1)}}>-</button>
								</div>
								<input type="text" className="form-control cantidades" id="inlineFormInputGroupUsername2" placeholder="0" value={count}/>
								<div className="input-group-prepend">
									<button className="btn btn-outline-secondary buttom-right" type="button" onClick={() => setCount(count + 1)}>+</button>
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<input type="submit" className="js-addtocart js-prod-submit-form btn btn-primary btn-block mb-4 cart" value="Agregar al carrito" />
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
