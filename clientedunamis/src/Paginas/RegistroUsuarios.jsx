import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../Css/registroUsuarios.styles.css';
import { getRoles } from '../api/roles.api';
import { ingresarUsuario } from '../api/usuarios.api';
import Cookies from 'universal-cookie';

const RegistroUsuario = () => {
    const [formData, setFormData] = useState({
        idUsuario: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        cedula: '',
        correo: '',
        rol: null,
        contrasena: '',
        usuarioAccion: ''  // Inicializar usuarioAccion aquí
    });

    const [roles, setRoles] = useState([]);
    const toast = React.useRef(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getRoles();
                const rolesOptions = response.data.map(role => ({
                    label: role.descripcionRoles,
                    value: role.idRoles
                }));
                setRoles(rolesOptions);
                
                const cookies = new Cookies(); // traer las cookies existentes
                const cookie = cookies.get('user'); // de las cookies que hay traer el valor de la cookie user
                setFormData(prevState => ({
                    ...prevState,
                    usuarioAccion: cookie // Guardar el usuario en formData
                }));
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

    const showAlert = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 3000 });
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isOnlyLetters = (text) => {
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(text);
    };

    const isOnlyNumbers = (text) => {
        return /^[0-9]+$/.test(text);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, apellido1, apellido2, cedula, correo, rol, contrasena } = formData;

        if (!nombre || !apellido1 || !apellido2 || !cedula || !correo || !rol || !contrasena) {
            showAlert('Por favor, complete todos los campos.');
            return;
        }

        if (!isOnlyLetters(nombre)) {
            showAlert('El nombre solo puede contener letras.');
            return;
        }

        if (!isOnlyLetters(apellido1)) {
            showAlert('El primer apellido solo puede contener letras.');
            return;
        }

        if (!isOnlyLetters(apellido2)) {
            showAlert('El segundo apellido solo puede contener letras.');
            return;
        }

        if (!isOnlyNumbers(cedula)) {
            showAlert('La cédula solo puede contener números.');
            return;
        }

        if (!isValidEmail(correo)) {
            showAlert('Por favor, ingrese un correo electrónico válido.');
            return;
        }
        console.log(formData);
        try {
            await ingresarUsuario(formData);
            alert('Registro exitoso');
            window.location.href = `/principal`
        } catch (error) {
            console.error('Error al registrar empleado:', error);
            console.log(formData);
            alert('Error al registrar empleado');
            window.location.href = `/principal`
        }
    };

    return (
        <div className="registro-container">
            <Toast ref={toast} />
            <Card className="registro-card">
                <div className="registro-header">
                    <img src="../../logo2.png" alt="Logo" className="registro-logo" />
                    <h2 className="registro-title">Registro usuarios</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-fluid">
                        <div className="form-field">
                            <InputText placeholder="ID Usuario" name="idUsuario" value={formData.idUsuario} onChange={handleChange} />
                        </div>
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
