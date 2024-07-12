import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Paginas/Login';
import NotFound from './Paginas/404';
import RutasLoggeado from './Componentes/RutasLoggeado';


function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/principal/*" element={<RutasLoggeado />} />
        <Route path="/" element={<Login/>} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
