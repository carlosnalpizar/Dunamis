import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Inicio from '../Paginas/Inicio'
import RegistroClientes from '../Paginas/RegistroClientes'
import RegistroUsuario from '../Paginas/RegistroUsuarios'
import PagoSalarios from '../Paginas/PagoSalarios'
import AgregarTrabajosExtras from '../Paginas/AgregarTrabajosExtras'
import EstadoEmpleados from '../Paginas/EstadoEmpleados'
import GestionEmpleados from '../Paginas/GestionEmpleados'
import Bitacora from '../Paginas/Bitacora'
import Consultas from '../Paginas/Consultas'
import Reportes from '../Paginas/Reportes'
import NotFound from '../Paginas/404'


const RutasLoggeado = () => {
    
    const cookies = new Cookies(); //traer las cookies existentes
    const cookie = cookies.get('loggeado'); //de las cookies que hay traer el valor de la cookie loggeado
    const cookiePermiso  = cookies.get('rol');

//rutas admin (admin en base de datos es id 2)
if(cookie && cookiePermiso===2){
return (
    <div>
        <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/usuarios" element={<RegistroUsuario />} />
                <Route path="/empleados" element={<RegistroClientes />} />
                <Route path="/pago" element={<PagoSalarios />} />
                <Route path="/extras" element={<AgregarTrabajosExtras />} />
                <Route path="/estado" element={<EstadoEmpleados/>} />
                <Route path="/gestion" element={<GestionEmpleados/>} />
                <Route path="/bitacora" element={<Bitacora/>} />
                <Route path="/consultas" element={<Consultas/>} />
                <Route path="/reportes" element={<Reportes/>} />
                <Route path="/*" element={<NotFound/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        <Footer />
    </div>
)
//rutas empleado normal ( en base de datos es id 1)
}else if(cookie && cookiePermiso===1){
    return (
        <div>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/empleados" element={<RegistroClientes />} />
                    <Route path="/pago" element={<PagoSalarios />} />
                    <Route path="/extras" element={<AgregarTrabajosExtras />} />
                    <Route path="/estado" element={<EstadoEmpleados/>} />
                    <Route path="/gestion" element={<GestionEmpleados/>} />
                    <Route path="/consultas" element={<Consultas/>} />
                    <Route path="/reportes" element={<Reportes/>} />
                    <Route path="/*" element={<NotFound/>} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            <Footer />
        </div>
    )
}else{
    return(
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            flexDirection: 'column' 
        }}>
            <h1>Por favor, inicia sesión</h1>
            <button className="notFound__button" onClick={() => window.location.href = `/`}>
                Volver
            </button>
        </div>
    )
}
}



export default RutasLoggeado