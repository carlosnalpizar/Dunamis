import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../Css/AgregarTrabajosExtras.styles.css';
import { agregarTrabajosExtras, obtenerEmpleadosActivos } from '../api/empleados.api';

const AgregarTrabajosExtras = () => {
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [descripcionTrabajoExtra, setDescripcionTrabajoExtra] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [visible, setVisible] = useState(false);
    const toast = React.useRef(null);

    const showAlert = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 3000 });
    };

    const handleAgregar = () => {
        if (!selectedEmpleado) {
            showAlert('Por favor, selecciona un empleado.');
            return;
        }
        if (!descripcionTrabajoExtra.trim()) {
            showAlert('Por favor, ingresa una descripción válida para el trabajo extra.');
            return;
        }

        setVisible(true);
    };

    const confirmAgregar = async () => {
        console.log('Empleado seleccionado:', selectedEmpleado);
        console.log('Descripción del trabajo extra:', descripcionTrabajoExtra);
        
        try {
            await agregarTrabajosExtras(selectedEmpleado, descripcionTrabajoExtra);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Trabajos extras agregados exitosamente.', life: 3000 });
            handleCancelar();
        } catch (error) {
            console.error('Error al agregar trabajos extras:', error.response ? error.response.data : error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al agregar trabajos extras.', life: 3000 });
        } finally {
            setVisible(false);
        }
    };

    const handleCancelar = () => {
        setSelectedEmpleado(null);
        setDescripcionTrabajoExtra('');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await obtenerEmpleadosActivos();
                const empleadosData = response.data.map(emp => ({
                    label: `${emp.PersonaCedula} - ${emp.nombre} ${emp.apellido1} ${emp.apellido2}`,
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
            <Toast ref={toast} />
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message="¿Está seguro que desea agregar estos trabajos extras?"
                header="Confirmación"
                icon="pi pi-exclamation-triangle"
                accept={confirmAgregar}
                reject={() => setVisible(false)}
            />
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
                    <label htmlFor="descripcion">Descripción del Trabajo Extra</label>
                    <InputText
                        id="descripcion"
                        value={descripcionTrabajoExtra}
                        onChange={(e) => setDescripcionTrabajoExtra(e.target.value)}
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
