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


import PutProduct from "./components/PutProduct";
import Footer from "./components/footer/Footer";
import Admin from './components/admin/Admin.js';
import Preguntas from './components/footer/Preguntas';
import Carousel from "./components/Carousel";
import {removecount , addcount} from './redux/Action';


function App({ location }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [totalProds, setTotalprods] = useState([]);
  const [prodDes, setProdDes] = useState([]);

  let history = useHistory();

  function filterbyCategory(categorySearch) {
    axios
      .get(`http://localhost:3001/products/category/${categorySearch}`)
      .then(product => setTotalprods(product.data))
      .catch(error => console.log(error))
  }

  function getProducts() {
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

  function randomProduct() {
    let arrayDes = [];
    let value;
    axios.get("http://localhost:3001/products")
      .then((products) => {
        for (let i = 0; i < 4; i++) {
          value = Math.floor(Math.random() * products.data.length);
          arrayDes.push(products.data[value]);
          products.data.splice(value, 1);
        }
        setProdDes(arrayDes);
      })
      .catch((err) => new Error(err));
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
      <Route exact path="/products/:productId" render={({ match }) => <Product product={onFilter(match.params.productId)} addcount={addcount} removecount={removecount}/>} />
      <Route exact path='/product/put/:productId' render={({ match }) => <PutProduct categories={categories} products={products} />} />
      <Route exact path="/preguntas" render={() => <Preguntas />} />
      <Route exact path="/" render={() => <Carousel randomProduct={randomProduct} prodDes={prodDes} />} />
      <Switch>
        <Route path="/admin"/>
        <Route path="/" render={() => <Footer />} />
      </Switch>
    </div>
  );
}

export default App;