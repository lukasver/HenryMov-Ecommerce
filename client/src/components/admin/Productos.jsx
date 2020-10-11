import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Productos.css';

export default function Productos({ productos, categories }) {

    console.log('loggg: ',categories);

    const [addProd, setAddProd] = useState({
        name: '',
        description: '',
        price: '0',
        availability: 'false',
        stock: ' 0',
        image: '',
        categories: ''
    })

    //Agrega al estado los datos que se van ingresando
    function handleChange(e) {
        setAddProd({
            ...addProd,
            [e.target.id]: e.target.value
        })
    }

    //Funciona para el option value
    function handleSelect(e) {
        e.preventDefault()
        setAddProd({ ...addProd, categories: e.target.value })
    }

    return (
        <div className="col-md-10 panel-right row" style={{ paddingTop: '25px' }}>
            <div className="col-md-7 col-lg-8">
                <h2>Todos los Productos</h2>
                <p>Elija el producto a modificar</p>
                <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col"># Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map(dato => {
                                return (<tr>
                                    <th scope="row">{dato.id}</th>
                                    <td style={{ textAlign: 'left' }}>{dato.name}</td>
                                    <td style={{ textAlign: 'left' }}>{dato.description}</td>
                                    <td>{dato.price}</td>
                                    <td>{dato.stock}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="col-md-5 col-lg-4">
                <h2>Agregar Producto</h2>
                <p>Rellene todos los campos</p>
                <form className="text-center border border-light p-5 form-productos">
                    <input type="text" id="name" className="form-control mb-4" placeholder="Titulo" onChange={handleChange} />
                    <input type="description" id="description" className="form-control mb-4" placeholder="Descripcion" onChange={handleChange} />
                    <select className="browser-default custom-select" onClick={handleSelect}>
                        <option selected>Seleccione Categoria</option>
                        {
                            categories.map(cat =>
                                <option value={cat.id}>{cat.name}</option>
                            )
                        }
                    </select>
                    <br /><br />
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" id="price" className="form-control mb-4" placeholder="$ 1.00" />
                        </div>
                        <div className="col-md-6">
                            <input type="number" id="stock" className="form-control mb-4" placeholder="1" />
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="defaultChecked2" checked />
                        <label className="custom-control-label" for="defaultChecked2" style={{ color: 'white' }}>Disponible</label>
                    </div>
                    <button className="btn btn-info btn-block my-4" type="submit">Agregar</button>
                </form>

            </div>
        </div>
    )
}