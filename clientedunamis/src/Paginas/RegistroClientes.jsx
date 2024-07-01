import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../Css/registroClientes.styles.css';

const RegistroClientes = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido1: '',
        apellido2: '',
        cedula: '',
        correo: '',
        poscicion: '',
        ingreso: null
    });

    const    poscicion = [
        { label: 'ejem1', value: 'ejem1' },
        { label: 'ejem2', value: 'ejem2' },
       
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
                            <Dropdown placeholder="Seleccione una poscicion" name="poscicion" value={formData.poscicion} options={poscicion} onChange={handleChange} />
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