import React, { useState } from 'react';
import './App.css';
import { Route, useHistory } from "react-router-dom";
import Nav from './components/Nav.jsx';
import Product from './components/Product.jsx';
import ProductCard from './components/ProductCard.jsx';
import Slider from './components/Slider';
import Catalogue from './components/Catalogue';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  let history = useHistory();

  function onSearch(search) {
    axios.get(`http://localhost:3001/search?product=${search}`)
      .then(recurso => {
        setProducts(recurso.data);
        history.push("/search");
        return recurso.data;
      });
  }

  return (

SearchBar
    <div className="App">
      <Route path="/" render={() => <Nav onSearch={onSearch} />} />
      <Route exact path="/search" render={() => <ProductCard products={products} />} />
      <Route exact path="/" render={() => <Slider />} />
      <Route exact path="/products" render={() => <Catalogue />} />
      <Route exact path="/products/:id" render={() => <Product />} />
    </div>
  );
}

export default App;