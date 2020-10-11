import React, { useState, handleChange, handleSubmit, useEffect } from 'react';
import './PutProduct.css'
import axios from 'axios';

const urlBack = 'http://localhost:3001'

export default function AddProduct(props ) {   

    
    const [addProd, setAddProd] = useState({
        name: '',
        description: '',
        price: '0',
        availability: 'false',
        stock: ' 0',
        image: '',
        categories: []
    })


    function handleChange(e) {
        setAddProd({
            ...addProd,
            [e.target.id]: e.target.value
        })
    }

    const handleAdd = e => {
        console.log(addProd)
        e.preventDefault();
        try {
            // Creates the new product
            axios.post(`${urlBack}/products`, addProd);
        } catch (error) {
            console.log(error);
        }
    };

    function handleInputChange(e) {
        e.preventDefault()
        // const target = e.target.value;
        // const value = target.type === 'checkbox' ? 'false' : 'true';
        // setAddProd({
        //     ...addProd, availability: value
        // })
    }

    function handleSelect(e){
        e.preventDefault()
        console.log(e.target.value)
        setAddProd({...addProd, categories: e.target.value})
    }

    function UpImagen(e) {
        e.preventDefault()
        const encodedData = window.btoa([e.target.value]); // encode a string
        setAddProd({
            ...addProd, image: encodedData
        })
    }

    return (

        <div className='contenidoForm'>
            <h1>Agregar Producto</h1>
            <form class='formulario' onSubmit={handleSubmit}  >
                <label> Titulo del producto
                    <input type="text" id='name' onChange={handleChange} />
                </label>
                <label> Descripcion
                    <textarea id='description' onChange={handleChange} />
                </label>
                <br />
                <label>Categoria</label>
                <select  onClick={handleSelect} >
                    {props.categories.map(cat =>
                        <option value={cat.id} onClick={handleSelect}>{cat.name}</option>
                    )

                    }
                </select>
                <label> Disponible:

                     <input

                        id="availability"
                        type="checkbox"
                        checked={addProd.availability}
                        onChange={handleInputChange} />
                </label>
                <br />
                <label> Cantidad:
                    <input
                        id="stock"
                        type="number"
                        onChange={handleChange} />
                </label>
                <label> Precio:
                    <input
                        id="price"
                        onChange={handleChange} />
                </label>
                <input type="file" onChange={UpImagen} />
                <button onClick={handleAdd}>Agregar</button>
            </form>
        </div>
    )
}
