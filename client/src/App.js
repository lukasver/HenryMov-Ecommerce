import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Promise from "bluebird";
import axios from "axios";
import * as action from "./redux/Action";
import Nav from "./components/Nav.jsx";
import Product from "./components/Product.jsx";
import Slider from "./components/Slider";
import Catalogue from "./components/Catalogue";
import ContentSearch from "./components/ContentSearch";
import Footer from "./components/footer/Footer";
import Admin from "./components/admin/Admin.js";
import Preguntas from "./components/footer/Preguntas";
import Carousel from "./components/Carousel";
import Carrito from "./components/carrito/Carrito"
import Register from "./components/registration/Register"
import "./App.css";
import LoggedIn from "./components/registration/LoggedIn";
import Menu from "./components/Menu"
import OrdenDetalle from "./components/carrito/OrdenDetalle";
import Reviews from "../src/components/reviews/Reviews"
import Reset from "../src/components/registration/Reset"
import Pago from '../src/components/carrito/pago/Pago'
import Profile from "./components/registration/Profile";


function App() {
  const totalProds = useSelector((store) => store.totalProds);
  const loggedIn = useSelector((store) => store.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {

    Promise.all([
      axios.get("http://localhost:3001/products"),
      axios.get("http://localhost:3001/category"),
      ])
      .then(res => {
        dispatch(action.totalProds(res[0].data));
        dispatch(action.categories(res[1].data));
      })
      .catch(err => new Error(err))

      axios
      .get("http://localhost:3001/auth/login", {withCredentials: true})
      .then((user) => {
        console.log('llego?', user) 
        if(user.status === 200) dispatch(action.logIn(user.data)) 
      })
      .catch((error) => {
        console.log(error);
      });

      // axios.get("http://localhost:3001/auth/login", {withCredentials: true})

    // axios
    //   .get("http://localhost:3001/products")
    //   .then((productosDB) => {
    //     const { data } = productosDB;
    //     return data;
    //   })
    //   .then((listadoProductos) => {
    //     dispatch(action.totalProds(listadoProductos));
    //   })
    //   .catch((err) => new Error(err));

    // axios
    //   .get("http://localhost:3001/category")
    //   .then((recurso) => {
    //     dispatch(action.categories(recurso.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

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
      <Route exact path='/carrito' render={()=> <Carrito/>}/>
      <Route exact path='/register' render={()=> <Register/>} />
      <Route exact path='/logIn' render={()=> <LoggedIn/>} />
      <Route exact path='/reset' render={()=> <Reset/>} />
      <Route exact path='/Menu' render={()=> <Menu />} />
      <Route exact path='/order/:id' render={({ match })=> <OrdenDetalle orderId = {match.params.id}/>} />
      <Route exact path='/reviews' render={()=> <Reviews/>}/>
      <Route exact path='/pago' render={()=> <Pago/>}/>
      <Route exact path='/profile' render={()=> <Profile/>}/>
      <Switch>
        <Route path='/admin' />
        <Route path='/' render={() => <Footer />} />
      </Switch>
    </div>
  );
}

export default App;
