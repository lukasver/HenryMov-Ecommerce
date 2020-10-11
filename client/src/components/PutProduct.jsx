import React, { useState, handleChange, handleSubmit, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PutProduct.css'
import axios from 'axios';

const urlBack = 'http://localhost:3001'

export default function PutProduct({product, categories}) {  

  

    const { name, image, price, description, id ,stock} = product
    const productId = id
    
    const [addProd, setAddProd] = useState({
        id:'',
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
            [e.target.id]: e.target.value,
            id: id
        })
    }

    const handlePut = e => {
        e.preventDefault();
        console.log(productId)
        try {
            axios.put(`${urlBack}/products/${productId}`, addProd);
            console.log(addProd)
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
            <h1>Modificar Producto</h1>
            <form class='formulario' onSubmit={handleSubmit}  >
                <label> Titulo del producto
                    <input type="text" id='name' placeholder={name} onChange={handleChange} />
                </label>
                <label> Descripcion
                    <textarea id='description' placeholder={description} onChange={handleChange} />
                </label>
                <br />
                <label>Categoria</label>
                <select  onClick={handleSelect} >
                    {categories.map(cat =>
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
                        placeholder={stock}
                        onChange={handleChange} />
                </label>
                <label> Precio:
                    <input
                        id="price"
                        placeholder={price}
                        onChange={handleChange} />
                </label>
                <img src={image}/>
                <input type="file" onChange={UpImagen} />
                <button onClick={handlePut}>Agregar</button>
            </form>
        </div>
    )
}
