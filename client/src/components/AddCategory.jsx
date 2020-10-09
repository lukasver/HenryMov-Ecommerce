import React from 'react';

import './AddCategory.css';


export default function AddCategory() {
    return (
        <div className="containerCat navbar-dark bg-secondary">
            <h2>
                Agregar Categoria
            </h2>
            <div className="col">
                <div className="form-group">
                    <form method="POST" action="/category/">
                        <label>Nombre</label>
                        <input type='text-box' id="name"/>
                        <textarea name="description" id="caja-de-texto">Descripcion</textarea>
                        <button className="btn btn-primary" type="submit">Agregar</button>
                    </form>

                </div>
            </div>
        </div>
    );
};