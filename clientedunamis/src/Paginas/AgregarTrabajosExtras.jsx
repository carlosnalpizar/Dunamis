import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../Css/AgregarTrabajosExtras.styles.css';

const AgregarTrabajosExtras = () => {
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [cantidadTrabajosExtras, setCantidadTrabajosExtras] = useState(null);

    const empleados = [
        { label: 'Empleado 1', value: 'Empleado1' },
        { label: 'Empleado 2', value: 'Empleado2' },
        { label: 'Empleado 3', value: 'Empleado3' },
    ];

    const handleAgregar = () => {
        console.log('Agregar trabajos extras:', selectedEmpleado, cantidadTrabajosExtras);
    };

    const handleCancelar = () => {
        setSelectedEmpleado(null);
        setCantidadTrabajosExtras(null);
    };

    return (
        <div className="agregar-trabajos-extras-container">
            <div className="card agregar-trabajos-extras-card">
                <h2>Agregar Trabajos Extras</h2>
                <div className="p-field">
                    <label htmlFor="empleado">Empleado</label>
                    <Dropdown 
                        id="empleado" 
                        value={selectedEmpleado} 
                        options={empleados} 
                        onChange={(e) => setSelectedEmpleado(e.value)} 
                        placeholder="Selecciona un empleado" 
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="cantidad">Cantidad de Trabajos Extras</label>
                    <InputNumber 
                        id="cantidad" 
                        value={cantidadTrabajosExtras} 
                        onValueChange={(e) => setCantidadTrabajosExtras(e.value)} 
                        mode="decimal" 
                        min={0}
                        inputClassName="p-inputnumber"
                    />
                </div>
                <div className="p-field p-grid">
                    <div className="p-col">
                        <Button label="Agregar" className="p-button-success" onClick={handleAgregar} />
                    </div>
                    <div className="p-col">
                        <Button label="Cancelar" className="p-button-secondary" onClick={handleCancelar} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarTrabajosExtras;
