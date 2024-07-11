import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../Css/AgregarTrabajosExtras.styles.css';
import { obtenerEmpleados } from '../api/empleados.api';

const AgregarTrabajosExtras = () => {
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [cantidadTrabajosExtras, setCantidadTrabajosExtras] = useState(null);
    const [empleados, setEmpleados] = useState([]);

    // Función para manejar el clic en el botón "Agregar"
    const handleAgregar = () => {
        console.log('Agregar trabajos extras:', selectedEmpleado, cantidadTrabajosExtras);
        handleCancelar();
    };

    // Función para manejar el clic en el botón "Cancelar"
    const handleCancelar = () => {
        setSelectedEmpleado(null);
        setCantidadTrabajosExtras(null);
    };

    // useEffect para obtener los empleados cuando el componente se monta
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await obtenerEmpleados();
                const empleadosData = response.data.map(emp => ({
                    label: emp.PersonaCedula, 
                    value: emp.PersonaCedula
                }));
                setEmpleados(empleadosData);
            } catch (error) {
                console.error('Error al obtener empleados:', error);
            } 
        };
        fetchData();
    }, []);

    return (
        <div className="agregar-trabajos-extras-container">
            <div className="card agregar-trabajos-extras-card">
                <h2 className="custom-h2">Agregar Trabajos Extras</h2>
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
                    <div className="btn-Agregar">
                        <Button label="Agregar" onClick={handleAgregar} />
                    </div>
                    <div className="btn-cancelar">
                        <Button label="Cancelar" onClick={handleCancelar} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarTrabajosExtras;
