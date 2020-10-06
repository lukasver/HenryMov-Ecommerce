import React from 'react';
import ProductCard from './ProductCard.jsx'

export default function ProductCatalogue({productCatalogue}) {
	if (productCatalogue) {
		return (
			<div>
				{productCatalogue.map(pc => <ProductCard
					key={pc.producId}
					name={pc.name}
					description={pc.description}
					price={pc.price}
					availability={pc.availability}
					stock={pc.stock}
					quantity={pc.quantity}
					image={pc.image}					
				/> )}
			</div> <!-- row.// -->
		);
	} else {
		<h3>Without products.</h3>
	}
}
