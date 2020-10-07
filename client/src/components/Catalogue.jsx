import React from 'react';
import ProductCard from './ProductCard.jsx'


export default function Catalogue(props) {
	//=========================Datos de Prueba ==========================
	const productos = [{
		name: 'Longboard Sector 9 Lacey C/detalles Exhibicion',
		price: '$2000',
		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg',
		description: 'Tablas con detalles ESTÉTICOS con hasta 50% de descuento. '
	}, {
		name: 'Longboard Sector 9 Lacey C/detalles Exhibicion',
		price: '$2000',
		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg',
		description: 'Tablas con detalles ESTÉTICOS con hasta 50% de descuento. '
	}, {
		name: 'Longboard Sector 9 Lacey C/detalles Exhibicion',
		price: '$2000',
		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg',
		description: 'Tablas con detalles ESTÉTICOS con hasta 50% de descuento. '
	}, {
		name: 'Longboard Sector 9 Lacey C/detalles Exhibicion',
		price: '$2000',
		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg',
		description: 'Tablas con detalles ESTÉTICOS con hasta 50% de descuento. '
	}]
	//==================================================================================

	return (
		<div>
		//=======Ver si la tarjeta del catalogo necesita tanta info============
			{productos.map(prod => <ProductCard
				name={prod.name}
				description={prod.description}
				price={prod.price}
				image={prod.image}
			/>)}
		</div>
	);
}
