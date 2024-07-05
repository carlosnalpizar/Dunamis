import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
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
            [name]: name === 'cedula' ? parseInt(value, 10) : value
        }));
    };

    const handleDropdownChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            posicion: e.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ingresarEmpleado(formData);
            alert('Registro exitoso');
        } catch (error) {
            console.error('Error al registrar empleado:', error);
            console.log(formData);
            alert('Error al registrar empleado');
        }
    };

    return (
        <div className="registro-container">
            <Card className="registro-card">
                <div className="registro-header">
                    <img src="../../logo2.png" alt="Logo" className="registro-logo" />
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
