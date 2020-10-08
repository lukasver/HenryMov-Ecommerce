import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Nav from './components/Nav.jsx';
import Product from './components/Product.jsx';
import Slider from './components/Slider';

function App() {
  return (
    <div className="App">
      {/* <Route
        path="/"
        render={() => <Nav />}
      />
      <Slider />
      <Route
        exact path="products/:id"
        render={<Product />}
      /> */}
      <Product />
    </div>
  );
}

export default App;