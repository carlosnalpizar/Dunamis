import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useNavigate } from 'react-router-dom';
import '../Css/navbar.styles.css';
import Cookies from 'universal-cookie';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [cookiePermiso, setCookiePermiso] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cookies = new Cookies();
        const permiso = cookies.get('rol');
        setCookiePermiso(permiso);
    }, []);

    const borrarCookies = () => {
        const cookies = new Cookies();
        cookies.remove('loggeado');
        cookies.remove('user');
        cookies.remove('pass');
        cookies.remove('rol');
        window.location.href = `/`;
    };

    const adminMenuItems = [
        { label: 'Inicio', icon: 'pi pi-fw pi-home', command: () => { navigate('/principal'); setVisible(false); } },
        { label: 'Registro Usuarios', icon: 'pi pi-fw pi-user', command: () => { navigate('/principal/usuarios'); setVisible(false); } },
        { label: 'Registro Empleados', icon: 'pi pi-fw pi-user', command: () => { navigate('/principal/empleados'); setVisible(false); } },
        { label: 'Pago Salarios', icon: 'pi pi-fw pi-dollar', command: () => { navigate('/principal/pago'); setVisible(false); } },
        { label: 'Estado empleados', icon: 'pi pi-fw pi-check-circle', command: () => { navigate('/principal/estado'); setVisible(false); } },
        { label: 'Gestion empleados', icon: 'pi pi-fw pi-address-book', command: () => { navigate('/principal/gestion'); setVisible(false); } },
        { label: 'Agregar trabajos extra', icon: 'pi pi-fw pi-file-check', command: () => { navigate('/principal/extras'); setVisible(false); } },
        { label: 'Bitacora', icon: 'pi pi-fw pi-clipboard', command: () => { navigate('/principal/bitacora'); setVisible(false); } },
        { label: 'Realizar consultas', icon: 'pi pi-fw pi-search-plus', command: () => { navigate('/principal/consultas'); setVisible(false); } },
        { label: 'Realizar reportes', icon: 'pi pi-fw pi-search-plus', command: () => { navigate('/principal/reportes'); setVisible(false); } },
        { label: 'Cerrar Sesion', icon: 'pi pi-fw pi-times', command: () => { borrarCookies(); setVisible(false); } }
    ];

    const employeeMenuItems = [
        { label: 'Inicio', icon: 'pi pi-fw pi-home', command: () => { navigate('/principal'); setVisible(false); } },
        { label: 'Registro Empleados', icon: 'pi pi-fw pi-user', command: () => { navigate('/principal/empleados'); setVisible(false); } },
        { label: 'Pago Salarios', icon: 'pi pi-fw pi-dollar', command: () => { navigate('/principal/pago'); setVisible(false); } },
        { label: 'Estado empleados', icon: 'pi pi-fw pi-check-circle', command: () => { navigate('/principal/estado'); setVisible(false); } },
        { label: 'Gestion empleados', icon: 'pi pi-fw pi-address-book', command: () => { navigate('/principal/gestion'); setVisible(false); } },
        { label: 'Realizar consultas', icon: 'pi pi-fw pi-search-plus', command: () => { navigate('/principal/consultas'); setVisible(false); } },
        { label: 'Realizar reportes', icon: 'pi pi-fw pi-search-plus', command: () => { navigate('/principal/reportes'); setVisible(false); } },
        { label: 'Cerrar Sesion', icon: 'pi pi-fw pi-times', command: () => { borrarCookies(); setVisible(false); } }
    ];

    const start = (
        <Button 
            icon="pi pi-bars"
            onClick={() => setVisible(true)}
            className="p-button-text p-button-plain"
            style={{ color: 'var(--primary-color)' }}
        />
    );

    return (
        <div className="navbar-container">
            <Menubar model={[]} start={start} className="border-none bg-transparent p-menubar" />
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <div className="logo-container">
                    <img alt="logo" src="../../logo2.png" className="logo-image" />
                </div>
                <ul className="sidebar-menu p-0 m-0 list-none">
                    {(cookiePermiso === 2 ? adminMenuItems : employeeMenuItems).map((item, index) => (
                        <li key={index} className="flex align-items-center cursor-pointer hover:surface-200" onClick={item.command}>
                            <i className={item.icon + " mr-2"}></i>
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </Sidebar>
        </div>
    );
};

export default Navbar;

