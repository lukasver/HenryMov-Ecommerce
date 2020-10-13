import React, { useState } from 'react';
import axios from 'axios';
import './AsignCategory.css';

export default function () {

	const [valor, setValor] = useState('');
	const [idProducto, setIdProducto] = useState('');
	const [method, setMethod] = useState('');
	const [accion, setAccion] = useState('');

	function handle(e) {
		setAccion(document.getElementById(e.target.id).getAttribute('value'))
		if (accion === 'add') {
			setMethod('POST')
			console.log(method)
		} else if (accion === 'delete') {
			setMethod('delete')
			console.log(method)
		} else {
		return
		}
	}

	async function handleChange(e) {
		setValor(e.target.value);
		const product = await axios.get(`http://localhost:3001/products/${e.target.value}`);
		setIdProducto(product.data.name)
		;
	}


	

	return (
	<div className="asign parent">
    	<header className="top section" contenteditable><h1>Modificar categorías de productos:</h1></header>
    	<hr/>
    	<div className="middle section" contenteditable>
    	<h2>Asignar/Eliminar categoría:</h2>
    	<div className="form-check">
			  <input onClick={e => handle(e)} className="form-check-input moveleft" type="radio" name="changecategory" id="addCategory" value='add'/>
			 	<label className="form-check-label" for="exampleRadios1">
			    Asignar categoría
			  </label>
		</div>
			<div className="form-check">
			  <input onClick={e => handle(e)} className="form-check-input moveleft" type="radio" name="changecategory" id="changecategory" value='delete'/>
			  <label className="form-check-label" for="exampleRadios2">
			    Eliminar categoría
			  </label>
			</div>
    	</div>
    	<hr/>

    	<main className="bottom section" contenteditable></main>

			<form 	onSubmit={e => e.preventDefault}
					className="middle section" 
					method={`${method}`} 
					action={`/products/${valor}/category/${accion}`}> {/*ìngresar id prod a eliminar*/}

				    <div className="form-group">
				      <label>ID de Producto</label>
				      <div>
				        <input onChange={e => handleChange(e)}type="numbre"/>
				      </div>
			      	{idProducto && (
		      		<p className='danger'>{idProducto}</p>
		      		)}
				    </div>

				    <div className="form-group">
				      <label>Categoría</label>
				      <div>
				        <input type="numbre"/>
				      </div>
				    </div>

				   {/* <div className="form-group">
				      <label for="title" >Page Title</label>
				      <div >
				        <input name="title" type="text" />
				      </div>
				    </div>

				    <div className="form-group">
				      <label for="content">Content</label>
				      <div>
				        <textarea name="content"></textarea>
				      </div>
				    </div>

				    <div className="form-group">
				      <p>
				        Categorias:<br/>
				        <label><input type="checkbox" className="categories" value="1"/> Autos </label><br/> 
				        <label><input type="checkbox" name="categories" value="2"/> Deportes </label><br/> 
				        <label><input type="checkbox" name="categories" value="3"/> Videojuegos</label>
				      </p>
				    </div>*/}
				    <div>
				      <button type="submit" className="btn btn-primary">SUBMIT</button>
				    </div>
			</form>
    	{/*<footer className="bottom section" contenteditable>Footer Content</footer>*/}
  	</div>


		)
}