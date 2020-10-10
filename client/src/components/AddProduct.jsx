import React, { useState, handleChange, handleSubmit, useEffect } from 'react';
import './AddProduct.css'
import axios from 'axios';

export default function AddProduct() {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [disponible, setDisponible] = useState(true)
    const [categorias,setCategorias] = useState()
    
   
   async function Category() {
       await axios.get(`http://localhost:3001/category`)
          .then(res => {
            const categorias = res.data;
            return setCategorias({categorias});
        });
    }
    
    
    
    function handleChange(e) {
        setTitulo({ value: e.target.value });
        setDescripcion({value: e.value})
        if (cantidad >=0){
            setCantidad({value: e.value})
        }
    }
    
    
    function handleSubmit(e) {
        e.preventDefault();
    }
    function  handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setDisponible({value})
    }
    
    return (
        <div className='contenidoForm'>
           
        <h1>Agregar Producto</h1>
        <form class = 'formulario' onSubmit={handleSubmit}>
            <label>
                Titulo del producto
        <input type="text" value={descripcion.value} onChange={handleChange} />
            </label>
            <label>
                Descripcion
          <textarea value={descripcion.value} onChange={handleChange} />
            </label>
            <br/>
            <label>Categoria</label>
            <select>
            
                {categorias.map(c=>
                <option key={c.id}>{c.name}</option>)}
            </select>
            <label>
          Disponible:
          <input
            name="disponible"
            type="checkbox"
            checked={disponible.value}
            onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Cantidad:
          <input
            name="cantidad"
            type="number"
            value={cantidad.value}
            onChange={handleChange} />
        </label>
            <input type="file" />
            <button>Agregar</button>
        </form>

        </div>

      
//         <form className='contenidoForm'>
//       <h1>Agregar Producto</h1>
//   <div class="form-group">
//     <label for="inputAddress">Titulo</label>
//     <input type="text" class="form-control" id="inputAddress" placeholder="Titulo con el que se va a presentar el producto"/>
//   </div>
//   <div class="form-row">
//     <div class="form-group col-md-6">
//       <label for="inputEmail4">Email</label>
//       <input type="email" class="form-control" id="inputEmail4"/>
//     </div>
//     <div class="form-group col-md-6">
//       <label for="inputPassword4">Password</label>
//       <input type="password" class="form-control" id="inputPassword4"/>
//     </div>
//   </div>
//   <div class="form-group">
//     <label for="inputAddress2">Address 2</label>
//     <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
//   </div>
//   <div class="form-row">
//     <div class="form-group col-md-6">
//       <label for="inputCity">City</label>
//       <input type="text" class="form-control" id="inputCity"/>
//     </div>
//     <div class="form-group col-md-4">
//       <label for="inputState">State</label>
//       <select id="inputState" class="form-control">
//         <option selected>Choose...</option>
//         <option>...</option>
//       </select>
//     </div>
//     <div class="form-group col-md-2">
//       <label for="inputZip">Zip</label>
//       <input type="text" class="form-control" id="inputZip"/>
//     </div>
//   </div>
//   <div class="form-group">
//     <div class="form-check">
//       <input class="form-check-input" type="checkbox" id="gridCheck"/>
//       <label class="form-check-label" for="gridCheck">
//         Check me out
//       </label>
//     </div>
//   </div>
//   <button type="submit" class="btn btn-primary">Sign in</button>
// </form>

    )
}


//<input type="submit" value="Submit" />