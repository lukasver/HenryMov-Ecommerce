import React from 'react';
import ProductCard from './ProductCard.jsx'

export default function Catalogue({catalogue}) {
	if (catalogue) {
		return (
			<div>
	//=======Ver si la tarjeta del catalogo necesita tanta info============
				{catalogue.map(pc => <ProductCard
					key={pc.producId}
					name={pc.name}
					description={pc.description}
					price={pc.price}
					availability={pc.availability}
					stock={pc.stock}
					quantity={pc.quantity}
					image={pc.image}					
				/> )}
			</div>
		);
	} else {
		<h3>Without products.</h3>
	}
}
