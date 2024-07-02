import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/navbar.styles.css';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            command: () => { navigate('/'); setVisible(false); }
        },
        {
            label: 'Inicio Sesion',
            icon: 'pi pi-fw pi-users',
            command: () => { navigate('/login'); setVisible(false); }
        },
        {
            label: 'Registro Usuarios',
            icon: 'pi pi-fw pi-user',
            command: () => { navigate('/usuarios'); setVisible(false); }
        },
        {
            label: 'Registro Empleados',
            icon: 'pi pi-fw pi-user',
            command: () => { navigate('/empleados'); setVisible(false); }
        },
        {
            label: 'Pago Salarios',
            icon: 'pi pi-fw pi-dollar',
            command: () => { navigate('/pago'); setVisible(false); }
        },
        {
            label: 'Estado empleados',
            icon: 'pi pi-fw pi-check-circle',
            command: () => { navigate('/estado'); setVisible(false); }
        },
        {
            label: 'Gestion empleados',
            icon: 'pi pi-fw pi-address-book',
            command: () => { navigate('/gestion'); setVisible(false); }
        },
        {
            label: 'Bitacora',
            icon: 'pi pi-fw pi-clipboard',
            command: () => { navigate('/bitacora'); setVisible(false); }
        },
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
            <Menubar model={[]} start={start} className="border-none bg-transparent p-menubar " />
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <div className="logo-container">
                    <img alt="logo" src="../../logo2.png" className="logo-image" />
                </div>
                <ul className="sidebar-menu p-0 m-0 list-none">
                    {menuItems.map((item, index) => (
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
