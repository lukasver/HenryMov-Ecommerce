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
import Ordenes from './Ordenes';

export default function Panel({ tablaAccion, usuario }) {

    const [adminProducts, setAdminProducts] = useState([]);
    const [adminCategories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:3001/admin/products')
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
        axios.delete(`http://localhost:3001/products/${id}`, {withCredentials: true})
            .then(data => setAdminProducts(adminProducts.filter(prod => prod.id != id)))
            .catch((error) => {
                console.log(error);
            });
    }

    function deleteCategory(id) {
        axios.delete(`http://localhost:3001/category/${id}`, {withCredentials: true})
            .then(data => setCategories(adminCategories.filter(cat => cat.id != id)))
            .catch((error) => {
                console.log(error);
            });
    }

    function getProduct(id) {
        axios.get(`http://localhost:3001/admin/products/${id}`, {withCredentials: true})
            .then(producto => producto.data)
            .then(data => setProduct(data))
            .catch((error) => {
                console.log(error);
            });
    }

    function getCategory(id) {
        axios.get(`http://localhost:3001/category/${id}`, {withCredentials: true})
            .then(producto => producto.data)
            .then(data => setCategory(data))
            .catch((error) => {
                console.log(error);
            });
    }

    function addProduct(newProduct) {
        axios({
            method: 'post',
            url: 'http://localhost:3001/products',
            data: newProduct,
            config: { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
        }).then(data => {
            return adminProducts
        })
            .catch(error => {
                console.log(error);
            })
    };

    function addCategory(newCategory) {
        axios.post(`http://localhost:3001/category`, newCategory, {withCredentials: true})
            .then(data => adminCategories)
            .catch(error => {
                console.log(error);
            })
    };

    function modProduct(modProduct, id) {
        let updateProducts = adminProducts;
        console.log('datos: ', modProduct);
        axios({
            method: 'put',
            url: `http://localhost:3001/products/${id}`,
            data: modProduct,
            config: { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
        }).then(data => {
                updateProducts.map(dato => {
                    if (dato.id == modProduct.id) {
                        dato.name = modProduct.name;
                        dato.availability = modProduct.availability;
                        dato.description = modProduct.description;
                        dato.image = modProduct.image;
                        dato.price = modProduct.price;
                        dato.quantity = modProduct.quantity;
                        dato.stock = modProduct.stock;
                    }
                });
                
                console.log('prod: ', data);
                setAdminProducts(updateProducts);
            })
            .catch(error => {
                console.log(error);
            })
    };

    function modCategory(modCat) {
        let updateCategories = adminProducts;
        axios.put(`http://localhost:3001/category/${modCat.id}`, modCat, {withCredentials: true})
            .then(data => {
                updateCategories.map(dato => {
                    if (dato.id == modCat.id) {
                        dato.name = modCat.name;
                        dato.status = modCat.status;
                        dato.description = modCat.description;
                    }
                });
                setCategory(updateCategories);
            })
            .catch(error => {
                console.log(error);
            })
    };
    function getOrders() {
        return axios
            .get(`http://localhost:3001/order/admin`, {withCredentials: true})
            .then(orders => orders.data)
            .then(data => data)
            .catch(error => console.log(error))
    };
    function getUsers() {
        return axios
            .get(`http://localhost:3001/user`, {withCredentials: true})
            .then(orders => orders.data)
            .then(data => data)
            .catch(error => console.log(error))
    };
    return (
        <div className="container-fluid">
            <div className="main row">
                <MenuAdmin />
                {tablaAccion === 'Desktop' && <Escritorio />}
                {tablaAccion === 'Categorys' && <Categorias categorias={adminCategories} deleteCategory={deleteCategory} category={category} getCategory={getCategory} addCategory={addCategory} modCategory={modCategory} />}
                {tablaAccion === 'Users' && <Usuarios getUsers={getUsers} rol={usuario.role}/>}
                {tablaAccion === 'Products' && <Productos productos={adminProducts} categories={adminCategories} deleteProduct={deleteProduct} getProduct={getProduct} product={product} addProduct={addProduct} modProduct={modProduct} />}
                {tablaAccion === 'Orders' && <Ordenes getOrders={getOrders} />}
            </div>
        </div>
    )
}