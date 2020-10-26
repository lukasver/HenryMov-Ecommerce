import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../redux/Action'
import axios from 'axios'
import carrito from '../img/carrito.png'



export default function ProductCard(product) {
	const { name, image, price, description, id, stock } = product
	const [disponible, setDisponible] = useState(true)
	const [render, setRen] = useState(true)
	const count = useSelector(store => store.count)
	// const prod = useSelector(store=> store.prodInStore)
	const dispatch = useDispatch()
	// let user= localStorage.getItem('id')

	useEffect(() => {
		stocker(product)
	}, [render, count, disponible])
	if (!product) {
		return <div className="spinner-border text-info" role="status">
			<span className="sr-only">Loading...</span>
		</div>
	}

	const imagen = product.image

	
	function handleAdd(product) {
		// if (user === null){
			render ? setRen(false) : setRen(true)

		let recoveredData = localStorage.getItem('prod')
		let search = JSON.parse(recoveredData)

		if (!recoveredData) {
			let countCart = 1
			localStorage.setItem('count', countCart)
			dispatch(action.countCart())

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
		let countCart = data.length
		localStorage.setItem('count', countCart)
		localStorage.setItem('prod', JSON.stringify(data))
		dispatch(action.countCart())
	// }else{
	// 	render ? setRen(false) : setRen(true)
	// 	dispatch(action.addProduct(user,product))
	

	}
	function stocker(product) {
		// if(user==null){
		let products = JSON.parse(localStorage.getItem('prod'))
		if (products == null || products == undefined) {
			return
		}
		let cleanData = products.filter((data) => data.id == product.id)
		if (cleanData.length != 0) {
			return setDisponible(false)
		}
	// }else{
		// let products = prod
		// if (products == null || products == undefined) {
		// 	return
		// }
		// let cleanData = products.filter((data) => data.id == product.id)
		// if (cleanData.length != 0) {
		// 	return setDisponible(false)
		// }
	
		return
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
				{!disponible && <div className="nostockadv2">Producto en carrito</div>}
				{stock < 1 && <div className="nostockadv">Sin Stock</div>}
			</Link>
			{stock > 0 && disponible && <button type="button" className="btn btn-primary btn-m btn-cart-add" data-toggle="modal" data-target="#exampleModalCenter" onClick={()=> handleAdd(product)}  ><i className="fas fa-cart-plus"></i></button>}


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
