import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, useHistory } from "react-router-dom";
import Nav from './components/Nav.jsx';
import Product from './components/Product.jsx';
import ProductCard from './components/ProductCard.jsx';
import Slider from './components/Slider';
import Catalogue from './components/Catalogue';
import ContentSearch from './components/ContentSearch';
import axios from 'axios';
import AddProduct from './components/AddProduct';


function App() {
  const [products, setProducts] = useState([]);
<<<<<<< HEAD
  const [totalProductos,setTotalprods] = useState([]);
=======
  const [totalProds,setTotalprods] = useState([]);
>>>>>>> master

  let history = useHistory();

  function onSearch(search) {
    axios.get(`http://localhost:3001/search?product=${search}`)
      .then(recurso => {
        setProducts(recurso.data);
        history.push("/search");
        console.log(recurso.data)
        return recurso.data;
      });
  }

    useEffect(async () => {
    await axios.get('http://localhost:3001/products')
    .then(productosDB => {
      const {data} = productosDB
      return data
    })
    .then(listadoProductos => {
      setTotalprods(listadoProductos

        )
    })
    .catch(err => new Error(err))
  },[]) 


  function onFilter(productId) {
    let filtro = totalProductos.filter(c => c.id === parseInt(productId));
    if(filtro.length > 0) {
        return filtro[0];
    } else {
        return null;
    }
  }




  return (
    <div className="App">
        <Route path="/" render={() => <Nav onSearch={onSearch} />} />
        <Route exact path="/search" render={() => <ContentSearch products={products} />} />
        <Route exact path="/" render={() => <Slider/>}/>
<<<<<<< HEAD
        <Route exact path="/products" render={() => <Catalogue listado={totalProductos}/>}/>
        <Route exact path="/products/:productId" render={({match}) => <Product product={onFilter(match.params.productId)}/>}/>
=======
        <Route exact path="/products" render={() => <Catalogue listado={totalProds}/>}/>
        <Route exact path="/products/:productId" render={({match}) => <Product product={onFilter(match.params.productId)}/>}/>
        <Route exact path= "/product/add" render={()=><AddProduct/>}/>
>>>>>>> master
    </div>
  );
}

export default App;