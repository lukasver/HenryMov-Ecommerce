import React from 'react';
import './App.css';
import { Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="products/:id" render={<Product/>}/>
    </div>
  );
}

export default App;
