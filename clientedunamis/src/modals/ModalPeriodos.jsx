import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '../Css/modalPeriodos.styles.css';
import 'primeicons/primeicons.css';

const ModalPeriodos = ({ visible, onClose, onAceptar }) => {
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const empleados = [
        { label: '1234567890', value: '1234567890' },
        { label: '0987654321', value: '0987654321' },
        { label: '1234567890', value: '1234567890' },
        { label: '0987654321', value: '0987654321' },
        { label: '1234567890', value: '1234567890' },
        { label: '0987654321', value: '0987654321' }
    ];

    const handleAceptar = () => {
        const consultaData = {
            empleado: selectedEmpleado,
            startDate,
            endDate
        };
        console.log('Datos de consulta:', consultaData);
        onAceptar(consultaData);
        onClose();
    };

    return (
        <Dialog
            header={<div className="modal-header-title">Escoger Empleado y Periodo</div>}
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onClose}
            footer={
                <div className="modal-footer">
                    <Button label="Aceptar" onClick={handleAceptar} className="btnAceptarModalPe" />
                    <Button label="Cancelar" onClick={onClose} className="btnCancelarModalPe" />
                </div>
            }
        >
            <div className="p-field">
                <label htmlFor="empleado">Empleado</label>
                <Dropdown
                    id="empleado"
                    value={selectedEmpleado}
                    options={empleados}
                    onChange={(e) => setSelectedEmpleado(e.value)}
                    placeholder="Selecciona un empleado"
                    filter
                    filterPlaceholder="Buscar..."
                    filterBy="label"
                />
            </div>
            <div className="p-field">
                <label htmlFor="startDate">Fecha de inicio</label>
                <Calendar
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.value)}
                    placeholder="Selecciona la fecha de inicio"
                />
            </div>
            <div className="p-field">
                <label htmlFor="endDate">Fecha de fin</label>
                <Calendar
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.value)}
                    placeholder="Selecciona la fecha de fin"
                />
            </div>
        </Dialog>
    );
};

export default ModalPeriodos;
