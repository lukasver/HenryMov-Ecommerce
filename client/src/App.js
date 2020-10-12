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
import Admin from './components/admin/Admin.js'


function App({ location }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories]= useState([])
  const [totalProds, setTotalprods] = useState([]);

  let history = useHistory();

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
      <Route exact path="/products" render={() => <Catalogue listado={totalProds} />} />
      <Route exact path="/products/:productId" render={({ match }) => <Product product={onFilter(match.params.productId)} />} />
      <Route exact path="/product/add" render={() => <AddProduct />} />
      <Route exact path='/category/add' render={() => <AddCategory />} />
    </div>
  );
}

export default App;