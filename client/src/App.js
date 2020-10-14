import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Product from "./components/Product.jsx";
import Slider from "./components/Slider";
import Catalogue from "./components/Catalogue";
import ContentSearch from "./components/ContentSearch";
import axios from "axios";
import Footer from "./components/footer/Footer";
import Admin from "./components/admin/Admin.js";
import Preguntas from "./components/footer/Preguntas";
import Carousel from "./components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import * as action from "./redux/Action";

function App() {
  const totalProds = useSelector((store) => store.totalProds);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((productosDB) => {
        const { data } = productosDB;
        return data;
      })
      .then((listadoProductos) => {
        dispatch(action.totalProds(listadoProductos));
      })
      .catch((err) => new Error(err));

    axios
      .get("http://localhost:3001/category")
      .then((recurso) => {
        dispatch(action.categories(recurso.data));
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
    <div className='App'>
      <Switch>
        <Route path='/admin' render={() => <Admin />} />
        <Route path='/' render={() => <Nav />} />
      </Switch>
      <Route exact path='/search' render={() => <ContentSearch />} />
      <Route exact path='/' render={() => <Slider />} />
      <Route exact path='/products' render={() => <Catalogue />} />
      <Route exact path='/products/:productId' render={({ match }) => (<Product product={onFilter(match.params.productId)} />)} />
      <Route exact path='/preguntas' render={() => <Preguntas />} />
      <Route exact path='/' render={() => <Carousel />} />
      <Switch>
        <Route path='/admin' />
        <Route path='/' render={() => <Footer />} />
      </Switch>
    </div>
  );
}

export default App;
