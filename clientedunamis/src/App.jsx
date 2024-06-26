import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './Paginas/Inicio';
import Login from './Paginas/Login';
import Navbar from './Componentes/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
