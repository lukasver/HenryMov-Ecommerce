import React, { useState, useEffect } from "react";
import "./App.css";

import { Route, useHistory, Switch } from "react-router-dom";

import Nav from "./components/Nav.jsx";
import Product from "./components/Product.jsx";
import ProductCard from "./components/ProductCard.jsx";
import Slider from "./components/Slider";
import Catalogue from "./components/Catalogue";
import ContentSearch from "./components/ContentSearch";
import axios from "axios";
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/AddCategory";
<<<<<<< HEAD
import PutProduct from "./components/PutProduct";
import Admin from './components/admin/Admin.js';
=======
import Footer from "./components/footer/Footer";
import Admin from './components/admin/Admin.js';
import Preguntas from './components/footer/Preguntas'
>>>>>>> 042a83b5dafb5774ae80ccc27b210431af0a083d



function App({ location }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories]= useState([])
  const [totalProds, setTotalprods] = useState([]);

  let history = useHistory();

  function filterbyCategory(categorySearch){
    axios 
    .get(`http://localhost:3001/products/category/${categorySearch}`)
    .then(product => setTotalprods(product.data))
    .catch(error => console.log(error))
  }
  
  function getProducts(){
    axios
    .get(`http://localhost:3001/products`)
    .then(products => setTotalprods(products.data))
    .catch(error => console.log(error))
  }

  function onSearch(search) {
    axios
      .get(`http://localhost:3001/search?product=${search}`)
      .then((recurso) => {
        setProducts(recurso.data);
        history.push("/search");
        console.log(recurso.data);
        return recurso.data;
      });
  }

  useEffect(() => {
    axios

      .get("http://localhost:3001/products")
      .then((productosDB) => {
        const { data } = productosDB;
        return data;
      })
      .then((listadoProductos) => {
        setTotalprods(listadoProductos);
      })
      .catch((err) => new Error(err));

    axios

      .get("http://localhost:3001/category")
      .then((recurso) => {
        setCategories(recurso.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onFilter(productId) {
    let filtro = totalProds.filter((c) => c.id === parseInt(productId));
    if (filtro.length > 0) {
      return filtro[0];
    } else {
      return null;
    }
  }

  return (

    <div className="App">
      <Switch>
        <Route path="/admin" render={() => <Admin />} />
        <Route path="/" render={() => <Nav onSearch={onSearch} />} />
      </Switch>
      <Route exact path="/search" render={() => <ContentSearch products={products} />} />
      <Route exact path="/" render={() => <Slider />} />
      <Route exact path="/products" render={() => <Catalogue getProducts={getProducts} filterbyCategory={filterbyCategory} categories={categories} listado={totalProds} />} />
      <Route exact path="/products/:productId" render={({ match }) => <Product product={onFilter(match.params.productId)} />} />
      <Route exact path="/product/add" render={() => <AddProduct categories={categories} />} />
      <Route exact path='/product/put/:productId' render={({match}) => <PutProduct categories={categories} products={products} />} />
      <Route exact path='/category/add' render={() => <AddCategory />} />
      <Route exact path="/preguntas" render={()=> <Preguntas/>}/>
      <Route path="/" render={()=> <Footer/>}/>
    </div>
  );
}

export default App;