import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '../Css/modalDeducciones.styles.css';
import 'primeicons/primeicons.css';

const ModalDeducciones = ({ visible, onClose, onAceptar }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleAceptar = () => {
        const consultaData = {
            startDate,
            endDate
        };
        console.log('Datos de consulta:', consultaData);
        onAceptar(consultaData);
        onClose();
    };

    return (
        <Dialog
            header={<div className="modal-header-title">Escoger Periodo</div>}
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onClose}
            footer={
                <div className="modal-footer">
                    <Button label="Aceptar" onClick={handleAceptar} className="btnAceptarModalDe" />
                    <Button label="Cancelar" onClick={onClose} className="btnCancelarModalDe" />
                </div>
            }
        >
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

export default ModalDeducciones;
