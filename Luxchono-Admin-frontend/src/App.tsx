import React from 'react';
import Login from './pages/Login';
import Router from './router/Router';
import Toasters from "./components/common/Toasters";

function App() {
  return (
    <div >
      <Toasters />
      <Router />
    </div>
  );
}

export default App;
