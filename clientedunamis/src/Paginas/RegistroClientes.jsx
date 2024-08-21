import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../Css/registroClientes.styles.css';
import { getPosiciones } from '../api/posicion.api';
import { ingresarEmpleado } from '../api/empleados.api';

const RegistroClientes = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido1: '',
        apellido2: '',
        cedula: '',
        correo: '',
        posicion: null,
        ingreso: null
    });

    const [posiciones, setPosiciones] = useState([]);
    const toast = React.useRef(null);

    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    useEffect(() => {
        const fetchPosiciones = async () => {
            try {
                const response = await getPosiciones();
                const posicionesOptions = response.data.map(pos => ({
                    label: pos.descripcionPosicion,
                    value: pos.idPosicion
                }));
                setPosiciones(posicionesOptions);
            } catch (error) {
                console.error('Error al obtener posiciones:', error);
            }
        };
        fetchPosiciones();
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
            posicion: e.value
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
        const { nombre, apellido1, apellido2, cedula, correo, posicion, ingreso } = formData;

        if (!nombre || !apellido1 || !apellido2 || !cedula || !correo || !posicion || !ingreso) {
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

        if (!isOnlyNumbers(cedula) || cedula.length < 9) {
            showAlert('La cédula debe contener al menos 9 dígitos y solo números.');
            return;
        }

        if (!isValidEmail(correo)) {
            showAlert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        try {
            await ingresarEmpleado(formData);
            alert('Registro exitoso');
            window.location.href = `/principal`;
        } catch (error) {
            console.error('Error al registrar empleado:', error);
            console.log(formData);
            alert('Error al registrar empleado');
            window.location.href = `/principal`;
        }
    };

    return (
        <div className="registro-container">
            <Toast ref={toast} />
            <Card className="registro-card">
                <div className="registro-header">
                    <img src="../../logo.png" alt="Logo" className="registro-logo" />
                    <h2 className="registro-title">Registro Empleados</h2>
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
                                placeholder="Seleccione una posición" 
                                name="posicion" 
                                value={formData.posicion} 
                                options={posiciones} 
                                onChange={handleDropdownChange} 
                            />
                        </div>
                        <div className="form-field">
                            <Calendar
                                placeholder="Fecha ingreso"
                                name="ingreso"
                                value={formData.ingreso}
                                onChange={(e) => setFormData({ ...formData, ingreso: e.value })}
                                dateFormat="dd/mm/yy"
                                showIcon
                                readOnlyInput
                                showButtonBar
                                minDate={today}
                                maxDate={new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())}
                            />
                        </div>
                        <Button type="submit" label="Registrarse" className="p-button-raised p-button-rounded" />
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default RegistroClientes;
