import React from 'react';
import { Route, Switch } from "react-router-dom";
import Panel from './Panel.jsx';
import Productos from './Productos.jsx';
import Categorias from './Categorias.jsx';
import Usuarios from './Usuarios.jsx';


function Admin() {

  return (
    <div className="Admin">
      <Route exact path="/admin" render={() => <Panel tablaAccion='Escritorio' />} />
      <Switch>        
        <Route path="/admin/categorias" render={() => <Panel tablaAccion='Categorias' />} />
        <Route path="/admin/usuarios" render={() => <Panel tablaAccion='Usuarios' />} />
        <Route path="/admin/productos" render={() => <Panel tablaAccion='Productos' />} />
      </Switch>
    </div>
  );
}

export default Admin;