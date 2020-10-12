import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Panel.css';
import Productos from './Productos';
import MenuAdmin from './MenuAdmin';
import Escritorio from './Escritorio';
import Usuarios from './Usuarios';
import Categorias from './Categorias';
import { Z_ASCII } from 'zlib';

export default function Panel({ tablaAccion }) {

    const [adminProducts, setAdminProducts] = useState([]);
    const [adminCategories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/products')
            .then(productos => {
                const { data } = productos;
                return data;
            })
            .then(data => {
                setAdminProducts(data);
            })
            .catch(err => new Error(err));
        axios
            .get('http://localhost:3001/category')
            .then((recurso) => {
                setCategories(recurso.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function deleteProduct(id) {
        axios.delete(`http://localhost:3001/products/${id}`)
            .then(data => setAdminProducts(adminProducts.filter(prod => prod.id != id)))
            .catch((error) => {
                console.log(error);
            });
    }

    function getProduct(id) {
        axios.get(`http://localhost:3001/products/${id}`)
            .then(producto => producto.data)
            .then(data => setProduct(data))
            .catch((error) => {
                console.log(error);
            });
    }

    function addProduct(newProduct) {
        console.log('ingresa: ', newProduct);
        axios.post(`http://localhost:3001/products`, newProduct)
            .then(data => adminProducts)
            .catch(error => {
                console.log(error);
            })
    };

    function modProduct(modProduct) {    
        // let updateProducts = adminProducts;
        axios.put(`http://localhost:3001/products/${modProduct.id}`, modProduct)
            .then(data => {
                // updateProducts.map(dato => {
                //     if(dato.id == modProduct.id){
                //         dato.name = modProduct.name;
                //         dato.availability = modProduct.availability;
                //         dato.description = modProduct.description;
                //         dato.image = modProduct.image;
                //         dato.price = modProduct.price;
                //         dato.quantity = modProduct.quantity;
                //         dato.stock = modProduct.stock;
                //     }
                // });
                console.log(data)
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <div className="container-fluid">
            <div className="main row">
                <MenuAdmin />
                {tablaAccion === 'Desktop' && <Escritorio />}
                {tablaAccion === 'Categorys' && <Categorias />}
                {tablaAccion === 'Users' && <Usuarios />}
                {tablaAccion === 'Products' && <Productos productos={adminProducts} categories={adminCategories} deleteProduct={deleteProduct} getProduct={getProduct} product={product} addProduct={addProduct} modProduct={modProduct} />}
            </div>
        </div>
    )
}