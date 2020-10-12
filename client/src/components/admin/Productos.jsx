import React, { useState, useEffect } from 'react';
import { Checkbox } from 'react-router-dom';
import axios from 'axios';
import './Productos.css';
import Product from '../Product';

export default function Productos({ productos, categories, deleteProduct, getProduct, product, addProduct, modProduct }) {

    const [addProd, setAddProd] = useState({
        name: '',
        description: '',
        price: 0,
        availability: false,
        stock: 0,
        image: 'http://localhost:3000/static/media/logoHenry.52bea35a.png',
        categories: ''
    });

    const [modProd, setModProd] = useState({
        id: 0,
        name: '',
        description: '',
        price: 0,
        availability: false,
        stock: 0,
        image: 'http://localhost:3000/static/media/logoHenry.52bea35a.png',
        categories: ''
    });

    const [textButton, setTextButton] = useState('Agregar')

    useEffect(() => {
        setAddProd({ ...addProd, id: productos.length > 0 && productos[productos.length - 1].id + 1 });
        setModProd( product );
    }, [productos, product, textButton])

    //Agrega al estado los datos que se van ingresando
    function handleChange(e) {
        e.preventDefault();
        if (textButton === 'Agregar') {
            setAddProd({
                ...addProd,
                [e.target.id]: e.target.value
            });
        } else {
            setModProd({
                ...modProd,
                [e.target.id]: e.target.value
            });
        }
    }

    function handleChangeImage(e) {
        e.preventDefault();
        const imagenUrl = window.btoa([e.target.files[0]]);
        if (textButton === 'Agregar') {
            setAddProd({
                ...addProd,
                image: imagenUrl
            });
        } else {
            setModProd({
                ...modProd,
                image: imagenUrl
            });
        }
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function () {
            let preview = document.getElementById('preview');
            let image = document.createElement('img');
            image.src = reader.result;
            image.width = 120;
            preview.innerHTML = '';
            preview.append(image);
        };
    }

    //Funciona para el option value de las categorias
    function handleSelect(e) {
        e.preventDefault()
        if (textButton === 'Agregar') {
            setAddProd({ ...addProd, categories: e.target.value });
        } else {
            setModProd({ ...modProd, categories: e.target.value });
        }


    }

    //Funcion que captura el checkbox
    const onClick = (checked) => {
        if (textButton === 'Agregar') {
            setAddProd({ ...addProd, availability: checked });
        } else {
            setModProd({ ...modProd, availability: checked });
        }


    }

    return (
        <div className="col-md-10 panel-right row" style={{ paddingTop: '25px' }}>
            <div className="col-md-7 col-lg-8">
                <h2>Todos los Productos</h2>
                <p>Elija el producto a modificar</p>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col"># Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.length > 0 && productos.map(dato => {
                                return (<tr key={dato.id} >
                                    <th scope="row">{dato.id}</th>
                                    <td style={{ textAlign: 'left' }}>{dato.name}</td>
                                    <td style={{ textAlign: 'left' }}>{dato.description}</td>
                                    <td>{dato.price}</td>
                                    <td>{dato.stock}</td>
                                    <td>
                                        <a className="iconTable"><i className="far fa-edit" id={dato.id} style={{ marginRight: '10px' }} onClick={(e) => {
                                            e.preventDefault();
                                            getProduct(dato.id)
                                            setModProd(product);
                                            setTextButton('Modificar');
                                        }}></i></a>
                                        <a className="iconTable"><i className="far fa-trash-alt" id={dato.id} onClick={(e) => {
                                            e.preventDefault();
                                            if (!window.confirm('Esta por eliminar un producto, desea continuar?')) {
                                                return false;
                                            }
                                            deleteProduct(dato.id);
                                        }}></i></a>
                                    </td>
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
                    <input type="text" id="name" className="form-control mb-4" placeholder="Titulo" onChange={handleChange} value={textButton == 'Agregar' ? addProd.name : modProd.name} />
                    <input type="description" id="description" className="form-control mb-4" placeholder="Descripcion" onChange={handleChange} value={textButton == 'Agregar' ? addProd.description : modProd.description} />
                    <select className="browser-default custom-select" onClick={handleSelect}>
                        <option defaultValue="Seleccione Categoria">Seleccione Categoria</option>
                        {
                            categories.map(cat =>
                                <option key={cat.id} value={cat.id} onClick={handleSelect}>{cat.name}</option>
                            )
                        }
                    </select>
                    <br /><br />
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" id="price" className="form-control mb-4" placeholder="$ 1.00" onChange={handleChange} value={textButton == 'Agregar' ? addProd.price : modProd.price} />
                        </div>
                        <div className="col-md-6">
                            <input type="number" id="stock" className="form-control mb-4" placeholder="1" onChange={handleChange} value={textButton == 'Agregar' ? addProd.stock : modProd.stock} />
                        </div>
                        <div className="custom-file">
                            <input type="file" onChange={handleChangeImage} />
                            <div id="preview">{
                                modProd && <img src={modProd.image} width={120} />
                            }</div>
                        </div>
                        <label className="textDisponible"> Disponible: </label>

                        <input className="form-check-input position-static" type="checkbox" id="availability" onClick={e => onClick(e.target.checked)} defaultChecked={textButton === 'Agregar' ? addProd.availability : modProd.availability} />
                    </div>
                    <button className="btn btn-info btn-block my-4 buttonAddMod" onClick={(e) => {
                        //e.preventDefault();
                        if (textButton === 'Agregar') addProduct(addProd);
                        if (textButton === 'Modificar') modProduct(modProd);
                    }}>{textButton}</button>
                </form>
            </div>
        </div>
    )
}