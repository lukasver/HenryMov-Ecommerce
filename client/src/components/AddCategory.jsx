import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCategory.css';


export default function AddCategory() {

    const [state, setState] = useState({
        name: '',
        description: ''
    })

    function handleChange(e) {
        e.preventDefault()
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
        console.log(state);
    }

    function onSubmit(e) {
        e.preventDefault()
        axios.post('http://localhost:3001/products/category', state)
            .then((data) => {
                return console.log(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="containerCat navbar-dark bg-secondary">
            <h2>
                Agregar Categoria
            </h2>
            <div className="col">
                <div className="form-group">
                    <form method="POST" onSubmit={onSubmit} onChange={handleChange}>
                        <label>Nombre</label>
                        <input type='text' id="name" value={state.name} />
                        <textarea id="description" value={state.description}>Descripcion</textarea>
                        <button className="btn btn-primary" type="submit"  >Agregar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};