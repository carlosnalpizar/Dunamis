import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './Paginas/Inicio';
import RegistroUsuario from './Paginas/RegistroUsuarios';
import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';
import RegistroClientes from './Paginas/RegistroClientes';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/usuarios" element={<RegistroUsuario />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/clientes" element={<RegistroClientes />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
