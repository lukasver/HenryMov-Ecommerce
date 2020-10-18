import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../redux/Action'

export default function ProductCard(props) {
  const { name, image, price, description, id, stock } = props;
  const [ren, setRen] = useState(true)
  const count = useSelector(store => store.count)
  console.log(props)

	const dispatch = useDispatch()
	useEffect(() => {

	}, [ren, count])

	if (!props) { return <h1>Loading...</h1> }

	// const { name, image, price, description, id } = product

	function counter() {
		props.count = count
  }

  function handleAdd() {
		// ren ? setRen(false) : setRen(true)

		// let recoveredData = localStorage.getItem('prod')
		// let search = JSON.parse(recoveredData)

		// if (!recoveredData) {
		// 	dispatch(action.countCart())
		// 	let countCart = 1
		// 	localStorage.setItem('count', countCart)
		// 	return localStorage.setItem('prod', JSON.stringify([props]))

		// }

		// let fined = search.find(prod => prod.id == id)

		// if (fined) {

		// 	fined.count++
		// 	let cleanData = search.filter((data) => data.id !== props.id)

		// 	cleanData.push(fined)
		// 	return localStorage.setItem('prod', JSON.stringify(cleanData))
		// }
		// let data = JSON.parse(recoveredData)
		// let newProd = props
		// data.push(newProd)
		// dispatch(action.countCart())
		// let countCart = data.length

		// localStorage.setItem('prod', JSON.stringify(data))
		// return localStorage.setItem('count', countCart)
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
      </Link>
      {stock > 0 && <button type="button" className="btn btn-primary btn-m btn-cart-add" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="atencion" onClick={handleAdd}><i className="fas fa-cart-plus"></i></button>}
      {stock < 1 && <button type="button" className="btn btn-danger btn-m btn-cart-add" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="atencion" onClick={handleAdd}><i class="fas fa-times-circle"></i></button>}
    </div>
  )
}