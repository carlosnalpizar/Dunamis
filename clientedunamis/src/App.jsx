import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './Paginas/Inicio';
import RegistroUsuario from './Paginas/RegistroUsuarios';
import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';
import RegistroClientes from './Paginas/RegistroClientes';
import PagoSalarios from './Paginas/PagoSalarios';
import AgregarTrabajosExtras from './Paginas/AgregarTrabajosExtras';
import Login from './Paginas/Login';
import EstadoEmpleados from './Paginas/EstadoEmpleados';
import GestionEmpleados from './Paginas/GestionEmpleados';
import Bitacora from './Paginas/Bitacora';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/usuarios" element={<RegistroUsuario />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/empleados" element={<RegistroClientes />} />
        <Route path="/pago" element={<PagoSalarios />} />
        <Route path="/extras" element={<AgregarTrabajosExtras />} />
        <Route path="/login" element={<Login />} />
        <Route path="/estado" element={<EstadoEmpleados/>} />
        <Route path="/gestion" element={<GestionEmpleados/>} />
        <Route path="/bitacora" element={<Bitacora/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
