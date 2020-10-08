import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Nav from './components/Nav.jsx';
import Product from './components/Product.jsx';
import Slider from './components/Slider';
import Catalogue from './components/Catalogue';

function App() {
  return (
  	<div>
		<Route path="/" render={() => <Nav/>}/>
		<Route exact path="/" render={() => <Slider/>}/>
		<Route exact path="/products" render={() => <Catalogue/>}/>
		<Route exact path="/products/:id" render={() => <Product/>}/>
    </div>
  );
}

export default App;