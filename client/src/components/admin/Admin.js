import React from 'react';
import { Route, Switch } from "react-router-dom";
import Panel from './Panel.jsx';
import Productos from './Productos.jsx';
import Categorias from './Categorias.jsx';
import Usuarios from './Usuarios.jsx';


function Admin() {

  return (
    <div className="Admin">
      <Route exact path="/admin" render={() => <Panel tablaAccion='Desktop' />} />
      <Switch>        
        <Route path="/admin/categorys" render={() => <Panel tablaAccion='Categorys' />} />
        <Route path="/admin/users" render={() => <Panel tablaAccion='Users' />} />
        <Route path="/admin/products" render={() => <Panel tablaAccion='Products' />} />
        <Route path="/admin/orders" render={() => <Panel tablaAccion='Orders' />} />
      </Switch>
    </div>
  );
}

export default Admin;