import React from 'react';

export default function Product({productId, name, description, price, availability, stock, quantity, image}) {
	return (
		<div>
			<aside>
				<img src={image} alt="product image">
			</aside>
			<article>
				<h2>{name}</h2>				
				<p>{description}</p>
				<h3>{price}</h3>
				<h5>{availability}</h5>
				<h5>{stock}</h5>
				<h5>{quantity}</h5>
			</article>
		</div>
	);