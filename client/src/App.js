import React, { useState, useEffect } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Nav from './components/Nav.jsx';
import Product from './components/Product.jsx';
import ProductCard from './components/ProductCard.jsx';
import Slider from './components/Slider';
import Catalogue from './components/Catalogue';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [totalProds,setTotalprods] = useState(null);

  function onSearch(search) {
    axios.get(`http://localhost:3001/search?product=${search}`)
      .then(recurso => {
        setProducts(recurso.data);
        console.log(recurso.data);
        return recurso.data;
      });
  }

  function onFilter(productId) {
    let skate = totalProds.filter(c => c.id === parseInt(productId));
    if(skate.length > 0) {
        return skate[0];
    } else {
        return null;
    }
  }

  useEffect(async () => {
    await axios.get('http://localhost:3001/products')
    .then(productosDB => {
      const {data} = productosDB
      return data
    })
    .then(listadoProductos => {
      setTotalprods(listadoProductos)
    })
    .catch(err => new Error(err))
  },[]) 


  return (
    <div className="App">
        <Route path="/" render={() => <Nav onSearch={onSearch} />} />
        <Route exact path="/search" render={() => <ProductCard products={products} />} />
        <Route exact path="/" render={() => <Slider/>}/>
        <Route exact path="/products" render={() => <Catalogue listado={totalProds}/>}/>
        <Route exact path="/products/:productId" render={({match}) => <Product product={match.params.productId}/>}/>
    </div>
  );
}

export default App;