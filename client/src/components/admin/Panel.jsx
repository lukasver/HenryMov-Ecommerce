import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Panel.css';
import Productos from './Productos';
import MenuAdmin from './MenuAdmin';
import Escritorio from './Escritorio';
import Usuarios from './Usuarios';
import Categorias from './Categorias';

export default function Panel({ tablaAccion }) {

    const [adminProducts, setAdminProducts] = useState([]);
    const [adminCategories, setCategories]= useState([])


    useEffect(async () => {
        await axios.get('http://localhost:3001/products')
            .then(productos => {
                const { data } = productos;
                return data;
            })
            .then(data => {
                setAdminProducts(data);
            })
            .catch(err => new Error(err));
            await axios
            .get("http://localhost:3001/category")
            .then((recurso) => {
              console.log(recurso.data)
              setCategories(recurso.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }, []);

    return (
        <div className="container-fluid">
            <div className="main row">
                <MenuAdmin />
                {tablaAccion === 'Escritorio' && <Escritorio />}
                {tablaAccion === 'Categorias' && <Categorias />}
                {tablaAccion === 'Usuarios' && <Usuarios />}
                {tablaAccion === 'Productos' && <Productos productos={adminProducts} categories={adminCategories} />}
            </div>
        </div>
    )
}