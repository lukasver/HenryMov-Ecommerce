import React from 'react';
import ProductCard from './ProductCard.jsx';
import './Catalogue.css';


export default function Catalogue(props) {
	//=========================Datos de Prueba ==========================
	const productos = [{
		id: 1,
		name: 'Longboard Sector 9 Lacey C/detalles Exhibicion',
		price: '$2000',
		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg',
		description: 'Tablas con detalles ESTÉTICOS con hasta 50% de descuento. '
	}, {
		id: 2,
		name: 'Longboard Sector 9 Lacey C/detalles Exhibicion',
		price: '$2000',
		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg',
		description: 'Tablas con detalles ESTÉTICOS con hasta 50% de descuento. '
	}, {
		id: 3,
		name: 'Longboard Sector 9 Lacey C/detalles Exhibicion',
		price: '$2000',
		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg',
		description: 'Tablas con detalles ESTÉTICOS con hasta 50% de descuento. '
	}, {
		id: 4,
		name: 'Longboard Sector 9 Lacey C/detalles Exhibicion',
		price: '$2000',
		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg',
		description: 'Tablas con detalles ESTÉTICOS con hasta 50% de descuento. '
	}, {
		id: 5,
		name: 'Longboard Sector 9 Lacey C/detalles Exhibicion',
		price: '$2000',
		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg',
		description: 'Tablas con detalles ESTÉTICOS con hasta 50% de descuento. '
	}, {
		id: 6,
		name: 'Longboard Sector 9 Lacey C/detalles Exhibicion',
		price: '$2000',
		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg',
		description: 'Tablas con detalles ESTÉTICOS con hasta 50% de descuento. '
	}]

	const categories = ['Scooters','Skates','Windsurf','Bikes'];
	//==================================================================================

	return (
				<div className="grid">
					<div className="categorycol">
						<h2>Categorias</h2>
						{categories.map(category => <div>{category}  <input type='checkbox'/></div>)}
					</div>
					<div className="gridcards">
					{productos.map(prod => 
						<div>
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

	);
}

				// <div className="container-fluid">
				// 	<div className="main row">
				// 		<div className="col-md-3 categorycol">
				// 		<h4>Categorias</h4>
				// 		{categories.map(category => <div><input type='checkbox'/>{category}</div>)}
				// 		</div>
				// 		<div className="col-md-9 row">
				// 			{productos.map(prod => 
				// 				<div className="col-sm-3">
				// 					<ProductCard
				// 					name={prod.name}
				// 					description={prod.description}
				// 					price={prod.price}
				// 					image={prod.image}
				// 					/>
				// 				</div>)}
				// 			</div>
				// 		</div>
				// </div>