import React, { useState } from 'react';
import './AsignCategory.css';

export default function () {

	const [compare, setCompare] = useState('');

	let accion = ''
	let method = ''
	function handle(e) {
		accion = document.getElementById(e.target.id).getAttribute('value')
		if (accion === 'add') {
			method = 'POST'
		} else if (accion === 'delete') {
			method = 'DELETE'
		} else {
		return
		}
	}
	
	const idProducto = null;

	return (
	<div className="asign parent">
    	<header className="top section" contenteditable><h1>Modificar categorías de productos:</h1></header>
    	<hr/>
    	<div className="middle section" contenteditable>
    	<h2>Asignar/Eliminar categoría:</h2>
    	<div className="form-check">
			  <input onClick={handle} className="form-check-input" type="radio" name="changecategory" id="addCategory" value='add'/>
			 	<label className="form-check-label" for="exampleRadios1">
			    Asignar categoría
			  </label>
		</div>
			<div className="form-check">
			  <input onClick={handle} className="form-check-input" type="radio" name="changecategory" id="changecategory" value='delete'/>
			  <label className="form-check-label" for="exampleRadios2">
			    Eliminar categoría
			  </label>
			</div>
    	</div>
    	<hr/>


    	<main className="bottom section" contenteditable></main>

			<form 	className="middle section" 
					method={`${method}`} 
					action={`/products/${idProducto}/category/${accion}`}> {/*ìngresar id prod a eliminar*/}

				    <div className="form-group">
				      <label for="idProducto">ID de Producto</label>
				      <div>
				        <input name="idProducto" type="numbre"/>
				      </div>
				    </div>

				    <div className="form-group">
				      <label for="idCategoria">Categoría</label>
				      <div>
				        <input name="idCategoria" type="numbre"/>
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