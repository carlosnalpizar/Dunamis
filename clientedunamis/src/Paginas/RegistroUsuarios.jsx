import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../Css/registroUsuarios.styles.css';
import { getRoles } from '../api/roles.api';

const RegistroUsuario = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido1: '',
        apellido2: '',
        cedula: '',
        correo: '',
        rol: null,
        contrasena: ''
    });

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getRoles();
                const rolesOptions = response.data.map(role => ({
                    label: role.descripcionRoles,
                    value: role.idRoles
                }));
                setRoles(rolesOptions);
            } catch (error) {
                console.error('Error al obtener roles:', error);
            }
        };
        fetchRoles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDropdownChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            rol: e.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Aquí iría la lógica para enviar los datos al servidor
    };

    return (
        <div className="registro-container">
            <Card className="registro-card">
                <div className="registro-header">
                    <img src="../../logo2.png" alt="Logo" className="registro-logo" />
                    <h2 className="registro-title">Registro usuarios</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-fluid">
                        <div className="form-field">
                            <InputText placeholder="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <InputText placeholder="Primer Apellido" name="apellido1" value={formData.apellido1} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <InputText placeholder="Segundo Apellido" name="apellido2" value={formData.apellido2} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <InputText placeholder="Cédula" name="cedula" value={formData.cedula} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <InputText placeholder="Correo Electrónico" name="correo" value={formData.correo} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <Dropdown 
                                placeholder="Seleccione un Rol" 
                                name="rol" 
                                value={formData.rol} 
                                options={roles} 
                                onChange={handleDropdownChange} 
                            />
                        </div>
                        <div className="form-field p-inputgroup">
                            <Password 
                                placeholder="Contraseña" 
                                name="contrasena" 
                                value={formData.contrasena} 
                                onChange={handleChange} 
                                feedback={false} 
                                toggleMask
                                inputClassName="p-password-input"
                            />
                        </div>
                        <Button type="submit" label="Registrarse" className="p-button-raised p-button-rounded" />
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default RegistroUsuario;
