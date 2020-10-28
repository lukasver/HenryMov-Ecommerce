
import React, { useState, useEffect, useCallback } from 'react';
import { Checkbox } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import * as action from '../../redux/Action'
import './Productos.css';

export default function Productos({ productos, categories, deleteProduct, getProduct, product, addProduct, modProduct }) {

    // =======================================================
    //      PROTECCION LOGIN FRONT
    // =======================================================
    const pase = localStorage.getItem('role');
    const history = useHistory();
      if (pase !== 'Admin' && pase !== 'Responsable') {
        history.push('/login')
      }
    // =======================================================

    const [addProd, setAddProd] = useState({
        name: '',
        lastname: '',
        phone: 0,
        birthdate: ''
    });

    const [modProd, setModProd] = useState({
        id: 0,
        name: '',
        description: '',
        price: 0,
        availability: true,
        stock: 0,
        image: '',
        categories: ''
    });


    const [catProdId, setCatProdId] = useState({
        idProducto: '',
        categoryId: ''
    })

    const [catProdName, setCatProdName] = useState({
        productoName: '',
        categoriaName: ''
    })

    const [check, setCheck] = useState('add')

    const [textButton, setTextButton] = useState('Agregar')

    useEffect(() => {
        setAddProd({ ...addProd, id: productos.length > 0 && productos[productos.length - 1].id + 1 });
        setModProd(product);
    }, [productos, product, textButton])

    //Agrega al estado los datos que se van ingresando

    // =======================================================
    //      PAGINACIÓN
    // =======================================================

    const [pageActual, setPageActual] = useState(1);
    const [prodsPorPage, setProdsPorPage] = useState(10);
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(productos.length / prodsPorPage); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastPost = pageActual * prodsPorPage;
    const indexOfFirstPost = indexOfLastPost - prodsPorPage;
    const currentPosts = productos.slice(indexOfFirstPost, indexOfLastPost);



    // =======================================================
    //      MANEJAN ASIGNACION DE CATEGORÍA A PRODUCTO
    // =======================================================

    function handleCatProdId(e) {
        setCatProdId({
            ...catProdId,
            [e.target.id]: e.target.value
        })
    }

    async function handleCatProdName(e) {
        if (e.target.id === 'idProducto') {
            const prodName = await axios.get(`http://localhost:3001/products/${e.target.value}`)
            await setCatProdName({ ...catProdName, productoName: prodName.data.name });
            return prodName;
        }
        if (e.target.id === 'categoryId') {
            const catName = await axios.get(`http://localhost:3001/category/${e.target.value}`)
            await setCatProdName({ ...catProdName, categoriaName: catName.data.name });
            return catName;
        }
    }

    function linkCatProds(e) {
        e.preventDefault()
        const { idProducto, categoryId } = catProdId
        if (check === 'add') axios.post(`http://localhost:3001/products/${idProducto}/category/add`, { categoryId: Number(categoryId) })
        if (check === 'delete') axios.delete(`http://localhost:3001/products/${idProducto}/category/${categoryId}`)
            .then(res => { console.log(res.status) }).catch(err => { console.log('Error:', err) });
        setCatProdId({
            idProducto: "",
            categoryId: ""
        })
    }
    // =======================================================



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

        const imagenUrl = e.target.files[0];
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
        console.log(checked)
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
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentPosts.length > 0 && currentPosts.map(dato => {
                                return (<tr className="altoprod" key={dato.id} >
                                    <th scope="row">{dato.id}</th>
                                    <td id='producto' style={{ textAlign: 'left' }}>{dato.name}</td>
                                    <td style={{ textAlign: 'left' }}>{dato.description.substring(0, 90) + '...'}</td>
                                    <td>{dato.price}</td>
                                    <td>{dato.stock}</td>
                                    <td>
                                        <a className="iconTable"><i className="far fa-edit" id={dato.id}
                                            style={{ marginRight: '10px' }} onClick={(e) => {
                                                e.preventDefault();
                                                getProduct(dato.id)
                                                setTextButton('Modificar');
                                                setModProd(product);
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
            {/* BOTONES DE PAGINACION */}
                <nav>
                    <ul className="pagination d-flex justify-content-center">
                        {pageNumbers.map((numero, i) => (
                        <li key={i} className="page-item">
                         <a onClick={(e) => {e.preventDefault(); setPageActual(numero)}} href="#" className="page-link">{numero}</a>
                        </li>
                    ))}
                    </ul>
                </nav>
            </div>
            <div className="col-md-5 col-lg-4">
                <h2>Agregar Producto</h2>
                <p>Rellene todos los campos</p>
                <form className="text-center border border-light p-5 form-productos">
                    <input type="text" id="name" className="form-control mb-4" placeholder="Titulo" onChange={handleChange}
                        value={textButton == 'Agregar' ? addProd.name : modProd.name} />
                    <input type="description" id="description" className="form-control mb-4" placeholder="Descripcion" onChange={handleChange}
                        value={textButton == 'Agregar' ? addProd.description : modProd.description} />
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
                            <input type="text" id="price" className="form-control mb-4" placeholder="$ 1.00" onChange={handleChange}
                                value={textButton == 'Agregar' ? addProd.price : modProd.price} />
                        </div>
                        <div className="col-md-6">
                            <input type="number" id="stock" className="form-control mb-4" placeholder="1" onChange={handleChange}
                                value={textButton == 'Agregar' ? addProd.stock : modProd.stock} />
                        </div>
                        <div className="custom-file">
                            <input type="file" name="image" onChange={handleChangeImage} />
                            <div id="preview">{
                                modProd && <img src={modProd.image} width={120} />
                            }</div>
                        </div>
                        <label className="textDisponible"> Disponible: </label>

                        <input className="form-check-input position-static"
                            type="checkbox" id="availability" onClick={e => onClick(e.target.checked)}
                            checked={textButton === 'Agregar' ? addProd.availability : modProd.availability} />
                    </div>
                    <button className="btn btn-info btn-block my-4 buttonAddMod" onClick={(e) => {
                        //e.preventDefault();
                        if (textButton === 'Agregar' && addProd.image === '') {
                            alert('Debe cargar la imagen para dar de alta un producto');
                        } else {
                            const formData = new FormData();
                            // if (textButton === 'Modificar') formData.set('id', modProd.id);
                            formData.set('name', textButton == 'Agregar' ? addProd.name : modProd.name);
                            formData.set('description', textButton == 'Agregar' ? addProd.description : modProd.description);
                            formData.set('price', textButton == 'Agregar' ? addProd.price : modProd.price);
                            formData.set('availability', textButton == 'Agregar' ? addProd.availability : modProd.availability);
                            formData.set('stock', textButton == 'Agregar' ? addProd.stock : modProd.stock);
                            formData.set('categories', textButton == 'Agregar' ? addProd.categories : modProd.categories);
                            formData.append('image', textButton == 'Agregar' ? addProd.image : modProd.image);
                            if (textButton === 'Agregar') addProduct(formData);
                            if (textButton === 'Modificar') modProduct(formData, modProd.id);
                        }
                    }}>{textButton}</button>
                </form>
                <br />

                {/* ASIGNAR O ELIMINAR CATEGORIAS DE PRODUCTOS*/}

                {check === "add" ? (
                    <form className="text-center border border-light p-5 form-productos">
                        <button className="adam-chng" style={{"font-weight":"400"}} onClick={(e) => { e.preventDefault(); setCheck('delete'); console.log(e) }}>Cambiar a: {check === 'add' ? "Eliminar" : "Asignar"}</button>
                        <h3 style={{ color: 'white' }}>Asignar categoría a producto</h3>
                        <label style={{ color: 'white' }}>Ingresar ID de producto</label>
                        <input type="number"
                            id="idProducto"
                            value={catProdId.idProducto}
                            className="form-control mb-4"
                            placeholder="ID..."
                            onChange={(e) => { handleCatProdId(e); handleCatProdName(e) }}
                        />
                        {catProdName.productoName && (
                            <p className="bg-success text-white">{catProdName.productoName}</p>
                        )}
                        <label style={{ color: 'white' }}> Ingresar ID de categoría</label>
                        <input type="number"
                            id="categoryId"
                            className="form-control mb-4"
                            placeholder="ID..."
                            value={catProdId.categoryId}
                            onChange={(e) => { handleCatProdId(e); handleCatProdName(e) }}
                        />
                        {catProdName.categoriaName && (
                            <p className="bg-success text-white">{catProdName.categoriaName}</p>
                        )}
                        <button className="btn btn-info btn-block my-4 buttonAddMod" onClick={linkCatProds}>Asociar</button>
                    </form>) : (
                        <form className="text-center border border-light p-5 form-productos">
                            <button class="adam-chng" style={{"font-weight":"400"}} onClick={(e) => { e.preventDefault(); setCheck('add') }}>Cambiar a: {check === 'add' ? "Eliminar" : "Asignar"}</button>
                            <h3 style={{ color: 'white' }}>Eliminar categoría de producto</h3>
                            <label style={{ color: 'white' }}>Ingresar ID de producto</label>
                            <input type="number"
                                id="idProducto"
                                value={catProdId.idProducto}
                                className="form-control mb-4"
                                placeholder="ID..."
                                onChange={(e) => { handleCatProdId(e); handleCatProdName(e) }}
                            />
                            {catProdName.productoName && (
                                <p className="bg-danger text-white">{catProdName.productoName}</p>
                            )}
                            <label style={{ color: 'white' }}> Ingresar ID de categoría</label>
                            <input type="number"
                                id="categoryId"
                                className="form-control mb-4"
                                placeholder="ID..."
                                value={catProdId.categoryId}
                                onChange={(e) => { handleCatProdId(e); handleCatProdName(e) }}
                            />
                            {catProdName.categoriaName && (
                                <p className="bg-danger text-white">{catProdName.categoriaName}</p>
                            )}
                            <button className="btn btn-info btn-block my-4 buttonAddMod" onClick={linkCatProds}>{check === 'Add' ? "Asociar" : "Desasociar"}</button>
                        </form>)}

            </div>
        </div>
    )
}