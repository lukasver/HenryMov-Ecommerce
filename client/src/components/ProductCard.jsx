import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleAdd , stocker} from '../utils/product'





export default function ProductCard(product) {
	const { name, image, price, description, id, stock } = product
	const [disponible, setDisponible] = useState(true)
	const [render, setRen] = useState(true)
	const dispatch = useDispatch()
	const count = 1
	useEffect(() => {
		product && first()
	}, [ render,disponible])
	
	if (!product) {
		return <div className="spinner-border text-info" role="status">
			<span className="sr-only">Loading...</span>
		</div>
	}
	function first(){
		setDisponible(stocker(product))
	}
	

	function complete(){
		handleAdd(product,dispatch,count)
		setDisponible(stocker(product))
		render ? setRen(false) : setRen(true)
	}

	return (
		<div className="card">
			<Link className="titulo-link" to={`/products/${id}`}>
				<img className="card-img" src={image} alt="imagen producto" />
				<div className="card-body">
					<h5 className="card-title">{name}</h5>
					<p className="card-text">{`${description.substring(0, 90)}... `}
						<span className="ver-mas">
							ver más
            </span>
					</p>
					<p className="card-text">{`$ ${price}`}</p>
				</div>
				{disponible==false  && <div className="nostockadv2">Producto en carrito</div>}
				{stock < 1  && <div className="nostockadv">Sin Stock</div>}
			</Link>
			{stock > 0 && disponible !== false && <button type="button" className="btn btn-primary btn-m btn-cart-add" data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>complete()} ><i className="fas fa-cart-plus"></i></button>}


			<div className="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header-title ">

							<h6 className="modal-title p-3 mb-2 bg-dark text-white" id="exampleModalLongTitle">Felicitaciones!!!!</h6>
						</div>
						<div className="modal-body alert alert-success ">
							Tu producto se agrego al carrito con exito
							</div>
					</div>
				</div>
			</div>
		</div>
	)
}
